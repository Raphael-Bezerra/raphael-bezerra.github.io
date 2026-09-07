"use strict";

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];

if (menuToggle && navLinks) {
	menuToggle.addEventListener("click", () => {
		const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", String(!isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
		navLinks.classList.toggle("open", !isOpen);
	});

	navLinks.addEventListener("click", (event) => {
		if (event.target.closest("a")) {
			menuToggle.setAttribute("aria-expanded", "false");
			menuToggle.setAttribute("aria-label", "Abrir menu");
			navLinks.classList.remove("open");
		}
	});
}

const archiveToggle = document.querySelector(".archive-toggle");
const archivePanel = document.querySelector(".archive-panel");

if (archiveToggle && archivePanel) {
	archiveToggle.addEventListener("click", () => {
		const isOpen = archiveToggle.getAttribute("aria-expanded") === "true";
		archiveToggle.setAttribute("aria-expanded", String(!isOpen));
		archivePanel.hidden = isOpen;
	});
}

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
		}
	});
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
	header.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

const diagrams = [...document.querySelectorAll(".feature-diagram")];

function layoutDiagram(diagram) {
	if (!diagram.classList.contains("process-diagram")) {
		diagram.classList.add("process-diagram");
		diagram.innerHTML = '<div class="process-step step-received"><span class="process-index">01</span><span>Checklist recebido</span></div><div class="process-step step-validation"><span class="process-index">02</span><span>Validação</span></div><div class="process-outcome outcome-approved"><span>Conforme</span><b>→</b><span>Liberado</span></div><div class="process-outcome outcome-pending"><span>NC</span><b>→</b><span>Tratativa</span></div><div class="process-step step-record"><span class="process-index">03</span><span>Registro</span></div><svg class="diagram-lines"><line class="diagram-line line-received"></line><line class="diagram-line line-validation"></line><line class="diagram-line line-approved"></line><line class="diagram-line line-pending"></line></svg>';
	}

	const svg = diagram.querySelector(".diagram-lines");
	const received = diagram.querySelector(".step-received");
	const validation = diagram.querySelector(".step-validation");
	const record = diagram.querySelector(".step-record");
	const approved = diagram.querySelector(".outcome-approved");
	const pending = diagram.querySelector(".outcome-pending");
	if (!svg || !received || !validation || !record || !approved || !pending) return;

	const container = diagram.getBoundingClientRect();
	const toLocal = (node) => {
		const rect = node.getBoundingClientRect();
		return { x: rect.left - container.left, y: rect.top - container.top, width: rect.width, height: rect.height };
	};

	const receivedBox = toLocal(received);
	const validationBox = toLocal(validation);
	const recordBox = toLocal(record);
	const approvedBox = toLocal(approved);
	const pendingBox = toLocal(pending);

	svg.setAttribute("viewBox", `0 0 ${container.width} ${container.height}`);

	const connect = (selector, from, to, dashed = false) => {
		const line = svg.querySelector(selector);
		line.setAttribute("x1", from.x);
		line.setAttribute("y1", from.y);
		line.setAttribute("x2", to.x);
		line.setAttribute("y2", to.y);
		line.style.strokeDasharray = dashed ? "4 5" : "none";
	};

	connect(".line-received", { x: receivedBox.x + 10, y: receivedBox.y + receivedBox.height }, { x: validationBox.x + 10, y: validationBox.y });
	connect(".line-validation", { x: validationBox.x + 10, y: validationBox.y + validationBox.height }, { x: recordBox.x + 10, y: recordBox.y });
	connect(".line-approved", { x: validationBox.x + validationBox.width, y: validationBox.y + validationBox.height / 2 }, { x: approvedBox.x, y: approvedBox.y + approvedBox.height / 2 });
	connect(".line-pending", { x: validationBox.x + validationBox.width, y: validationBox.y + validationBox.height / 2 }, { x: pendingBox.x, y: pendingBox.y + pendingBox.height / 2 }, true);
}

if (diagrams.length) {
	const layoutAllDiagrams = () => diagrams.forEach(layoutDiagram);
	layoutAllDiagrams();
	window.addEventListener("load", layoutAllDiagrams);
	window.addEventListener("resize", layoutAllDiagrams, { passive: true });
}
