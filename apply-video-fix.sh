#!/bin/bash

# 🎯 GAVLIK CAPITAL - VIDEO PLAYER FIX APLIKACE
# =============================================

echo "🎯 Aplikace Video Player Fix pro Gavlik Capital"
echo "=============================================="

# Kontrola, zda jsme ve správném adresáři
if [ ! -f "package.json" ]; then
    echo "❌ Error: Nejste v root adresáři gc-website projektu!"
    echo "   Přejděte do adresáře s package.json a spusťte znovu."
    exit 1
fi

echo "✅ Detekován gc-website projekt"

# Kontrola existence původního souboru
ORIGINAL_FILE="src/components/landing/info-section.tsx"
IMPROVED_FILE="src/components/landing/info-section-improved.tsx"
CSS_FILE="src/app/globals.css"
CSS_IMPROVEMENTS="src/components/landing/video-player-improvements.css"

if [ ! -f "$ORIGINAL_FILE" ]; then
    echo "❌ Error: Původní soubor $ORIGINAL_FILE neexistuje!"
    exit 1
fi

if [ ! -f "$IMPROVED_FILE" ]; then
    echo "❌ Error: Vylepšený soubor $IMPROVED_FILE neexistuje!"
    echo "   Ujistěte se, že máte všechny soubory z fix balíčku."
    exit 1
fi

echo "✅ Všechny potřebné soubory nalezeny"

# Vytvoření zálohy
BACKUP_DIR="backups/video-player-fix-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Vytváření zálohy..."
cp "$ORIGINAL_FILE" "$BACKUP_DIR/info-section.tsx.backup"
if [ -f "$CSS_FILE" ]; then
    cp "$CSS_FILE" "$BACKUP_DIR/globals.css.backup"
fi

echo "✅ Záloha uložena do: $BACKUP_DIR"

# Aplikace změn
echo "🔧 Aplikace vylepšení..."

# 1. Nahrazení hlavního souboru
cp "$IMPROVED_FILE" "$ORIGINAL_FILE"
echo "✅ Nahrazen info-section.tsx"

# 2. Přidání CSS stylů
if [ -f "$CSS_IMPROVEMENTS" ]; then
    echo "" >> "$CSS_FILE"
    echo "/* ============================== */" >> "$CSS_FILE"
    echo "/*    VIDEO PLAYER VYLEPŠENÍ      */" >> "$CSS_FILE"
    echo "/* ============================== */" >> "$CSS_FILE"
    cat "$CSS_IMPROVEMENTS" >> "$CSS_FILE"
    echo "✅ Přidány CSS styly do globals.css"
else
    echo "⚠️  CSS vylepšení nenalezena, budete je muset přidat manuálně"
fi

# Kontrola TypeScript závislostí
echo "🔍 Kontrola TypeScript závislostí..."
if grep -q "useScrollAnimation" "$ORIGINAL_FILE"; then
    if [ ! -f "src/hook/index.ts" ] && [ ! -f "src/hooks/index.ts" ]; then
        echo "⚠️  Varování: Hook useScrollAnimation nebyl nalezen"
        echo "   Ujistěte se, že máte správně nakonfigurované custom hooky"
    else
        echo "✅ Hooks nalezeny"
    fi
fi

# Restartování dev serveru pokud běží
if pgrep -f "next dev" > /dev/null; then
    echo "🔄 Restartování Next.js dev serveru..."
    pkill -f "next dev"
    sleep 2
    echo "   Dev server zastaven - spusťte znovu: npm run dev"
else
    echo "ℹ️  Dev server neběží - spusťte: npm run dev"
fi

echo ""
echo "🎉 APLIKACE DOKONČENA!"
echo "===================="
echo ""
echo "📝 CO BYLO PROVEDENO:"
echo "  ✅ Záloha původních souborů"
echo "  ✅ Nahrazen video přehrávač novým kódem"
echo "  ✅ Přidány CSS styly pro vylepšení"
echo ""
echo "🧪 TESTOVÁNÍ:"
echo "  1. Spusťte dev server: npm run dev"
echo "  2. Navštivte stránku s video přehrávačem"
echo "  3. Otestujte tyto funkce:"
echo "     • Drag & drop na timeline"
echo "     • Klávesové zkratky (Space, M, F, šipky)"
echo "     • Volume slider (hover na mute button)"
echo "     • Double-click pro fullscreen"
echo "     • Loading indikátory"
echo ""
echo "🔧 PŘÍPADNÉ PROBLÉMY:"
echo "  • TypeScript chyby → zkontrolujte import hooks"
echo "  • CSS se neaplikuje → restartujte dev server"
echo "  • Video se nenačte → zkontrolujte síť a URL"
echo ""
echo "📦 ZÁLOHA ULOŽENA V: $BACKUP_DIR"
echo ""
echo "✨ Enjoy your improved video player!"