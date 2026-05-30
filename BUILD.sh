#!/bin/bash
# ================================================================
# BLACK CHERRY — Script de build APK One-Click
# Prérequis: Java 17+, Node.js 18+, Android SDK (installé par ce script)
# ================================================================

set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; GOLD='\033[0;33m'; NC='\033[0m'
log() { echo -e "${GOLD}[BC]${NC} $1"; }
ok()  { echo -e "${GREEN}[OK]${NC} $1"; }
err() { echo -e "${RED}[ERR]${NC} $1"; exit 1; }

log "🍒 Black Cherry — Build APK v2.0.0"
echo "================================="

# Vérifier Java
java -version 2>/dev/null || err "Java non trouvé. Installer JDK 17: https://adoptium.net"
JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | cut -d'.' -f1)
[ "$JAVA_VERSION" -ge 17 ] || err "Java 17+ requis (version actuelle: $JAVA_VERSION)"
ok "Java $JAVA_VERSION détecté"

# Vérifier Node
node -v 2>/dev/null || err "Node.js non trouvé. Installer: https://nodejs.org"
ok "Node.js $(node -v) détecté"

# Vérifier Android SDK
if [ -z "$ANDROID_HOME" ]; then
    # Tenter de trouver Android SDK commun
    COMMON_PATHS=(
        "$HOME/Android/Sdk"
        "$HOME/Library/Android/sdk"
        "/opt/android-sdk"
        "C:/Users/$USERNAME/AppData/Local/Android/Sdk"
    )
    for p in "${COMMON_PATHS[@]}"; do
        if [ -d "$p" ]; then ANDROID_HOME="$p"; break; fi
    done
fi

if [ -z "$ANDROID_HOME" ]; then
    err "Android SDK non trouvé. Installer Android Studio: https://developer.android.com/studio\nOu définir ANDROID_HOME dans votre environnement."
fi
ok "Android SDK: $ANDROID_HOME"

# Installer dépendances npm
log "Installation des dépendances npm..."
npm install
ok "npm install terminé"

# Sync Capacitor
log "Synchronisation Capacitor..."
npx cap sync android
ok "Capacitor sync OK"

# Rendre gradlew exécutable
chmod +x android/gradlew

# Build APK Debug
log "Build APK Debug..."
cd android
./gradlew assembleDebug --no-daemon 2>&1 | grep -E "(BUILD|ERROR|FAILURE|warning)" || true

if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    ok "✅ APK Debug généré !"
    cp app/build/outputs/apk/debug/app-debug.apk ../BlackCherry-Debug.apk
    echo ""
    echo -e "${GREEN}📱 APK DEBUG → $(realpath ../BlackCherry-Debug.apk)${NC}"
fi

# Build APK Release
log "Build APK Release..."
./gradlew assembleRelease --no-daemon 2>&1 | grep -E "(BUILD|ERROR|FAILURE)" || true

if [ -f "app/build/outputs/apk/release/app-release-unsigned.apk" ]; then
    ok "✅ APK Release (non signé) généré !"
    cp app/build/outputs/apk/release/app-release-unsigned.apk ../BlackCherry-Release-unsigned.apk
    echo ""
    echo -e "${GOLD}📱 APK RELEASE → $(realpath ../BlackCherry-Release-unsigned.apk)${NC}"
    echo ""
    echo "Pour signer l'APK (requis pour le Play Store):"
    echo "  keytool -genkey -v -keystore blackcherry.keystore -alias blackcherry -keyalg RSA -keysize 2048 -validity 10000"
    echo "  jarsigner -keystore blackcherry.keystore BlackCherry-Release-unsigned.apk blackcherry"
    echo "  \$ANDROID_HOME/build-tools/34.0.0/zipalign -v 4 BlackCherry-Release-unsigned.apk BlackCherry-v2.0.apk"
fi
cd ..

echo ""
log "🍒 Build terminé ! Pour installer sur votre téléphone:"
echo "  adb install BlackCherry-Debug.apk"
echo "  (ou transfert USB et installation manuelle en activant les sources inconnues)"
