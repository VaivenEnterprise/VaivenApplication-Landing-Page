# Memoria de la Landing — VAIVÉN

Memoria viva. Los agentes la leen después de `constitution.md` y la **actualizan** (solo-anexar) al cerrar tareas relevantes.

_Última actualización: 2026-10-28_

## 1. Estado
| Elemento | Estado |
|---|---|
| Constitución | v1.0.0 |
| Specs | L001 (base y páginas legales) y L002 (página principal): redactadas, sin ejecutar |
| Sitio | Ninguno todavía |
| URL pública | _(por definir; subdominio gratuito `onrender.com` del static site de Render)_ |
| URL de Google Play | _(vacía hasta publicar; `assets/js/config.js`)_ |

## 2. Decisiones
| # | Fecha | Decisión | Motivo |
|---|---|---|---|
| D-001 | 2026-10-28 | Sitio estático sin framework ni compilación | Costo cero, mínima superficie para modelos gratuitos, rapidez |
| D-002 | 2026-10-28 | ~~Cloudflare Pages (alterno Netlify) con subdominio gratuito~~ — **reemplazada por D-009** | Funciona con repositorios privados; sin comprar dominio |
| D-003 | 2026-10-28 | Solo Google Play; sin App Store | Es lo único que se paga |
| D-004 | 2026-10-28 | Sin cookies ni analítica ni terceros | Evita aviso de cookies y simplifica la privacidad |
| D-005 | 2026-10-28 | Privacidad, términos y eliminación de cuenta viven aquí | Google Play exige URL públicas |
| D-006 | 2026-10-28 | Borradores legales por el agente, revisión humana obligatoria | No somos asesoría legal |
| D-007 | 2026-10-28 | Valores cambiantes en `assets/js/config.js` | Un solo lugar para URL de Play y correo |
| D-008 | 2026-11-01 | Se separa el monorepo en repositorios independientes (`vaiven-backend`, `vaiven-frontend` y `vaiven-landing-page`): las rutas `../` pasan a ser locales o a apuntar al repositorio hermano; ROADMAP.md y docs/ se copian en cada repositorio; enmienda PATCH, sin cambios de principios; constitución landing **v1.0.1** | Constitución; AGENTS.md; specs |
| D-009 | 2026-11-01 | La landing se publica como **static site gratuito de Render**, creado y desplegado por el **MCP de Render** (`create_static_site`, `trigger_deploy`); cada spec termina con una tarea «Despliegue»; se eliminó todo lo de repositorio y pipeline; constitución landing **v1.1.0** (Art. IX y XII) | Todo el despliegue en un solo MCP; sin Cloudflare |
| D-010 | Se elimina todo lo relativo a repositorio, ramas, PR y pipeline: se integrará de cero. Todo va por OpenCode y MCP: cada spec termina con una tarea «Despliegue» en Render (static site, por MCP, agente `devops-mcp`); constitución **v1.1.0** (Art. XII) | ROADMAP; constitution Art. XII; specs L001 y L002 |

## 3. Pendientes de la persona responsable
- Correo de soporte: `vaivenedeltrabajo@gmail.com` (definido 28 oct); responsable: Joseph Abrham Yañez Garcia.
- Revisión legal de privacidad, términos y eliminación de cuenta.
- Insignia oficial «Disponible en Google Play» (descargar del recurso oficial de Google).
- Capturas reales de la app (cuando existan) y paleta/logotipo definitivos.

## 4. Aprendizajes
_(vacío)_


## Integracion DevSecOps — 2026-11-02

- [CI] Por solicitud expresa del responsable se prepara la integracion de ramas, PRs y seguridad que habia quedado fuera el 2026-11-01. Spec independiente: specs/017-devsecops/. No se modifica constitution.md ni se ejecutan specs funcionales.
- [CI] Herramientas exclusivas de CI: GitHub Actions fijadas por SHA, Gitleaks v8.30.1 (checksum verificado), CodeQL v4. Sin dependencias nuevas de aplicacion.
- [CI] Revisores indicados: JesusTrz (escritura) y JosephYanez27 (lectura al preparar el cambio). El segundo necesita escritura para aprobaciones obligatorias y CODEOWNERS. Ruleset y ajustes administrativos quedan pendientes hasta que se apliquen y verifiquen.
- [CI] Estado inicial: documentacion sin aplicacion; CI informa las pruebas no aplicables y ejecuta politica/secretos. Despliegue Render por MCP y pruebas en Expo Go se conservan.
