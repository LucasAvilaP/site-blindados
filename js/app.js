(() => {
  // =========================
  // CONFIG
  // =========================
  // Formato: 55 + DDD + número (somente dígitos)
  const WHATSAPP_NUMBER = "5521999999999"; // <-- TROQUE AQUI

  const BRAND = "Blindados Premium";
  const REGION = "RJ e região";

  function buildWaLink(message) {
    const base = `https://wa.me/${WHATSAPP_NUMBER}`;
    const text = encodeURIComponent(message.trim());
    return `${base}?text=${text}`;
  }

  function pageOrigin() {
    return `${document.title} | ${location.pathname}`;
  }

  // =========================
  // MENU MOBILE
  // =========================
  const hamburger = document.querySelector("[data-hamburger]");
  const menu = document.querySelector("[data-menu]");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("mobile-open");
      hamburger.setAttribute(
        "aria-expanded",
        menu.classList.contains("mobile-open") ? "true" : "false"
      );
    });
  }

  // =========================
  // FAQ ACCORDION
  // =========================
  document.querySelectorAll("[data-accordion]").forEach((acc) => {
    const btn = acc.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const open = acc.getAttribute("data-open") === "true";
      acc.setAttribute("data-open", open ? "false" : "true");
    });
  });

  // =========================
  // WHATSAPP LINKS (geral)
  // data-wa + data-wa-message
  // =========================
  document.querySelectorAll("[data-wa]").forEach((a) => {
    const baseMsg = a.getAttribute("data-wa-message") || "Olá! Quero um orçamento de carro blindado.";
    const msg = `${baseMsg}\n\n${BRAND} • ${REGION}\nOrigem: ${pageOrigin()}`;
    a.setAttribute("href", buildWaLink(msg));
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  // =========================
  // WHATSAPP LINKS (frota)
  // data-wa-quote: botão que monta msg com modelo e opção motorista
  // =========================
  document.querySelectorAll("[data-wa-quote]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const model = btn.getAttribute("data-model") || "Modelo";
      const driver = btn.getAttribute("data-driver") || "A combinar";
      const period = btn.getAttribute("data-period") || "__/__/__ a __/__/__";
      const city = btn.getAttribute("data-city") || "RJ (bairro/cidade)";
      const service = btn.getAttribute("data-service") || "Locação";

      const msg =
`Olá! Quero orçamento de carro blindado.

Serviço: ${service}
Modelo: ${model}
Com motorista: ${driver}
Período: ${period}
Local: ${city}

(Se possível, envie disponibilidade e condições.)

${BRAND} • ${REGION}
Origem: ${pageOrigin()}`;

      window.open(buildWaLink(msg), "_blank", "noopener");
    });
  });

  // =========================
  // FILTRO DE FROTA (chips)
  // =========================
  const chips = document.querySelectorAll("[data-filter]");
  const fleetItems = document.querySelectorAll("[data-fleet-item]");
  if (chips.length && fleetItems.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        const filter = chip.getAttribute("data-filter"); // all|sedan|suv
        fleetItems.forEach((item) => {
          const type = item.getAttribute("data-type");
          item.style.display = (filter === "all" || filter === type) ? "" : "none";
        });
      });
    });
  }

  // =========================
  // FORM -> WHATSAPP (contato)
  // =========================
  const form = document.querySelector("[data-wa-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      const nome = String(fd.get("nome") || "").trim();
      const telefone = String(fd.get("telefone") || "").trim();
      const periodo = String(fd.get("periodo") || "").trim();
      const local = String(fd.get("local") || "").trim();
      const modelo = String(fd.get("modelo") || "").trim();
      const motorista = String(fd.get("motorista") || "").trim();
      const uso = String(fd.get("uso") || "").trim();
      const detalhes = String(fd.get("detalhes") || "").trim();

      const msg =
`Olá! Quero orçamento de carro blindado.

Nome: ${nome || "-"}
Telefone: ${telefone || "-"}
Período: ${periodo || "-"}
Local: ${local || "-"}
Modelo: ${modelo || "-"}
Com motorista: ${motorista || "-"}
Finalidade: ${uso || "-"}

Detalhes:
${detalhes || "-"}

${BRAND} • ${REGION}
Origem: ${pageOrigin()}`;

      window.open(buildWaLink(msg), "_blank", "noopener");
    });
  }
})();