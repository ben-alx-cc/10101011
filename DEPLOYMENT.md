# Deployment Anleitung für EINS PWA

## 🚀 GitHub Pages Setup

### 1. Repository vorbereiten
Ihr Repository `10101011` ist bereits angelegt. Führen Sie folgende Schritte aus:

```bash
# Im workspace Verzeichnis
git init
git add .
git commit -m "Initial PWA setup"
git branch -M main
git remote add origin https://github.com/[IHR-USERNAME]/10101011.git
git push -u origin main
```

### 2. GitHub Pages aktivieren

1. Gehen Sie zu Ihrem Repository auf GitHub: `https://github.com/[IHR-USERNAME]/10101011`
2. Klicken Sie auf **Settings** (oben rechts)
3. Scrollen Sie zu **Pages** (linke Seitenleiste)
4. Bei **Source** wählen Sie **"GitHub Actions"**
5. Die App wird automatisch deployed bei jedem Push

### 3. Icons generieren (optional)

1. Öffnen Sie `generate-icons.html` in Ihrem Browser
2. Klicken Sie auf "Generate Icons"
3. Laden Sie alle generierten Icons herunter
4. Ersetzen Sie die Platzhalter-Icons in Ihrem Repository

### 4. Live-URL

Nach dem Deployment ist Ihre PWA verfügbar unter:
**https://[IHR-USERNAME].github.io/10101011/**

## 📱 Installation testen

1. Öffnen Sie die URL auf Ihrem Smartphone
2. Fügen Sie sie zum Home-Bildschirm hinzu
3. Testen Sie die Offline-Funktionalität (Flugmodus)

## 🔧 Anpassungen

### Domain ändern (optional)
- Erstellen Sie eine `CNAME` Datei mit Ihrer Domain
- Konfigurieren Sie DNS-Einstellungen

### App-Name ändern
- Bearbeiten Sie `manifest.json`
- Ändern Sie `name` und `short_name`
- Passen Sie `index.html` `<title>` an

### Farben anpassen
- Bearbeiten Sie `theme_color` und `background_color` in `manifest.json`
- Ändern Sie CSS-Farben in `index.html`

## ✅ Checkliste

- [ ] Repository erstellt und Code gepusht
- [ ] GitHub Pages aktiviert (GitHub Actions)
- [ ] PWA funktioniert online
- [ ] Installation auf Smartphone getestet
- [ ] Offline-Funktionalität getestet
- [ ] Icons generiert und ersetzt (optional)

Die PWA ist jetzt bereit für den produktiven Einsatz! 🎉
