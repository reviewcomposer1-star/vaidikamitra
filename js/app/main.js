    window.addEventListener('DOMContentLoaded', () => {
      App.init();

      // Keyboard shortcut for search
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          App.openSearch();
        }
      });
    });
