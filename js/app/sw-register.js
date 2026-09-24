/* Service worker registration for GitHub Pages and other HTTPS static hosts. */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } catch (error) {
      console.warn('Vaidika Mithra service worker registration failed:', error);
    }
  });
}
