/* ================================================================
   BLACK CHERRY — UTILITAIRES
   Fichier : js/utils.js
   Rôle    : Fonctions pures sans effets de bord :
             formatage, validation, génération d'IDs,
             affichage de toasts.
================================================================ */

const Utils = {

  // ── FORMATAGE ────────────────────────────────────────────────────
  /** Formate un montant en FCFA avec séparateurs locaux */
  fmt(amount) {
    return new Intl.NumberFormat("fr-CM").format(amount) + " FCFA";
  },

  /** Formate une date ISO en date lisible française */
  fmtDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  },

  /** Échappe le HTML pour éviter les injections XSS */
  esc(str) {
    return String(str)
      .replace(/&/g,  "&amp;")
      .replace(/</g,  "&lt;")
      .replace(/>/g,  "&gt;")
      .replace(/"/g,  "&quot;");
  },

  // ── GÉNÉRATION ───────────────────────────────────────────────────
  /** Génère un identifiant de commande unique (ex: BC-A3B7XY9Z) */
  orderId() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let id = "BC-";
    for (let i = 0; i < 8; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  },

  // ── VALIDATION ───────────────────────────────────────────────────
  validate: {
    email:  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone:  v => v.replace(/\s/g, "").length >= 9,
    pwd:    v => v.length >= 8
  },

  // ── TOAST ────────────────────────────────────────────────────────
  /**
   * Affiche un message toast temporaire à l'écran.
   * @param {string} message  - Texte à afficher
   * @param {number} duration - Durée en ms (défaut: 2600)
   */
  toast(message, duration = 2600) {
    const existing = document.getElementById("_bc_toast");
    if (existing) existing.remove();

    const el = document.createElement("div");
    el.className = "toast";
    el.id = "_bc_toast";
    el.textContent = message;
    document.body.appendChild(el);

    setTimeout(() => el.remove(), duration);
  }
};

const SliderManager = (() => {
  const sliders = new Map();

  function _normalizeImages(images) {
    return (Array.isArray(images) ? images : [])
      .filter(Boolean)
      .map(src => String(src));
  }

  function _setImage(id) {
    const slider = sliders.get(id);
    if (!slider) return;

    const img = document.getElementById(`${id}-img`);
    if (!img) {
      destroy(id);
      return;
    }

    img.src = slider.images[slider.index];
  }

  function _startAutoSlide(id) {
    const slider = sliders.get(id);
    if (!slider || slider.images.length <= 1) return;

    slider.intervalId = window.setInterval(() => {
      next(id);
    }, 4000);
  }

  function register(id, images) {
    const cleanId = String(id);
    const cleanImages = _normalizeImages(images);

    destroy(cleanId);

    if (!cleanImages.length) return;

    sliders.set(cleanId, {
      images: cleanImages,
      index: 0,
      intervalId: null
    });

    _startAutoSlide(cleanId);
  }

  function destroy(id) {
    const slider = sliders.get(String(id));
    if (!slider) return;

    if (slider.intervalId) {
      window.clearInterval(slider.intervalId);
    }
    sliders.delete(String(id));
  }

  function destroyPrefix(prefix) {
    const cleanPrefix = String(prefix);
    Array.from(sliders.keys()).forEach(id => {
      if (id.startsWith(cleanPrefix)) destroy(id);
    });
  }

  function next(id) {
    const slider = sliders.get(String(id));
    if (!slider || !slider.images.length) return;

    slider.index = (slider.index + 1) % slider.images.length;
    _setImage(String(id));
  }

  function prev(id) {
    const slider = sliders.get(String(id));
    if (!slider || !slider.images.length) return;

    slider.index = (slider.index - 1 + slider.images.length) % slider.images.length;
    _setImage(String(id));
  }

  function render(images, idPrefix) {
    const id = String(idPrefix);
    const cleanImages = _normalizeImages(images);

    if (!cleanImages.length) {
      return `
        <div class="slider">
          <img src="assets/no-image.jpg" class="slider-img" alt="" />
        </div>
      `;
    }

    register(id, cleanImages);

    return `
      <div class="slider" data-slider-id="${Utils.esc(id)}">
        <img
          id="${Utils.esc(id)}-img"
          src="${Utils.esc(cleanImages[0])}"
          class="slider-img"
          alt=""
        />
        <button
          type="button"
          class="slider-btn left"
          onclick="event.stopPropagation(); window.__sliderPrev('${Utils.esc(id)}')"
          aria-label="Image precedente">
          &#8249;
        </button>
        <button
          type="button"
          class="slider-btn right"
          onclick="event.stopPropagation(); window.__sliderNext('${Utils.esc(id)}')"
          aria-label="Image suivante">
          &#8250;
        </button>
      </div>
    `;
  }

  return { register, destroy, destroyPrefix, next, prev, render };
})();

window.__sliderNext = id => SliderManager.next(id);
window.__sliderPrev = id => SliderManager.prev(id);
