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
