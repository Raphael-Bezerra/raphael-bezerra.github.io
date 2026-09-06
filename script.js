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
	const svg = diagram.querySelector(".diagram-lines");
	const pulse = diagram.querySelector(".diagram-pulse");
	const nodeA = diagram.querySelector(".node-a");
	const nodeB = diagram.querySelector(".node-b");
	const nodeC = diagram.querySelector(".node-c");
	if (!svg || !pulse || !nodeA || !nodeB || !nodeC) return;

	const container = diagram.getBoundingClientRect();
	const toLocal = (node) => {
		const rect = node.getBoundingClientRect();
		return { x: rect.left - container.left, y: rect.top - container.top, width: rect.width, height: rect.height };
	};

	const a = toLocal(nodeA);
	const b = toLocal(nodeB);
	const c = toLocal(nodeC);
	// as linhas convergem no topo do nó "análise", ponto real de encontro visual
	const target = { x: b.x + b.width / 2, y: b.y };

	svg.setAttribute("viewBox", `0 0 ${container.width} ${container.height}`);

	const lineA = svg.querySelector(".line-a");
	lineA.setAttribute("x1", a.x + a.width / 2);
	lineA.setAttribute("y1", a.y + a.height);
	lineA.setAttribute("x2", target.x);
	lineA.setAttribute("y2", target.y);

	const lineB = svg.querySelector(".line-b");
	lineB.setAttribute("x1", c.x + c.width / 2);
	lineB.setAttribute("y1", c.y + c.height);
	lineB.setAttribute("x2", target.x);
	lineB.setAttribute("y2", target.y);

	pulse.style.left = `${target.x}px`;
	pulse.style.top = `${target.y}px`;
}

if (diagrams.length) {
	const layoutAllDiagrams = () => diagrams.forEach(layoutDiagram);
	layoutAllDiagrams();
	window.addEventListener("load", layoutAllDiagrams);
	window.addEventListener("resize", layoutAllDiagrams, { passive: true });
}
