# Constitución — VAIVÉN Landing

> **Versión 1.2.0** · 2026-10-28 · Enmendada el 2026-11-01 (repositorios separados; **MINOR:** se elimina todo lo de repositorio y pipeline y se agrega el Art. XII de despliegue por MCP) · Máxima autoridad del proyecto `vaiven-landing-page/`. Si algo la contradice, gana este documento.
>
> **Enmienda 1.2.0 (2026-11-02, MINOR):** se agrega el Art. XIII (repositorio y pull requests en GitHub, con MCP de GitHub); se reemplaza la declaración de «sin repositorio».
> Comparte con las constituciones de `vaiven-backend/` y `vaiven-frontend/` las reglas de idioma (es-MX) y de secretos.

## Art. I — Metodología
1. Flujo obligatorio: `constitution.md → spec.md → plan.md → tasks.md → implementación → revisión`.
2. No se implementa nada que no esté en una tarea aprobada de `specs/<spec>/tasks.md`.
3. Si la spec está mal, se corrige la spec primero y luego el sitio.
4. Los modelos gratuitos son débiles: tareas pequeñas (1–3 archivos), explícitas y verificables.

## Art. II — Alcance: solo información
1. La landing es **informativa**: explica qué es VAIVÉN, cómo funciona, qué se puede compartir, cómo se cuida a las personas, y envía a **Google Play** para descargar la app.
2. **Prohibido**: registro, inicio de sesión, formularios que recojan datos personales, pagos, paneles, comentarios, chats o cualquier servicio. Si algo necesita backend, no pertenece a esta landing.
3. Contacto solo mediante un enlace `mailto:` al correo de soporte.
4. Las páginas legales (privacidad, términos, eliminación de cuenta) son parte del sitio porque Google Play exige URL públicas para ellas.
5. Solo Google Play (Android) en esta versión. No se muestra la insignia de App Store.

## Art. III — Stack mínimo y sin costo
| Pieza | Decisión |
|---|---|
| Páginas | HTML5 semántico escrito a mano, **sin framework y sin paso de compilación** |
| Estilos | CSS propio con variables (*tokens*) en un solo archivo; sistema de tipografía del dispositivo (sin fuentes externas) |
| Scripts | JavaScript vanilla mínimo (ES modules), solo para mejoras (menú móvil y enlace a Google Play); el sitio funciona sin JS |
| Dependencias | **Ninguna** en producción. Para verificar: Node ≥ 20 con módulos integrados (sin `npm install`) |
| Hosting | Estático y gratuito (**static site de Render**, desplegado por MCP) con subdominio gratuito; **no se compra dominio** |
| Costo | Cero. Lo único que se paga en VAIVÉN es la cuenta de desarrollador de Google Play |

Cualquier dependencia nueva requiere enmendar esta constitución.

## Art. IV — Estructura
```
vaiven-landing-page/            # raíz del repositorio
  index.html
  privacidad/index.html · terminos/index.html · eliminar-cuenta/index.html · 404.html
  assets/{css/styles.css, js/site.js, js/config.js, img/}
  robots.txt · sitemap.xml · _headers
  scripts/check.mjs            # verificación automática (solo módulos integrados de Node)
  docs/{plantilla.html, publicacion.md}
  specs/ · constitution.md · AGENTS.md · memoria.md · opencode.json · .opencode/
```
1. Una carpeta por página con su `index.html` (URL limpias: `/privacidad/`).
2. Cabecera, pie y `<head>` común se copian desde `docs/plantilla.html`; `check.mjs` falla si divergen.
3. Valores que cambian (URL de Google Play, correo de soporte, nombre del sitio, fecha de actualización legal) viven en **un solo archivo**: `assets/js/config.js`. El HTML trae un valor de reserva legible sin JS.

## Art. V — Contenido y marca
1. Todo el texto en **español de México**; tuteo cercano y claro.
2. Prohibido inventar cifras, usuarios, reseñas, premios, alianzas o funciones. Solo se afirma lo que la app hace según las specs de `../vaiven-backend/specs` y `../vaiven-frontend/specs`.
3. No se muestran imágenes ni logotipos de terceros salvo la **insignia oficial de «Disponible en Google Play»**, descargada del recurso oficial de Google y usada sin alteraciones y respetando sus lineamientos. No se dibuja ni se imita.
4. Ilustraciones: SVG propios o capturas reales de la app (cuando existan); nada de bancos de imágenes con licencia dudosa.
5. No se compara con otras plataformas ni se promete seguridad absoluta.

## Art. VI — Legal
1. Las páginas legales las **redacta el agente como borrador** y las **revisa una persona** antes de publicar; se marca la fecha de última actualización.
2. Deben coincidir con lo que la app realmente recopila (ver `../vaiven-frontend` y `../vaiven-backend`): si una spec agrega un dato nuevo, se actualiza el aviso de privacidad en el mismo cambio.
3. Edad mínima 18 años. Contacto de soporte visible. Página de **eliminación de cuenta** con instrucciones desde la app y alternativa por correo.
4. El responsable no afirma que VAIVÉN procese pagos: los pagos son entre personas.

## Art. VII — Privacidad del sitio
1. Sin cookies, sin analítica, sin píxeles, sin incrustaciones de terceros (mapas, videos, redes) y sin fuentes ni librerías desde CDN. Por eso no hay aviso de cookies.
2. Los enlaces externos usan `rel="noopener noreferrer"`.

## Art. VIII — Accesibilidad, rendimiento y SEO
1. HTML semántico (`header`, `nav`, `main`, `footer`, un solo `h1` por página), `lang="es-MX"`, enlace «Saltar al contenido», foco visible, contraste AA, objetivos táctiles ≥ 44 px, navegable con teclado y sin depender del color.
2. `alt` en toda imagen informativa (vacío si es decorativa); texto escalable; `prefers-reduced-motion` respetado.
3. Mobile-first y legible desde 320 px; sin desplazamiento horizontal.
4. Imágenes ≤ 150 KB (WebP/AVIF/SVG), con `width` y `height`, `loading="lazy"` salvo la primera; CSS ≤ 30 KB y JS ≤ 5 KB sin comprimir.
5. Metadatos por página: `<title>` único, `description`, `canonical`, Open Graph y `theme-color`; `robots.txt` y `sitemap.xml` válidos.
6. Meta: Lighthouse móvil ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO.

## Art. IX — Seguridad y despliegue
1. Sin secretos en el repositorio (no los necesita). Sin `.env`.
2. `_headers` define `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` restrictiva y una `Content-Security-Policy` estricta (`default-src 'self'`; sin `unsafe-inline` en scripts).
3. Despliegue como **static site de Render** (sin comando de compilación, directorio de publicación `.`), creado y desplegado por MCP (Art. XII). Antes de desplegar pasa `node scripts/check.mjs`.

## Art. X — Calidad
1. `node scripts/check.mjs` debe pasar antes de dar por hecha una tarea: enlaces internos, `lang`, `title`, `description`, `canonical`, un `h1`, `alt`, estructura común, ausencia de recursos externos y de `<form>`, tamaños de archivos.
2. Revisión visual manual a 360, 768 y 1280 px antes de cerrar cada spec.
3. `@revisor-constitucion` revisa al cerrar cada spec.

## Art. XI — Trabajo en equipo
1. Dueño por spec (ver `ROADMAP.md`); solo esa persona edita su `tasks.md`.
2. `memoria.md` es solo-anexar con la etiqueta `[MO-B]` (o quien haga el cambio).

## Art. XII — Despliegue por MCP (enmienda 1.1.0)
1. La landing se publica como **static site gratuito de Render** (`create_static_site`) y se actualiza con `trigger_deploy`, ambos por el **MCP de Render** declarado únicamente en `opencode.json`. Su API key vive en una variable de entorno local, nunca en el repositorio. Esto reemplaza a Cloudflare Pages.
2. Solo el agente `devops-mcp` usa el MCP.
3. **Cada spec termina desplegada:** la última tarea es «Despliegue» (después de la revisión de conformidad): `node scripts/check.mjs` en verde, `trigger_deploy`, verificación de las páginas publicadas (códigos 200, enlaces internos, encabezados) y anotación de la URL en `memoria.md`.
4. El origen del despliegue es el repositorio de GitHub de la landing (Art. XIII): Render lo consume y publica la rama `main`.
7. **Trabajo humano mínimo:** la persona solo se registra en Render, crea la API key (`RENDER_API_KEY`) y aprueba las acciones. Crear el static site, desplegar y verificar las páginas lo hace `devops-mcp` desde OpenCode con el MCP de Render.

### Art. XIII — Repositorio y pull requests en GitHub (enmienda 1.2.0)
1. El código vive en un repositorio de GitHub (`vaiven-landing-page`). La rama `main` está protegida: no se empuja directo ni se fuerzan pushes; todo cambio entra por pull request.
2. Una rama por spec (`spec/NNN-nombre`) y una PR por spec, que se abre cuando su tarea de cierre pasa. Otra persona la revisa y la fusiona; la spec siguiente puede partir de la rama anterior mientras tanto.
3. La PR cita la spec y las tareas cerradas, el resultado de la verificación (sin secretos) y el veredicto de `revisor-constitucion`. Commits y títulos en español, en imperativo, con el número de spec.
4. Nunca se suben secretos (`.env`, claves, tokens, `*.pem`, cadenas de conexión); `.gitignore` los excluye. Si uno se sube por error, se rota de inmediato.
5. El MCP de GitHub se declara **únicamente en `opencode.json`** y solo lo usa el agente `gestor-repo`: crea ramas, hace commits y abre PR. **Nunca** fusiona, cierra, borra ni cambia la configuración del repositorio. Las acciones de escritura piden aprobación.
6. **Trabajo humano mínimo:** la persona crea el repositorio, protege `main`, crea un token de acceso con permisos mínimos limitado a este repositorio (`GITHUB_PERSONAL_ACCESS_TOKEN` como variable del sistema), y revisa y fusiona las PR. El resto lo hace `gestor-repo` desde OpenCode.
7. No hay pipeline automatizado (CI) definido: las verificaciones son locales y el despliegue lo hace `devops-mcp` o `probador-expo` según el proyecto.
