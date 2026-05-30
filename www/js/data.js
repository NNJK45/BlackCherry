/* ================================================================
   BLACK CHERRY — DATA LAYER
   Fichier : js/data.js
   Rôle    : Catalogue produits, configuration logistique Cameroun,
             moyens de paiement, catégories de navigation.
   ℹ️  Ajouter / modifier les produits ici UNIQUEMENT.
       Chaque produit suit le schéma ProductSchema ci-dessous.
================================================================ */

/**
 * @typedef {Object} ProductColor
 * @property {string} name  - Nom affiché (ex: "Noir")
 * @property {string} hex   - Couleur CSS (ex: "#1A1A1A")
 *
 * @typedef {Object} Product
 * @property {string}         id          - Identifiant unique (ex: "LF001")
 * @property {string}         cat         - Catégorie : 'lingerie' | 'skincare' | 'adult'
 * @property {string}         subcat      - Sous-catégorie (ex: 'femme', 'serum', 'sextoys')
 * @property {string}         emoji       - Emoji représentatif
 * @property {string}         bgColor     - Couleur de fond de la vignette (rgba)
 * @property {string}         name        - Nom public du produit
 * @property {string}         discreteName - Nom discret (mode discret activé)
 * @property {string}         desc        - Description complète
 * @property {number}         price       - Prix en FCFA
 * @property {number}         stock       - Quantité disponible
 * @property {boolean}        isAdult     - Produit réservé aux adultes (21+)
 * @property {ProductColor[]} colors      - Couleurs disponibles (vide si N/A)
 * @property {string[]}       sizes       - Tailles disponibles (vide si N/A)
 */

// ── CATALOGUE ────────────────────────────────────────────────────────────────

const CATALOG = [

  /* ═══════════════════════════════════════
     LINGERIE — FEMME
  ═══════════════════════════════════════ */
  {
    id: "LF001", cat: "lingerie", subcat: "femme",
    emoji: "🌸", bgColor: "rgba(107,20,64,.35)",
    name: "Ensemble Dentelle Nuit",
    discreteName: "Réf. BC-LF001",
    desc: "Ensemble deux pièces en dentelle française finement ouvragée. Soutien-gorge push-up et culotte taille haute assortie. Matière : 85% Polyamide, 15% Élasthanne.",
    price: 18500, stock: 15, isAdult: false,
    colors: [{ name:"Noir", hex:"#1A1A1A" }, { name:"Rouge Grenat", hex:"#7B1526" }, { name:"Ivoire", hex:"#FFFFF0" }],
    sizes: ["S","M","L","XL"]
  },
  {
    id: "LF002", cat: "lingerie", subcat: "femme",
    emoji: "💎", bgColor: "rgba(107,20,64,.35)",
    name: "Parure Satin Royal",
    discreteName: "Réf. BC-LF002",
    desc: "Parure complète en satin de luxe avec ornements nacrés. Body déshabillé avec fermeture lacet. Finition impeccable, douceur incomparable sur la peau.",
    price: 24500, stock: 8, isAdult: false,
    colors: [{ name:"Noir", hex:"#1A1A1A" }, { name:"Bordeaux", hex:"#6B1440" }, { name:"Champagne", hex:"#C8A96E" }],
    sizes: ["S","M","L"]
  },
  {
    id: "LF003", cat: "lingerie", subcat: "femme",
    emoji: "🦋", bgColor: "rgba(107,20,64,.35)",
    name: "Body Résille Or",
    discreteName: "Réf. BC-LF003",
    desc: "Body en résille fine avec détails dorés. Taille unique extensible. Finition bords élastiques dorés et bretelles ajustables.",
    price: 12000, stock: 20, isAdult: false,
    colors: [{ name:"Noir/Or", hex:"#1A1A1A" }, { name:"Rouge/Or", hex:"#8B0000" }],
    sizes: ["TU"]
  },
  {
    id: "LF004", cat: "lingerie", subcat: "femme",
    emoji: "🌹", bgColor: "rgba(107,20,64,.35)",
    name: "Corset Victorian Noir",
    discreteName: "Réf. BC-LF004",
    desc: "Corset style victorien en satin noir avec broderies rouges. Baleinage flexible. Lacets satin ajustables. Réhausse et affine la silhouette.",
    price: 32000, stock: 6, isAdult: false,
    colors: [{ name:"Noir/Rouge", hex:"#1A1A1A" }, { name:"Bordeaux/Or", hex:"#5C1A2A" }],
    sizes: ["S","M","L","XL"]
  },
  {
    id: "LF005", cat: "lingerie", subcat: "femme",
    emoji: "🖤", bgColor: "rgba(107,20,64,.35)",
    name: "Nuisette Voile Transparent",
    discreteName: "Réf. BC-LF005",
    desc: "Nuisette longue en voile transparent avec broderies. Décolleté en V, ruban satin. Longueur mi-cuisse.",
    price: 9500, stock: 25, isAdult: false,
    colors: [{ name:"Noir", hex:"#1A1A1A" }, { name:"Blush", hex:"#E8B4B8" }, { name:"Bordeaux", hex:"#6B1440" }],
    sizes: ["S/M","L/XL"]
  },

  /* ═══════════════════════════════════════
     LINGERIE — HOMME
  ═══════════════════════════════════════ */
  {
    id: "LH001", cat: "lingerie", subcat: "homme",
    emoji: "🔲", bgColor: "rgba(40,20,80,.35)",
    name: "Boxer Satin Premium",
    discreteName: "Réf. BC-LH001",
    desc: "Boxer homme en satin mat ultra-confortable. Taille élastique avec logo brodé. Coupe ajustée qui valorise la silhouette masculine.",
    price: 7500, stock: 30, isAdult: false,
    colors: [{ name:"Noir", hex:"#1A1A1A" }, { name:"Navy", hex:"#0A1628" }, { name:"Bordeaux", hex:"#5C1A2A" }],
    sizes: ["S","M","L","XL","XXL"]
  },
  {
    id: "LH002", cat: "lingerie", subcat: "homme",
    emoji: "🩲", bgColor: "rgba(40,20,80,.35)",
    name: "Slip Dentelle Homme",
    discreteName: "Réf. BC-LH002",
    desc: "Slip homme en dentelle fine et microfibre. Confort exceptionnel. Designé pour l'intimité et le confort au quotidien.",
    price: 6500, stock: 22, isAdult: false,
    colors: [{ name:"Noir", hex:"#1A1A1A" }, { name:"Anthracite", hex:"#3B3B3B" }],
    sizes: ["S","M","L","XL"]
  },

  /* ═══════════════════════════════════════
     SKINCARE — GOMMAGE
  ═══════════════════════════════════════ */
  {
    id: "SK001", cat: "skincare", subcat: "gommage",
    emoji: "🫧", bgColor: "rgba(26,64,40,.35)",
    name: "Gommage Corps Sucre Noir",
    discreteName: "Réf. BC-SK001",
    desc: "Gommage corps exfoliant au sucre noir, huile de coco et extrait de cerise. Élimine les cellules mortes et hydrate intensément. 250g.",
    price: 8900, stock: 35, isAdult: false, colors: [], sizes: []
  },
  {
    id: "SK002", cat: "skincare", subcat: "gommage",
    emoji: "🌿", bgColor: "rgba(26,64,40,.35)",
    name: "Masque Exfoliant Rose",
    discreteName: "Réf. BC-SK002",
    desc: "Masque exfoliant aux microsphères de riz et pétales de rose. Purifie les pores, lisse la texture. Éclat immédiat. 80ml.",
    price: 8200, stock: 30, isAdult: false, colors: [], sizes: []
  },

  /* ═══════════════════════════════════════
     SKINCARE — LOTION TONIQUE
  ═══════════════════════════════════════ */
  {
    id: "SK003", cat: "skincare", subcat: "lotion",
    emoji: "💧", bgColor: "rgba(26,64,40,.35)",
    name: "Lotion Tonique Éclat",
    discreteName: "Réf. BC-SK003",
    desc: "Lotion tonique à la niacinamide 5% et eau de rose. Resserre les pores, unifie le teint, prépare la peau au sérum. Sans alcool. 150ml.",
    price: 9500, stock: 40, isAdult: false, colors: [], sizes: []
  },

  /* ═══════════════════════════════════════
     SKINCARE — SÉRUM
  ═══════════════════════════════════════ */
  {
    id: "SK004", cat: "skincare", subcat: "serum",
    emoji: "✨", bgColor: "rgba(26,64,40,.35)",
    name: "Sérum Éclat Vitamine C",
    discreteName: "Réf. BC-SK004",
    desc: "Sérum concentré à l'acide hyaluronique et vitamine C stabilisée. Atténue les taches, unifie le teint, repulpe la peau dès 14 jours. 30ml.",
    price: 14500, stock: 30, isAdult: false, colors: [], sizes: []
  },
  {
    id: "SK005", cat: "skincare", subcat: "serum",
    emoji: "⚡", bgColor: "rgba(26,64,40,.35)",
    name: "Sérum Rétinol Nuit",
    discreteName: "Réf. BC-SK005",
    desc: "Sérum au rétinol 0.3% encapsulé pour une diffusion progressive. Anti-rides, anti-taches. À utiliser le soir uniquement. 30ml.",
    price: 16500, stock: 18, isAdult: false, colors: [], sizes: []
  },

  /* ═══════════════════════════════════════
     SKINCARE — MASQUES
  ═══════════════════════════════════════ */
  {
    id: "SK006", cat: "skincare", subcat: "masques",
    emoji: "🎭", bgColor: "rgba(26,64,40,.35)",
    name: "Masque Argile Purifiante",
    discreteName: "Réf. BC-SK006",
    desc: "Masque à l'argile kaolin et charbon actif. Absorbe le sébum, désincruste les pores. Peau nette et matifiée après 15 min. 80ml.",
    price: 7800, stock: 28, isAdult: false, colors: [], sizes: []
  },

  /* ═══════════════════════════════════════
     SKINCARE — CRÈMES
  ═══════════════════════════════════════ */
  {
    id: "SK007", cat: "skincare", subcat: "cremes",
    emoji: "🌙", bgColor: "rgba(26,64,40,.35)",
    name: "Crème Nuit Régénérante",
    discreteName: "Réf. BC-SK007",
    desc: "Crème de nuit au rétinol encapsulé et beurre de karité africain. Renouvellement cellulaire nocturne. Sans parabènes. 50ml.",
    price: 16800, stock: 22, isAdult: false, colors: [], sizes: []
  },
  {
    id: "SK008", cat: "skincare", subcat: "cremes",
    emoji: "☀️", bgColor: "rgba(26,64,40,.35)",
    name: "Crème Jour SPF30",
    discreteName: "Réf. BC-SK008",
    desc: "Crème de jour légère SPF30 au karité et aloe vera. Protection solaire, hydratation 8h, fini naturel. 50ml.",
    price: 13200, stock: 25, isAdult: false, colors: [], sizes: []
  },

  /* ═══════════════════════════════════════
     ADULTE — SEXTOYS
  ═══════════════════════════════════════ */
  {
    id: "AD001", cat: "adult", subcat: "sextoys",
    emoji: "💫", bgColor: "rgba(44,0,30,.5)",
    name: "Vibromasseur Intime Élite",
    discreteName: "Réf. BC-AD001",
    desc: "Appareil de bien-être intime rechargeable USB-C. 10 modes progressifs. Silicone médical hypoallergénique. IPX7 étanche. Silencieux < 40dB. Autonomie 2h.",
    price: 45000, stock: 12, isAdult: true,
    colors: [{ name:"Rose", hex:"#D4708A" }, { name:"Violet", hex:"#6C3483" }, { name:"Noir", hex:"#1A1A1A" }],
    sizes: []
  },
  {
    id: "AD002", cat: "adult", subcat: "sextoys",
    emoji: "✦", bgColor: "rgba(44,0,30,.5)",
    name: "Kit Initiation Bien-être",
    discreteName: "Réf. BC-AD002",
    desc: "Coffret découverte : vibromasseur compact silicone rechargeable + lubrifiant aloe 50ml + nettoyant 30ml. Emballage neutre.",
    price: 55000, stock: 8, isAdult: true, colors: [], sizes: []
  },

  /* ═══════════════════════════════════════
     ADULTE — LUBRIFIANTS
  ═══════════════════════════════════════ */
  {
    id: "AD003", cat: "adult", subcat: "lubrifiants",
    emoji: "🌊", bgColor: "rgba(44,0,30,.5)",
    name: "Lubrifiant Naturel Premium",
    discreteName: "Réf. BC-AD003",
    desc: "Lubrifiant intime à base d'eau enrichi à l'aloe vera bio. Compatible préservatifs et silicone. Sans parabènes ni glycérine. pH équilibré (4.0). 100ml.",
    price: 8500, stock: 60, isAdult: true, colors: [], sizes: []
  },
  {
    id: "AD004", cat: "adult", subcat: "lubrifiants",
    emoji: "🍓", bgColor: "rgba(44,0,30,.5)",
    name: "Lubrifiant Arôme Fruits",
    discreteName: "Réf. BC-AD004",
    desc: "Lubrifiant intime à base d'eau arôme fraises. Compatible latex. Sans sucre ajouté. Comestible. pH équilibré. 75ml.",
    price: 7200, stock: 45, isAdult: true, colors: [], sizes: []
  },

  /* ═══════════════════════════════════════
     ADULTE — COSPLAY
  ═══════════════════════════════════════ */
  {
    id: "AD005", cat: "adult", subcat: "cosplay",
    emoji: "🎭", bgColor: "rgba(44,0,30,.5)",
    name: "Kit Cosplay Infirmière",
    discreteName: "Réf. BC-AD005",
    desc: "Costume cosplay adulte complet : robe courte, chapeau, accessoires assortis. Matière satin polyester stretch. Taille unique extensible.",
    price: 28000, stock: 10, isAdult: true,
    colors: [{ name:"Blanc/Rouge", hex:"#F5F5F5" }, { name:"Noir/Blanc", hex:"#1A1A1A" }],
    sizes: ["S/M","L/XL"]
  },

  /* ═══════════════════════════════════════
     ADULTE — DIVERS
  ═══════════════════════════════════════ */
  {
    id: "AD006", cat: "adult", subcat: "divers",
    emoji: "🧴", bgColor: "rgba(44,0,30,.5)",
    name: "Nettoyant Jouets Intime",
    discreteName: "Réf. BC-AD006",
    desc: "Spray nettoyant antibactérien sans alcool pour accessoires intimes. Formule enzymatique naturelle. Sans rinçage. 150ml.",
    price: 6500, stock: 45, isAdult: true, colors: [], sizes: []
  }
];

// ── CATÉGORIES DE NAVIGATION ─────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",      label: "✦ Tout",      sub: [] },
  { id: "lingerie", label: "💋 Lingerie",
    sub: [{ id:"femme",  label:"Femme" }, { id:"homme",  label:"Homme" }]
  },
  { id: "skincare", label: "✨ Skincare",
    sub: [
      { id:"gommage", label:"Gommage" },
      { id:"lotion",  label:"Lotion"  },
      { id:"serum",   label:"Sérum"   },
      { id:"masques", label:"Masques" },
      { id:"cremes",  label:"Crèmes"  }
    ]
  },
  { id: "adult",    label: "🔞 Adulte",
    sub: [
      { id:"sextoys",    label:"Sextoys"    },
      { id:"lubrifiants",label:"Lubrifiants"},
      { id:"cosplay",    label:"Cosplay"    },
      { id:"divers",     label:"Divers"     }
    ]
  }
];

// ── CATÉGORIE → COULEUR INDICATEUR ───────────────────────────────────────────
const CAT_COLOR = {
  lingerie: "#C06080",
  skincare:  "#4CAF7A",
  adult:     "#9B59B6"
};

// ── LOGISTIQUE CAMEROUN ──────────────────────────────────────────────────────
const SHIPPING = {
  cities: {
    "Douala": {
      hasPickup: true,
      hasDomicile: true,
      zones: {
        "Zone A – Centre / Akwa / Bonanjo":    1000,
        "Zone B – Bonabéri / Ndokoti":         1500,
        "Zone C – Logbessou / Kotto / Bassa":  2000
      }
    },
    "Yaoundé": {
      hasPickup: true,
      hasDomicile: true,
      zones: {
        "Zone A – Centre / Bastos / Nlongkak":   1200,
        "Zone B – Essos / Mvan / Nkolndongo":    1800,
        "Zone C – Nkoldongo / Soa / Mfou":       2500
      }
    },
    "Autre ville (agence de voyage)": {
      hasPickup: false,
      hasDomicile: false,
      isIntercity: true,
      agencies: [
        "Finexs Express", "General Express", "Tradex Transport",
        "Buca Voyages", "Touristique Express", "Vatican Express"
      ],
      basePrice: 2500,
      weightLimit: 5,       // kg
      extraPer500g: 400     // FCFA par tranche 500g au-delà de 5kg
    }
  },

  /** Calcule le poids simulé du panier en kg */
  simulateWeight(cart) {
    return cart.reduce((sum, item) => {
      const p = CATALOG.find(x => x.id === item.id);
      if (!p) return sum;
      const g = p.cat === "adult" ? 600 : p.cat === "skincare" ? 300 : 500;
      return sum + g * item.qty;
    }, 0) / 1000;
  },

  /** Calcule les frais de livraison selon la sélection du client */
  compute(city, mode, zone, cart) {
    const conf = SHIPPING.cities[city];
    if (!conf) return 0;
    if (conf.isIntercity) {
      const w = SHIPPING.simulateWeight(cart);
      let price = conf.basePrice;
      if (w > conf.weightLimit) {
        price += Math.ceil((w - conf.weightLimit) / 0.5) * conf.extraPer500g;
      }
      return price;
    }
    if (mode === "pickup")  return 0;
    if (mode === "domicile" && zone) return conf.zones[zone] || 0;
    return 0;
  }
};

// ── MOYENS DE PAIEMENT ───────────────────────────────────────────────────────
const PAYMENTS = [
  { id:"mtn",    name:"MTN Mobile Money",    desc:"Paiement via MTN MoMo",               emoji:"📱", color:"#FFCC00" },
  { id:"orange", name:"Orange Money",        desc:"Paiement via Orange Money",           emoji:"🟠", color:"#FF6600" },
  { id:"card",   name:"Carte Bancaire",      desc:"Visa / Mastercard — Notch Pay",       emoji:"💳", color:"#3D0C23" }
];

// Numéro WhatsApp du service client (sans le +)
const WHATSAPP_NUMBER = "237600000000";
