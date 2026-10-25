/* NovaLink Togo - script minimal (menu mobile, en-tête, lien actif, année). Aucune dépendance. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("menu");

    function setOpen(open) {
      if (!toggle || !nav) return;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    }
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
          setOpen(false);
          toggle.focus();
        }
      });
      window.matchMedia("(min-width: 961px)").addEventListener("change", function (m) {
        if (m.matches) setOpen(false);
      });
    }

    function onScroll() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Lien de navigation actif selon la section visible */
    var links = nav ? nav.querySelectorAll('ul a[href^="#"]') : [];
    if ("IntersectionObserver" in window && links.length) {
      var map = {};
      links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && map[en.target.id]) {
            links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
            map[en.target.id].classList.add("is-active");
            map[en.target.id].setAttribute("aria-current", "true");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) io.observe(el);
      });
    }

    var annee = document.getElementById("annee");
    if (annee) annee.textContent = String(new Date().getFullYear());
  });
})();
