# Agente do Portfólio

## Objetivo

Este repositório contém o portfólio profissional de Raphael Bezerra.

O agente deve atuar diretamente no workspace, lendo arquivos, executando
comandos de inspeção e realizando alterações seguras quando necessário.

## Comportamento no terminal

Não pedir ao usuário para executar comandos de diagnóstico e copiar
o resultado para o chat.

Quando precisar saber o estado do projeto, executar diretamente:

- git status
- git branch --show-current
- git branch -avv
- git log --oneline --decorate -5
- git diff
- git remote -v
- git fetch

Ler e interpretar os resultados sozinho.

Só pedir intervenção do usuário quando:

- houver autenticação que exija interação humana;
- o ambiente bloquear a execução;
- houver uma decisão funcional que dependa do usuário;
- a ação for destrutiva ou irreversível.

## Segurança Git

Não executar automaticamente:

- git reset --hard
- git push --force
- git clean -fd
- exclusão de branches
- reescrita de histórico
- rebase destrutivo

Antes dessas ações, explicar o risco e pedir confirmação.

## Estado atual do projeto

Repositório:

Raphael-Bezerra/Raphael-Bezerra.github.io

Branch principal atual:

master

Existe uma branch de preservação:

legacy-2022

Ela contém a versão antiga do portfólio e não deve ser apagada
nem modificada.

A branch legacy-2022 já foi enviada para:

origin/legacy-2022

O conteúdo antigo incluía:

- Menu01/
- Menu02/
- Menu03/
- README.md

## Objetivo da nova versão

Transformar o repositório em uma landing page profissional usando:

- HTML
- CSS
- JavaScript

Estrutura prevista:

- index.html
- style.css
- script.js
- README.md
- assets/images/
- assets/icons/
- docs/

## Organização do portfólio

A landing page deverá apresentar:

- apresentação profissional;
- tecnologias;
- projetos em destaque;
- mini projetos;
- jornada de estudos;
- Engenharia e Arquitetura de Software;
- contato.

Cada projeto publicável terá seu próprio repositório e,
quando aplicável, seu próprio GitHub Pages.

## Projetos

Projeto já publicado:

jogo-do-numero-secreto

Demo:

https://raphael-bezerra.github.io/jogo-do-numero-secreto/

## CheckFlow

CheckFlow é um projeto privado.

No portfólio público deve aparecer apenas como case técnico sanitizado.

Nunca publicar:

- código privado;
- dados corporativos;
- nomes de colaboradores;
- dados pessoais;
- planilhas internas;
- informações confidenciais;
- regras internas sensíveis.

Pode apresentar:

- problema de forma abstrata;
- arquitetura;
- tecnologias;
- decisões arquiteturais;
- evolução da solução;
- aprendizados.

## Continuidade

Ao iniciar uma tarefa relevante:

1. Ler este AGENTS.md.
2. Ler docs/CONTEXTO_PORTFOLIO.md, se existir.
3. Ler docs/SESSION_HANDOFF.md, se existir.
4. Executar diretamente:
   - git status
   - git branch --show-current
   - git branch -avv
   - git log --oneline --decorate -5
5. Identificar o próximo passo sem pedir ao usuário para copiar
   resultados do terminal.

Ao terminar uma etapa relevante, atualizar:

docs/SESSION_HANDOFF.md

com:

- tarefa concluída;
- branch atual;
- último commit;
- arquivos alterados;
- decisões tomadas;
- pendências;
- próximo passo exato.

Atualizar docs/CONTEXTO_PORTFOLIO.md apenas quando houver uma
decisão permanente sobre estrutura ou arquitetura.

## Comunicação

Explicar decisões importantes de forma curta.

Quando aparecer uma sigla ou termo técnico em inglês, informar
rapidamente o significado em português.

Evitar transformar cada etapa em comandos manuais para o usuário.

Se puder verificar algo diretamente no workspace ou terminal,
verificar sozinho.
