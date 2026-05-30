/* ================================================================
   BLACK CHERRY — MODAL MANAGER
   Fichier : js/modal.js
   Rôle    : Affichage / fermeture de la modale globale.
             Usage : Modal.show(htmlString) / Modal.close()
================================================================ */

const Modal = (() => {

  function show(html) {
    document.getElementById("modal-content").innerHTML = html;
    document.getElementById("overlay").classList.remove("hidden");
  }

  function close() {
    document.getElementById("overlay").classList.add("hidden");
  }

  /** Ferme si clic sur le fond (pas sur le contenu) */
  function onOverlayClick(event) {
    if (event.target === document.getElementById("overlay")) close();
  }

  return { show, close, onOverlayClick };

})();
