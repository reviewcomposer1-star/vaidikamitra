    const App = {
      lang: 'en',
      theme: 'dark',
      activeTab: 'today',
      activeParams: null,

      init() {
        // Restore preferences
        this.lang = Storage.get(Storage.KEYS.LANGUAGE, 'en');
        this.theme = Storage.get(Storage.KEYS.THEME, 'dark');

        if (this.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        // Initialize seed events & counters if first run
        if (!Storage.get(Storage.KEYS.EVENTS)) {
          const initialEvents = [
            {
              id: "ev_1",
              title: "Mrityuñjaya Homa & Rudrābhiṣeka",
              date: "2026-09-23",
              time: "07:30 AM",
              location: "Ottapalam / Vadakkanthara Temple",
              notes: [
                "Prepare pure cow ghee (Ājya), Bilva leaves, and 108 dūrvā grass bunches.",
                "Recite Namakam 11 times with Camakam anuvākas.",
                "Ensure Yajamāna saṅkalpa includes gotra and nakṣatra details."
              ],
              completed: false,
              relatedDevata: "shiva",
              relatedSukta: "rudram",
              panchangaSnapshot: PanchangaEngine.calculate(new Date(2026, 8, 23))
            },
            {
              id: "ev_2",
              title: "Śrī Sūkta Homa & Dīpa Pūjā",
              date: "2026-09-25",
              time: "06:00 PM",
              location: "Sādhaka Illam",
              notes: [
                "Assemble 16 red lotus flowers for each ṛca oblation.",
                "Prepare lotus seeds and payasam for Ahuti."
              ],
              completed: false,
              relatedDevata: "devi-sri",
              relatedSukta: "sri-sukta",
              panchangaSnapshot: PanchangaEngine.calculate(new Date(2026, 8, 25))
            }
          ];
          Storage.set(Storage.KEYS.EVENTS, initialEvents);
        }

        if (!Storage.get(Storage.KEYS.COUNTERS)) {
          const initialCounters = [
            { id: "c_1", title: "Śiva Pañcākṣarī (ॐ नमः शिवाय)", mode: "count", value: 108, target: 1008, history: [108] },
            { id: "c_2", title: "Gāyatrī Mahāmantra (Prātaḥ)", mode: "count", value: 36, target: 108, history: [108, 108] }
          ];
          Storage.set(Storage.KEYS.COUNTERS, initialCounters);
        }

        if (!Storage.get(Storage.KEYS.FAVOURITES)) {
          Storage.set(Storage.KEYS.FAVOURITES, [
            { type: "sukta", id: "sri-sukta" },
            { type: "devata", id: "vishnu" }
          ]);
        }

        this.updateLangDisplay();
        AudioEngine.init();
        this.navigate('today');
      },

      t(key) {
        return (Locales[this.lang] && Locales[this.lang][key]) || (Locales['en'][key]) || key;
      },

      toggleLanguage() {
        this.lang = this.lang === 'en' ? 'ml' : 'en';
        Storage.set(Storage.KEYS.LANGUAGE, this.lang);
        this.updateLangDisplay();
        this.navigate(this.activeTab, this.activeParams);
      },

      updateLangDisplay() {
        document.getElementById('lang-indicator').innerText = this.lang === 'en' ? 'മലയാളം' : 'English';
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          el.innerText = this.t(key);
        });
      },

      navigate(tab, params = null) {
        this.activeTab = tab;
        this.activeParams = params;

        // Update nav highlight
        document.querySelectorAll('.nav-desktop-tab').forEach(el => {
          if (el.getAttribute('data-tab') === tab) {
            el.className = 'nav-desktop-tab text-vedic-ochre font-bold flex items-center space-x-1 border-b-2 border-vedic-ochre pb-1';
          } else {
            el.className = 'nav-desktop-tab text-gray-600 dark:text-gray-300 hover:text-vedic-ochre flex items-center space-x-1 pb-1';
          }
        });

        document.querySelectorAll('.nav-btn').forEach(el => {
          if (el.getAttribute('data-page') === tab) {
            el.classList.add('text-vedic-ochre');
            el.classList.remove('text-gray-500', 'dark:text-gray-400');
          } else {
            el.classList.remove('text-vedic-ochre');
            el.classList.add('text-gray-500', 'dark:text-gray-400');
          }
        });

        const container = document.getElementById('app-viewport');
        container.innerHTML = '';

        switch (tab) {
          case 'today':
            container.innerHTML = Pages.renderToday();
            break;
          case 'devata':
            container.innerHTML = params ? Pages.renderDevataDetail(params) : Pages.renderDevataList();
            break;
          case 'sukta':
            container.innerHTML = params ? Pages.renderSuktaDetail(params) : Pages.renderSuktaList();
            break;
          case 'events':
            container.innerHTML = params ? Pages.renderEventWorkspace(params) : Pages.renderEventsList();
            break;
          case 'panchanga':
            container.innerHTML = Pages.renderPanchanga();
            break;
          case 'karma':
            container.innerHTML = Pages.renderKarma();
            break;
          case 'texts':
            container.innerHTML = Pages.renderTexts();
            break;
          case 'tools':
            container.innerHTML = Pages.renderTools();
            break;
          case 'favourites':
            container.innerHTML = Pages.renderFavourites();
            break;
          case 'settings':
            container.innerHTML = Pages.renderSettings();
            break;
          default:
            container.innerHTML = Pages.renderToday();
        }

        lucide.createIcons();
        window.scrollTo(0, 0);
      },

      // Favourites Management
      toggleFavourite(type, id, event) {
        if (event) event.stopPropagation();
        let favs = Storage.get(Storage.KEYS.FAVOURITES, []);
        const exists = favs.some(f => f.type === type && f.id === id);

        if (exists) {
          favs = favs.filter(f => !(f.type === type && f.id === id));
        } else {
          favs.push({ type, id });
        }
        Storage.set(Storage.KEYS.FAVOURITES, favs);
        this.navigate(this.activeTab, this.activeParams);
      },

      isFavourite(type, id) {
        const favs = Storage.get(Storage.KEYS.FAVOURITES, []);
        return favs.some(f => f.type === type && f.id === id);
      },

      // Global Search Handling
      openSearch() {
        document.getElementById('search-modal').classList.remove('hidden');
        document.getElementById('global-search-input').focus();
      },

      closeSearch(e) {
        document.getElementById('search-modal').classList.add('hidden');
      },

      executeSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        const q = (query || '').trim().toLowerCase();
        if (!q) {
          resultsContainer.innerHTML = `<div class="py-8 text-center text-gray-500">Type to search through verified Vedic knowledge and personal records...</div>`;
          return;
        }

        const hits = [];

        // Search Devatas
        DevataMaster.forEach(d => {
          const match = d.name.en.toLowerCase().includes(q) || d.name.ml.includes(q) || d.title.en.toLowerCase().includes(q);
          if (match) hits.push({ type: 'DEVATA', title: d.name[App.lang] || d.name.en, sub: d.title[App.lang] || d.title.en, action: () => App.navigate('devata', d.id) });
        });

        // Search Suktas & Verses
        SuktasMaster.forEach(s => {
          const match = s.title.en.toLowerCase().includes(q) || s.title.ml.includes(q) || s.vibe.toLowerCase().includes(q) ||
                        s.verses.some(v => v.sanskrit.includes(q) || v.malayalam.includes(q) || v.meaning.en.toLowerCase().includes(q));
          if (match) hits.push({ type: 'SUKTA', title: s.title[App.lang] || s.title.en, sub: s.vibe, action: () => App.navigate('sukta', s.id) });
        });

        // Search Karma
        KarmaMaster.forEach(k => {
          const match = k.name.en.toLowerCase().includes(q) || k.name.ml.includes(q) || k.description.en.toLowerCase().includes(q);
          if (match) hits.push({ type: 'KARMA', title: k.name[App.lang] || k.name.en, sub: k.category, action: () => App.navigate('karma') });
        });

        // Search Events
        const events = Storage.get(Storage.KEYS.EVENTS, []);
        events.forEach(ev => {
          const match = ev.title.toLowerCase().includes(q) || (ev.location && ev.location.toLowerCase().includes(q));
          if (match) hits.push({ type: 'EVENT', title: ev.title, sub: `${ev.date} • ${ev.time}`, action: () => App.navigate('events', ev.id) });
        });

        if (hits.length === 0) {
          resultsContainer.innerHTML = `<div class="py-8 text-center text-gray-400">No results found matching "${query}".</div>`;
          return;
        }

        resultsContainer.innerHTML = hits.map((hit, idx) => `
          <div onclick="App.closeSearch(); (${hit.action.toString()})();" class="py-3 px-2 flex items-center justify-between hover:bg-vedic-parchment/40 dark:hover:bg-white/5 cursor-pointer rounded-lg transition">
            <div>
              <span class="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-vedic-ochre/15 text-vedic-ochre mr-2">${hit.type}</span>
              <span class="font-semibold text-sm">${hit.title}</span>
              <p class="text-[11px] text-gray-500 mt-0.5">${hit.sub}</p>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
          </div>
        `).join('');

        lucide.createIcons();
      },

      // Add Modal Handling
      openAddModal() {
        document.getElementById('add-modal').classList.remove('hidden');
        document.getElementById('add-options-grid').classList.remove('hidden');
        document.getElementById('add-form-container').classList.add('hidden');
      },

      closeAddModal() {
        document.getElementById('add-modal').classList.add('hidden');
      },

      initNewItem(type) {
        const formContainer = document.getElementById('add-form-container');
        document.getElementById('add-options-grid').classList.add('hidden');
        formContainer.classList.remove('hidden');

        if (type === 'event') {
          formContainer.innerHTML = `
            <form onsubmit="App.saveNewEvent(event)" class="space-y-3">
              <div class="font-semibold text-xs text-vedic-ochre uppercase tracking-wider">New Ritual Event</div>
              <div>
                <label class="block text-[11px] text-gray-400 mb-1">Event Name / Saṅkalpa</label>
                <input type="text" name="title" required placeholder="e.g. Mahānyāsa Pūrvaka Rudrābhiṣeka" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark focus:outline-none focus:border-vedic-ochre">
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-[11px] text-gray-400 mb-1">Date</label>
                  <input type="date" name="date" required value="${new Date().toISOString().split('T')[0]}" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark">
                </div>
                <div>
                  <label class="block text-[11px] text-gray-400 mb-1">Time</label>
                  <input type="text" name="time" placeholder="07:30 AM" value="07:30 AM" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark">
                </div>
              </div>
              <div>
                <label class="block text-[11px] text-gray-400 mb-1">Location / Temple</label>
                <input type="text" name="location" placeholder="e.g. Guruvayur Temple / Home" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark">
              </div>
              <div>
                <label class="block text-[11px] text-gray-400 mb-1">Preparation Note</label>
                <textarea name="note" placeholder="Dravya checklist, Yajamāna gotra, etc." rows="2" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark"></textarea>
              </div>
              <div class="flex justify-end space-x-2 pt-2">
                <button type="button" onclick="App.openAddModal()" class="px-3 py-1.5 text-xs rounded-lg border border-gray-500">Back</button>
                <button type="submit" class="px-4 py-1.5 text-xs rounded-lg bg-vedic-ochre text-white font-medium">Create Event</button>
              </div>
            </form>
          `;
        } else if (type === 'counter') {
          formContainer.innerHTML = `
            <form onsubmit="App.saveNewCounter(event)" class="space-y-3">
              <div class="font-semibold text-xs text-vedic-ochre uppercase tracking-wider">New Japa Counter</div>
              <div>
                <label class="block text-[11px] text-gray-400 mb-1">Mantra / Title</label>
                <input type="text" name="title" required placeholder="e.g. Mahāmṛtyuñjaya Mantra" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark focus:outline-none focus:border-vedic-ochre">
              </div>
              <div>
                <label class="block text-[11px] text-gray-400 mb-1">Mode</label>
                <select name="mode" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark">
                  <option value="count">Count (Touch/Mālā Tracker)</option>
                  <option value="timer">Meditation Timer</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] text-gray-400 mb-1">Daily Target (Optional)</label>
                <input type="number" name="target" value="108" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark">
              </div>
              <div class="flex justify-end space-x-2 pt-2">
                <button type="button" onclick="App.openAddModal()" class="px-3 py-1.5 text-xs rounded-lg border border-gray-500">Back</button>
                <button type="submit" class="px-4 py-1.5 text-xs rounded-lg bg-vedic-ochre text-white font-medium">Create Tracker</button>
              </div>
            </form>
          `;
        } else {
          formContainer.innerHTML = `
            <div class="text-center py-4 space-y-2">
              <p class="text-xs text-gray-400">Canonical Devata and Vedic knowledge modules are master-indexed to ensure scriptural veracity. You can record personal ritual events and Purohita notes freely.</p>
              <button onclick="App.openAddModal()" class="px-3 py-1.5 text-xs rounded-lg bg-vedic-ochre text-white">Back to Add Menu</button>
            </div>
          `;
        }
      },

      saveNewEvent(e) {
        e.preventDefault();
        const form = e.target;
        const d = new Date(form.date.value);
        const snapshot = PanchangaEngine.calculate(d);

        const newEvent = {
          id: "ev_" + Date.now(),
          title: form.title.value,
          date: form.date.value,
          time: form.time.value || "07:00 AM",
          location: form.location.value || "Home / Sādhaka Kṣetra",
          notes: form.note.value ? [form.note.value] : [],
          completed: false,
          relatedDevata: "shiva",
          relatedSukta: "rudram",
          panchangaSnapshot: snapshot
        };

        const events = Storage.get(Storage.KEYS.EVENTS, []);
        events.unshift(newEvent);
        Storage.set(Storage.KEYS.EVENTS, events);

        App.closeAddModal();
        App.navigate('events', newEvent.id);
      },

      saveNewCounter(e) {
        e.preventDefault();
        const form = e.target;
        const newCounter = {
          id: "c_" + Date.now(),
          title: form.title.value,
          mode: form.mode.value,
          value: 0,
          target: parseInt(form.target.value) || 108,
          history: []
        };

        const counters = Storage.get(Storage.KEYS.COUNTERS, []);
        counters.push(newCounter);
        Storage.set(Storage.KEYS.COUNTERS, counters);

        App.closeAddModal();
        App.navigate('tools');
      },

      openMoreMenu() {
        document.getElementById('more-modal').classList.remove('hidden');
      },

      closeMoreMenu() {
        document.getElementById('more-modal').classList.add('hidden');
      },

      // Generate Full Multi-File Project Repository ZIP
      async exportProjectZip() {
        const zip = new JSZip();

        // 1. README.md
        zip.file("README.md", `# VAIDIKA MITHRA (V1)
A premium digital Vaidika operating system for Vedic students and Purohitas.
Initial scope: South Indian / Carnatic Vaidika tradition.

## Architecture
- Standalone PWA
- Disconnected knowledge averted via stable-id connected graph
- Structured master content for Devata, Suktas, Karma, and Texts
- Local personal data isolation (Events, Notes, Favourites, Japa Counters)
`);

        // 2. manifest.json
        const manifestContent = {
          name: "Vaidika Mithra",
          short_name: "VaidikaMithra",
          start_url: "./index.html",
          display: "standalone",
          background_color: "#161311",
          theme_color: "#B85D19",
          icons: [
            { src: "assets/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "assets/icons/icon-512.png", sizes: "512x512", type: "image/png" }
          ]
        };
        zip.file("manifest.json", JSON.stringify(manifestContent, null, 2));

        // 3. sw.js
        const swContent = `
const CACHE_NAME = 'vaidika-mithra-v1';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
`;
        zip.file("sw.js", swContent);

        // 4. locales/en.json & locales/ml.json
        zip.file("locales/en.json", JSON.stringify(Locales.en, null, 2));
        zip.file("locales/ml.json", JSON.stringify(Locales.ml, null, 2));

        // 5. CSS files
        zip.file("css/variables.css", `:root { --vedic-ochre: #B85D19; --vedic-sandal: #D4A373; --vedic-granite: #161311; }`);
        zip.file("css/style.css", `body { font-family: 'Manrope', sans-serif; }`);

        // 6. Data files
        zip.file("js/data/devata.json", JSON.stringify(DevataMaster, null, 2));
        zip.file("js/data/suktas.json", JSON.stringify(SuktasMaster, null, 2));
        zip.file("js/data/karma.json", JSON.stringify(KarmaMaster, null, 2));

        // 7. Core single-page root file
        zip.file("index.html", document.documentElement.outerHTML);

        // Generate and trigger download
        const blob = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "VAIDIKA-MITHRA-V1.zip";
        link.click();
      }
    };

    // ---------------------------------------------------------
    // 9. PAGE RENDERERS
    // ---------------------------------------------------------
