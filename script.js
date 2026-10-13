/* =========================================================
   TEMPLATE DOUTOR — JavaScript
   ========================================================= */

/* ---- CONFIGURAÇÃO POR CLIENTE ---- */
const CONFIG = {
  whatsapp: "5511900000000", // DDI + DDD + número, só dígitos
  mensagem: "Olá! Gostaria de agendar uma consulta."
};

/* Aplica o link do WhatsApp em todo elemento com [data-wpp] */
document.querySelectorAll("[data-wpp]").forEach(el => {
  el.href = `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(CONFIG.mensagem)}`;
  el.target = "_blank"; el.rel = "noopener";
});

/* Menu mobile (abre/fecha e fecha ao clicar em um link) */
const burger = document.getElementById("burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => { burger.classList.toggle("open"); menu.classList.toggle("open"); });
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); menu.classList.remove("open"); }));

/* Sombra no header ao rolar */
const header = document.getElementById("header");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive: true });

/* Animação de entrada ao rolar (IntersectionObserver) */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* Contador animado dos números (data-count="valor final") */
const counters = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, step = Math.max(1, end / 60);
    let n = 0;
    const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = Math.floor(n); if (n >= end) clearInterval(t); }, 25);
    counters.unobserve(el);
  });
});
document.querySelectorAll("[data-count]").forEach(el => counters.observe(el));

/* Ano automático no rodapé */
document.getElementById("year").textContent = new Date().getFullYear();
