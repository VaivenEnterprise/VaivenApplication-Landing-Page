# VAIVÉN — Landing page — Spec Driven Development con OpenCode

Plataforma móvil de préstamo y renta de objetos entre personas (México, MXN).
Contexto completo: [`docs/VAIVEN_Idea_y_Objetivo.pdf`](docs/VAIVEN_Idea_y_Objetivo.pdf). Calendario, reparto entre personas y políticas confirmadas: [`ROADMAP.md`](ROADMAP.md).

**Stack:** Sitio estático (HTML + CSS), hosting gratuito

Este repositorio es **independiente**. Forma parte de VAIVÉN junto con [`vaiven-backend`](../vaiven-backend) (API) y [`vaiven-frontend`](../vaiven-frontend) (app móvil). Se asume que los tres repositorios están clonados lado a lado, porque algunos documentos del SDD apuntan al repositorio hermano con rutas `../vaiven-*`.

## Qué contiene

| Archivo / carpeta | Para qué sirve |
|---|---|
| `constitution.md` | Reglas técnicas no negociables. Máxima autoridad. |
| `AGENTS.md` | Instrucciones que OpenCode carga siempre: orden de lectura, flujo, agentes, comandos, reglas. |
| `memoria.md` | Decisiones, estado, modelos asignados, dependencias y aprendizajes. |
| `opencode.json` | Modelos gratuitos por agente, instrucciones cargadas y permisos. |
| `.opencode/agents/` y `.opencode/skills/` | Subagentes propios y skills con plantillas y listas de comprobación. |
| `specs/L001 y L002/` | `spec.md`, `plan.md` y `tasks.md` de cada fase (páginas legales y página principal). |
| `ROADMAP.md`, `docs/` | Copia del plan maestro y del documento de idea del proyecto. |

Solo informa: no tiene formularios ni servicios. Los textos deben coincidir con lo que hacen las specs de `../vaiven-backend` y `../vaiven-frontend`.

## Flujo: OpenCode + MCP, spec por spec

1. Define `RENDER_API_KEY` como variable de entorno del sistema y reinicia OpenCode; `opencode mcp list` debe mostrar `render`.
2. Cada spec termina con «Despliegue»: `@devops-mcp` publica el static site `vaiven-landing` en Render y verifica las páginas. **La spec siguiente no empieza hasta que pase.**
3. El origen que Render consume (repositorio o imagen) queda por definir al integrar el repositorio. Repositorio, ramas, revisión y pipeline: se integrarán de cero.

## Cómo se usa con OpenCode

```bash
opencode          # desde la raíz de este repositorio
```
1. Ejecuta `opencode models` y confirma que los modelos de `opencode.json` existen (los gratuitos rotan); si cambias alguno, anótalo en `memoria.md`.
2. Agente `plan`: revisa y ajusta `spec.md`, `plan.md` y `tasks.md`.
3. Con la spec aprobada por una persona, cambia al agente `build` y pide el agente de desarrollo definido en `.opencode/agents/` la tarea que toque.
4. Al cerrar una fase, pide `@revisor-constitucion revisa los cambios`.

## Coherencia entre repositorios

- Los Artículos **IV** (contrato de API) y **V** (dinero, fechas, idioma) deben mantenerse idénticos en las constituciones de backend y móvil. Si cambias uno, cámbialo en ambos repositorios y registra la decisión en ambos `memoria.md`.
- `ROADMAP.md` y `docs/VAIVEN_Idea_y_Objetivo.pdf` son copias en cada repositorio; si se actualiza una, hay que actualizar las demás.

## Estado

Todavía no hay código ni se han ejecutado tareas: están definidos los archivos de gobierno, el SDD por spec y la configuración de OpenCode con MCP. El repositorio y el pipeline se integrarán de cero.
