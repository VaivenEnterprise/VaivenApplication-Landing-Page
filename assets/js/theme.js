/* Tema claro u oscuro: se aplica antes de pintar (sin parpadeo). Sin elección guardada, sigue al sistema. */
(function () {
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var saved = null;
  try { saved = localStorage.getItem("vaiven-tema"); } catch (e) {}
  root.setAttribute("data-theme", saved === "light" || saved === "dark" ? saved : media.matches ? "dark" : "light");
  if (!saved && media.addEventListener) {
    media.addEventListener("change", function () {
      root.setAttribute("data-theme", media.matches ? "dark" : "light");
    });
  }
})();
