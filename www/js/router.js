/* ================================================================
   BLACK CHERRY - ROUTER (Navigation Controller)
   Fichier : js/router.js
   Role    : Gestion de la navigation entre ecrans.
================================================================ */

const Router = (() => {

  const ALL_SCREENS = ["auth","home","product","cart","checkout","profile","cgv"];
  const HIDE_NAV = new Set(["auth","product","checkout","cgv"]);

  let _prev = "home";
  let _current = null;
  const _history = [];

  function navigate(screenId, params = {}, options = {}) {
    if (!ALL_SCREENS.includes(screenId)) {
      console.warn(`[Router] Ecran inconnu : "${screenId}"`);
      return;
    }

    if (_current && _current !== screenId) {
      if (!options.replace) _history.push(_current);
      if (_current !== "cgv") _prev = _current;
    }
    _current = screenId;

    ALL_SCREENS.forEach(id => {
      const el = document.getElementById(`sc-${id}`);
      if (!el) return;
      el.classList.remove("active");
      el.style.display = "none";
    });

    const target = document.getElementById(`sc-${screenId}`);
    if (target) {
      target.style.display = "flex";
      requestAnimationFrame(() => target.classList.add("active"));
    }

    const nav = document.getElementById("bottom-nav");
    if (nav) {
      nav.style.display = HIDE_NAV.has(screenId) ? "none" : "flex";
    }

    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    const navEl = document.getElementById(`nav-${screenId}`);
    if (navEl) navEl.classList.add("active");

    _onEnter(screenId, params);
  }

  function back() {
    if (_history.length) {
      navigate(_history.pop(), {}, { replace: true });
      return true;
    }
    if (_current && _current !== "home" && _current !== "auth") {
      navigate("home", {}, { replace: true });
      return true;
    }
    return true;
  }

  function handleNativeBack() {
    const overlay = document.getElementById("overlay");
    if (overlay && !overlay.classList.contains("hidden")) {
      Modal.close();
      return true;
    }
    if (_current === "checkout" && typeof CheckoutScreen !== "undefined") {
      CheckoutScreen.back();
      return true;
    }
    return back();
  }

  function getPrev() { return _prev; }
  function getCurrent() { return _current; }

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

  return { navigate, back, handleNativeBack, getPrev, getCurrent };

})();

const Nav = Router;

window.addEventListener("native-back", () => Router.handleNativeBack());
