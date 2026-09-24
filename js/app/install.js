/* Vaidika Mithra PWA installation controller. Uses the real browser install prompt. */
const InstallManager = {
  deferredPrompt: null,
  gate: null,
  installButton: null,
  continueButton: null,
  status: null,

  isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  },

  isIOS() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
  },

  init() {
    this.gate = document.getElementById('pwa-install-gate');
    this.installButton = document.getElementById('pwa-install-button');
    this.continueButton = document.getElementById('pwa-continue-button');
    this.status = document.getElementById('pwa-install-status');
    if (!this.gate) return;

    // Always show the entry gate in a normal browser session.
    // Once the app is actually running in standalone mode, skip the gate.
    if (this.isStandalone()) {
      this.hide();
      return;
    }

    this.installButton?.addEventListener('click', () => this.install());
    this.continueButton?.addEventListener('click', () => this.enterBrowser());

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.setInstallAvailable();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.setStatus('Vaidika Mithra is installed. Opening the app…');
      sessionStorage.setItem('vaidika_install_entered', '1');
      setTimeout(() => this.hide(), 650);
    });

    // If the browser does not expose beforeinstallprompt, give a truthful fallback.
    setTimeout(() => {
      if (!this.deferredPrompt) this.setFallbackState();
    }, 1400);
  },

  async install() {
    if (!this.deferredPrompt) {
      if (this.isIOS()) {
        this.setStatus('On iPhone/iPad: tap Share in Safari, then choose “Add to Home Screen”.');
      } else {
        this.setStatus('Your browser does not expose the one-tap install prompt here. Use the browser menu and choose “Install app” or “Add to Home screen”.');
      }
      return;
    }

    const promptEvent = this.deferredPrompt;
    this.deferredPrompt = null;
    const result = await promptEvent.prompt();
    if (result?.outcome === 'accepted') {
      sessionStorage.setItem('vaidika_install_entered', '1');
      this.setStatus('Installing Vaidika Mithra…');
      setTimeout(() => this.hide(), 900);
    } else {
      this.setStatus('Installation was cancelled. You can continue in the browser.');
    }
  },

  enterBrowser() {
    sessionStorage.setItem('vaidika_install_entered', '1');
    this.hide();
  },

  setInstallAvailable() {
    if (!this.installButton) return;
    this.installButton.hidden = false;
    this.installButton.textContent = 'Install & Enter';
    this.status?.classList.remove('show');
  },

  setFallbackState() {
    if (this.isIOS()) {
      this.installButton && (this.installButton.textContent = 'How to Install');
    } else {
      this.installButton && (this.installButton.textContent = 'Install App');
    }
  },

  setStatus(message) {
    if (!this.status) return;
    this.status.textContent = message;
    this.status.classList.add('show');
  },

  hide() {
    this.gate?.classList.add('pwa-hidden');
    setTimeout(() => { if (this.gate) this.gate.remove(); }, 300);
  }
};

window.addEventListener('DOMContentLoaded', () => InstallManager.init());
