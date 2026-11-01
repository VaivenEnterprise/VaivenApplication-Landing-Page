---
name: mcp-deploy
description: Procedimiento para crear y desplegar la landing como static site de Render por MCP y verificarla (tarea final «Despliegue» de cada spec). Úsala en cualquier tarea de despliegue de la landing.
---

# Skill: despliegue de la landing por MCP

## Antes de empezar
- `opencode mcp list` muestra `render` conectado (variable `RENDER_API_KEY` definida en el sistema). Si no, detente.
- `node scripts/check.mjs` en verde.

## Primera vez (spec L001, tarea de despliegue)
1. `list_workspaces` / `select_workspace`: el espacio de trabajo de VAIVÉN.
2. `list_services`: si ya existe `vaiven-landing`, no lo recrees.
3. `create_static_site` con: nombre `vaiven-landing`, **sin comando de compilación**, directorio de publicación `.`, plan gratuito. El origen (repositorio que Render consume) está **por definir** cuando se integre el repositorio; si aún no existe, detente y repórtalo.
4. `trigger_deploy` y `list_deploys` hasta `live` o fallo (máximo 10 min); si falla, `list_logs` y reporta.

## Cada despliegue posterior
1. `node scripts/check.mjs` en verde.
2. `trigger_deploy` y espera como arriba.
3. Verifica con `curl`: `/`, `/privacidad/`, `/terminos/`, `/eliminar-cuenta/`, `/404.html`, `robots.txt` y `sitemap.xml` devuelven lo esperado (200; la página 404 responde con su contenido); los encabezados de `_headers` están presentes; no hay recursos de otros dominios.
4. Anota la URL pública, el ID del despliegue y el resultado en `memoria.md` (solo anexar). Entrega a quien llena la ficha de Play la URL de privacidad y de eliminación de cuenta.

## Notas
- El sitio estático gratuito de Render no se duerme como los servicios web.
- No se compra dominio: se usa el subdominio `onrender.com`.
