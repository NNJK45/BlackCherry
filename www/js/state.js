/* ================================================================
   BLACK CHERRY — STATE MANAGER
   Fichier : js/state.js
   Rôle    : Gestion d'état global persisté dans localStorage.
             Toute modification du state passe par ce module.
             Aucun autre fichier n'écrit dans localStorage directement.
================================================================ */

const State = (() => {

  const LS_KEY  = "bc_v2";

  /** État par défaut — restauré à la déconnexion ou suppression du compte */
  const DEFAULTS = {
    ageConfirmed: false,
    loggedIn:     false,
    isGuest:      false,
    user: {
      name:    "",
      email:   "",
      phone:   "",
      address: "",
      avatar:  "👤"
    },
    discreet:       false,
    cart:           [],   // [{ id, qty, color, size }]
    orders:         [],   // [OrderObject, ...]
    selectedColors: {},   // { productId: colorName }
    selectedSizes:  {}    // { productId: sizeName }
  };

  // État en mémoire
  let _state = { ...DEFAULTS };

  // ── PERSISTENCE ────────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) _state = { ...DEFAULTS, ...JSON.parse(raw) };
    } catch (_) { /* ignore */ }
  }

  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(_state)); } catch (_) { /* ignore */ }
  }

  function reset() {
    _state = { ...DEFAULTS };
    localStorage.removeItem(LS_KEY);
  }

  // ── GETTERS / SETTERS GÉNÉRIQUES ───────────────────────────────
  function get(key) { return key ? _state[key] : _state; }

  function set(key, value) {
    _state[key] = value;
    save();
  }

  // ── CART ────────────────────────────────────────────────────────
  /**
   * Ajoute qty unités d'un produit au panier.
   * @returns {boolean} true si ajout réussi, false si stock insuffisant.
   */
  function addToCart(productId, qty = 1) {
    const product = CATALOG.find(p => p.id === productId);
    if (!product || product.stock <= 0) return false;

    const existing = _state.cart.find(i => i.id === productId);
    if (existing) {
      if (existing.qty + qty > product.stock) return false;
      existing.qty += qty;
    } else {
      _state.cart.push({
        id:    productId,
        qty,
        color: _state.selectedColors[productId] || null,
        size:  _state.selectedSizes[productId]  || null
      });
    }
    save();
    return true;
  }

  function removeFromCart(productId) {
    _state.cart = _state.cart.filter(i => i.id !== productId);
    save();
  }

  function updateQty(productId, delta) {
    const item    = _state.cart.find(i => i.id === productId);
    const product = CATALOG.find(p => p.id === productId);
    if (!item || !product) return;
    const newQty = item.qty + delta;
    if (newQty <= 0) { removeFromCart(productId); return; }
    if (newQty > product.stock) return;
    item.qty = newQty;
    save();
  }

  function clearCart() {
    _state.cart = [];
    save();
  }

  // ── CART COMPUTED ────────────────────────────────────────────────
  function cartCount() {
    return _state.cart.reduce((n, i) => n + i.qty, 0);
  }

  function cartSubtotal() {
    return _state.cart.reduce((sum, item) => {
      const p = CATALOG.find(x => x.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }

  // ── ORDERS ──────────────────────────────────────────────────────
  function addOrder(order) {
    _state.orders.unshift(order);
    _state.cart = [];
    save();
  }

  // ── EXPORT ──────────────────────────────────────────────────────
  return {
    load, save, reset,
    get, set,
    addToCart, removeFromCart, updateQty, clearCart,
    cartCount, cartSubtotal,
    addOrder
  };

})();
