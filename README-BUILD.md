# 🍒 Black Cherry — Guide de Compilation APK

## 🚀 Option 1 — GitHub Actions (RECOMMANDÉE, sans Android Studio)

La façon la plus simple d'obtenir l'APK sans rien installer :

1. **Créer un repo GitHub** (gratuit) sur [github.com](https://github.com)
2. **Pousser ce dossier** sur le repo :
   ```bash
   git init
   git add .
   git commit -m "Black Cherry v2.0"
   git remote add origin https://github.com/VOTRE-NOM/black-cherry.git
   git push -u origin main
   ```
3. **Aller dans l'onglet Actions** de votre repo GitHub
4. Le build se lance automatiquement — attendre ~5 minutes
5. **Télécharger l'APK** dans la section "Artifacts" du workflow

✅ **L'APK est prêt à installer** sur n'importe quel Android.

---

## 🛠️ Option 2 — Android Studio (Build local)

### Prérequis
- [Android Studio](https://developer.android.com/studio) (gratuit, inclut le SDK)
- [Java JDK 17](https://adoptium.net)
- [Node.js 18+](https://nodejs.org)

### Étapes
```bash
# 1. Installer les dépendances
npm install

# 2. Synchroniser Capacitor
npx cap sync android

# 3. Ouvrir dans Android Studio
npx cap open android

# 4. Dans Android Studio : Build > Generate Signed Bundle/APK
#    Choisir APK > Créer un nouveau keystore > Compiler
```

### Ou via ligne de commande (si Android SDK installé)
```bash
chmod +x BUILD.sh
./BUILD.sh
```

---

## 📱 Option 3 — Build en ligne (sans rien installer)

Utilisez **Appetize.io** pour tester directement dans le navigateur :
1. Uploader l'APK debug sur [appetize.io](https://appetize.io)
2. Tester l'app sans téléphone Android

Ou **Expo EAS Build** (nécessite un compte Expo gratuit) :
```bash
npm install -g @expo/eas-cli
eas login
eas build --platform android
```

---

## 🔐 Signer l'APK pour le Play Store

```bash
# Générer un keystore (à faire UNE SEULE FOIS — gardez-le précieusement)
keytool -genkey -v \
  -keystore blackcherry-release.keystore \
  -alias blackcherry \
  -keyalg RSA -keysize 2048 -validity 10000

# Signer l'APK
jarsigner -verbose \
  -sigalg SHA256withRSA \
  -digestalg SHA-256 \
  -keystore blackcherry-release.keystore \
  BlackCherry-Release-unsigned.apk \
  blackcherry

# Aligner l'APK
$ANDROID_HOME/build-tools/34.0.0/zipalign -v 4 \
  BlackCherry-Release-unsigned.apk \
  BlackCherry-v2.0-signed.apk
```

---

## 📤 Publier sur le Play Store

1. Créer un compte [Google Play Console](https://play.google.com/console) (25 USD one-time)
2. Créer une nouvelle application
3. Déclarer la **catégorie de contenu adulte** (requis pour les produits adultes)
4. Uploader l'APK signé
5. Remplir la fiche store (description, captures, politique de confidentialité)
6. Soumettre pour review (~3 jours)

> ⚠️ **Important Play Store :** L'app doit avoir une Politique de Confidentialité accessible depuis une URL publique. Hébergez le contenu des CGV de l'app sur `blackcherry.cm/privacy`.

---

## 📁 Structure du projet

```
blackcherry-mobile/
├── www/
│   └── index.html          ← Toute l'application (single-file)
├── android/                ← Projet Android natif (Capacitor)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/blackcherry/intimatelyyours/
│   │   │   │   └── MainActivity.java
│   │   │   └── res/
│   │   │       ├── drawable/   ← Icônes vectorielles
│   │   │       ├── mipmap-*/   ← Icônes launcher
│   │   │       └── values/     ← Couleurs, styles, strings
│   │   └── build.gradle
│   ├── gradlew              ← Script Gradle (auto-télécharge gradle)
│   └── variables.gradle
├── .github/workflows/
│   └── build-apk.yml        ← CI/CD GitHub Actions
├── capacitor.config.json
├── package.json
├── BUILD.sh                 ← Script one-click
└── README-BUILD.md          ← Ce fichier
```

---

*Black Cherry v2.0.0 — Intimately Yours | Capacitor 6 + Android API 24-34*
