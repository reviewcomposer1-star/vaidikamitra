    const Storage = {
      KEYS: {
        LANGUAGE: 'vm_lang',
        THEME: 'vm_theme',
        FAVOURITES: 'vm_favourites',
        EVENTS: 'vm_events',
        COUNTERS: 'vm_counters',
        NOTES: 'vm_notes'
      },

      get(key, fallback = null) {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : fallback;
        } catch(e) {
          console.error("Storage error:", e);
          return fallback;
        }
      },

      set(key, val) {
        try {
          localStorage.setItem(key, JSON.stringify(val));
        } catch(e) {
          console.error("Storage set error:", e);
        }
      }
    };

    // ---------------------------------------------------------
    // 2. CORE: LOCALES (English & Malayalam UI Strings)
    // ---------------------------------------------------------
