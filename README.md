# VAIDIKA MITHRA V3

Structured PWA repository.

## Architecture
- `index.html` — markup only
- `css/style.css` — styling
- `js/core/` — storage, locale, configuration
- `js/data/` — Devata, Suktam, Karma, Granthangal, Vrata data
- `js/engines/` — Panchanga calculation subsystem
- `js/components/` — reusable audio player
- `js/pages/` — page rendering
- `js/app/` — application orchestration and V2 customizations
- `locales/` — future UI translation files
- `assets/` — icons/images/audio

Run with VS Code Live Server or `python -m http.server 8000`.


## PWA installation
Vaidika Mithra uses the browser's native PWA installation flow. On supported browsers, open the GitHub Pages URL and choose **Install & Enter**. The app uses `beforeinstallprompt` where available and `display: standalone` after installation. iOS Safari may require Share → Add to Home Screen.
