# AGENTS.md — Landing VAIVÉN (sitio estático informativo)

Instrucciones para cualquier agente de OpenCode que trabaje en `vaiven-landing-page/`. Se carga automáticamente. **Subordinado a `constitution.md`.**

## 1. Orden de lectura obligatorio
1. `constitution.md` (artículos I a XI). Para saber qué spec toca y quién es la dueña, `ROADMAP.md`.
2. `memoria.md`.
3. `specs/<spec-activa>/spec.md` → `plan.md` → `tasks.md`.
4. Solo entonces, el sitio.

Si algo no está definido, **no lo inventes**: pregunta o anótalo como `[NEEDS CLARIFICATION]`.

## 2. Proyecto en una línea
Sitio **estático** (HTML + CSS + JS mínimo, sin compilar) que presenta VAIVÉN en **una sola pantalla**, publica las páginas legales que exige Google Play, envía a la persona a descargar la app en Google Play y enlaza a las redes sociales de VAIVÉN. Sin servicios, sin formularios, sin analítica, sin costo.

## 3. Flujo SDD
| Fase | Quién | Resultado |
|---|---|---|
| Especificar / Planificar / Dividir | `plan` + `spec-writer` | `spec.md`, `plan.md`, `tasks.md` |
| Implementar | `build` + `dev-web` | páginas, estilos y scripts, **una tarea por vez** |
| Revisar | `revisor-constitucion` | informe de conformidad |

## 4. Agentes (`.opencode/agents/`)
| Agente | Responsabilidad | Edita |
|---|---|---|
| `spec-writer` | Redacta `spec.md`, `plan.md`, `tasks.md` y `memoria.md` | `specs/`, `memoria.md` |
| `dev-web` | Implementa tareas de HTML/CSS/JS y textos | sitio |
| `gestor-repo` | Crea ramas, commits y PR en GitHub por MCP; único agente con permiso para el MCP de GitHub; nunca fusiona ni borra | No |
| `devops-mcp` | Crea y despliega el static site de Render por MCP; único agente con permiso para el MCP | No |
| `revisor-constitucion` | Verifica conformidad (también del contenido legal contra la app) | nada |

Invocación: `@dev-web implementa la tarea T003 de specs/001-base-y-paginas-legales/tasks.md`.

## 5. Skills (`.opencode/skills/`)
| Skill | Cuándo |
|---|---|
| `sdd-workflow` | Al crear o ejecutar spec, plan o tareas |
| `static-site-conventions` | Al escribir o cambiar cualquier página, estilo o script |
| `mcp-deploy` | Al desplegar la landing (solo `devops-mcp`) |

## 5b. MCP y despliegue (Art. XII)

- El MCP de Render está en `opencode.json` (`RENDER_API_KEY` como variable de entorno del sistema). **Trabajo humano mínimo:** registrarse en Render, crear la API key y aprobar acciones; el resto lo hace `devops-mcp`. **Solo `devops-mcp` lo usa.**
- Cada spec termina con su tarea «Despliegue» (`@devops-mcp`). No empieces la siguiente spec hasta que pase.

## 6. Comandos
```bash
python -m http.server 8080 --directory .   # ver el sitio en http://localhost:8080
node scripts/check.mjs                      # verificación obligatoria antes de cerrar tarea
```
Sin `npm install`: no hay dependencias.

## 7. Reglas duras
- Solo se editan los archivos que lista la tarea.
- Sin `<form>`, sin cookies, sin recursos de otros dominios, sin analítica, sin fuentes externas.
- Redes sociales: solo los cinco glifos de `assets/img/social.svg` como enlaces a los perfiles; las URL van únicamente en `SITE.social` de `assets/js/config.js` y no se inventan. Sin widgets ni scripts de las redes (Art. V.3 y VII).
- La portada (`body.home`) cabe en una pantalla sin desplazarse (Art. VIII.7): no uses alturas fijas ni `overflow: hidden` en la página para lograrlo; si algo no cabe, se compacta o se omite solo el antetítulo decorativo.
- Textos en español de México; nada inventado sobre la app (se verifica contra `../vaiven-backend/specs` y `../vaiven-frontend/specs`).
- Textos legales: **borrador del agente, revisión de una persona** antes de publicar.
- Nunca secretos en el repositorio.

## 8. Cierre de tarea
1. `node scripts/check.mjs` sin errores. 2. Revisión visual a 360/768/1280 px. 3. Marcar `[x]` en `tasks.md`. 4. Anexar a `memoria.md` si hubo decisión. 5. Tarea final de la spec: despliegue por MCP con `@devops-mcp` (Art. XII).

## Repositorio y PR (Art. XIII)
- Una rama de integracion por spec (`spec/SPEC-NN`), creada desde `develop`: implementar sus tareas ahi o en ramas `tipo/SPEC-NN-TNNN` con PR hacia la misma SPEC. Al completar la spec, PR hacia `develop`; publicar con PR `develop` -> `main`. Se conserva tarea -> `develop`. El segmento `SCRUM-NN-` es opcional tras la barra en ambos formatos; los nombres anteriores siguen siendo validos. Titulos de PR libres; completar Resumen, Validación y Seguridad. Solo `@gestor-repo` usa el MCP de GitHub; nunca fusiona ni borra: una persona revisa y fusiona. Nunca se suben secretos.

- Tambien se admiten ramas por fase `tipo/SPEC-NN-Fase-N` (ejemplo: `feat/SPEC-02-Fase-3`, con SCRUM opcional), creadas desde la spec y con PR hacia esa misma SPEC o hacia develop. Implementar sus tareas una por una. No enviar fases directamente a main. Ver `docs/devsecops.md`.
