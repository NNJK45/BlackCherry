/* ================================================================
   BLACK CHERRY — ROUTER (Navigation Controller)
   Fichier : js/router.js
   Rôle    : Gestion de la navigation entre écrans.
             Chaque écran est un élément #sc-{name}.
             Le router gère aussi la barre de navigation
             et les écrans qui la masquent.
================================================================ */

const Router = (() => {

  /** Identifiants de tous les écrans */
  const ALL_SCREENS = ["auth","home","product","cart","checkout","profile","cgv"];

  /** Écrans qui masquent la bottom nav */
  const HIDE_NAV = new Set(["auth","product","checkout","cgv"]);

  /** Écran précédent (pour le bouton retour des CGV) */
  let _prev = "home";

  /** Écran actif courant */
  let _current = null;

  /**
   * Navigue vers un écran.
   * @param {string} screenId  - ID de l'écran cible
   * @param {Object} [params]  - Données optionnelles passées au module cible
   */
  function navigate(screenId, params = {}) {
    if (!ALL_SCREENS.includes(screenId)) {
      console.warn(`[Router] Écran inconnu : "${screenId}"`);
      return;
    }

    // Mémoriser l'écran précédent (sauf CGV)
    if (_current && _current !== "cgv") _prev = _current;
    _current = screenId;

    // Masquer tous les écrans
    ALL_SCREENS.forEach(id => {
      const el = document.getElementById(`sc-${id}`);
      if (!el) return;
      el.classList.remove("active");
      el.style.display = "none";
    });

    // Afficher l'écran cible
    const target = document.getElementById(`sc-${screenId}`);
    if (target) {
      target.style.display = "flex";
      // Petit délai pour déclencher la transition CSS
      requestAnimationFrame(() => target.classList.add("active"));
    }

    // Bottom nav
    const nav = document.getElementById("bottom-nav");
    if (nav) {
      nav.style.display = HIDE_NAV.has(screenId) ? "none" : "flex";
    }

    // Mettre à jour l'état actif de la nav
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    const navEl = document.getElementById(`nav-${screenId}`);
    if (navEl) navEl.classList.add("active");

    // Callbacks d'initialisation des modules par écran
    _onEnter(screenId, params);
  }

  /** Retourne à l'écran précédent */
  function back() {
    navigate(_prev);
  }

  /** Retourne l'identifiant de l'écran précédent */
  function getPrev() { return _prev; }

  /** Retourne l'identifiant de l'écran actif */
  function getCurrent() { return _current; }

  /**
   * Hook appelé à chaque entrée dans un écran.
   * Chaque module expose une méthode onEnter() optionnelle.
   */
  function _onEnter(screenId, params) {
    const hooks = {
      home:     () => typeof HomeScreen     !== "undefined" && HomeScreen.onEnter(),
      cart:     () => typeof CartScreen     !== "undefined" && CartScreen.onEnter(),
      checkout: () => typeof CheckoutScreen !== "undefined" && CheckoutScreen.onEnter(),
      profile:  () => typeof ProfileScreen  !== "undefined" && ProfileScreen.onEnter(),
      product:  () => typeof DetailScreen   !== "undefined" && DetailScreen.onEnter(params),
    };
    if (hooks[screenId]) hooks[screenId]();
  }

  return { navigate, back, getPrev, getCurrent };

})();

// Alias court pour l'usage inline dans le HTML
const Nav = Router;
