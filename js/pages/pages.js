    const Pages = {
      // ----------------- TODAY (HOME) -----------------
      renderToday() {
        const todayPanchanga = PanchangaEngine.calculate(new Date());
        const events = Storage.get(Storage.KEYS.EVENTS, []);
        const favs = Storage.get(Storage.KEYS.FAVOURITES, []);

        return `
          <div class="space-y-6">
            <!-- Hero Date Banner -->
            <div class="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-vedic-cardLight to-vedic-parchment dark:from-vedic-cardDark dark:to-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark shadow-sm relative overflow-hidden">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div>
                  <span class="text-xs font-semibold uppercase tracking-wider text-vedic-ochre">${todayPanchanga.vara[App.lang] || todayPanchanga.vara.en}</span>
                  <h1 class="text-2xl md:text-3xl font-heading font-bold text-vedic-charcoal dark:text-white mt-1">${todayPanchanga.dateStr}</h1>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${todayPanchanga.ayana[App.lang]} • ${todayPanchanga.ritu[App.lang]} • ${todayPanchanga.location}</p>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="px-3 py-2 rounded-xl bg-white/70 dark:bg-black/40 border border-vedic-borderLight dark:border-vedic-borderDark text-center">
                    <span class="text-[10px] uppercase font-bold text-gray-400 block">Sunrise</span>
                    <span class="text-xs font-semibold text-vedic-ochre">${todayPanchanga.sunrise}</span>
                  </div>
                  <div class="px-3 py-2 rounded-xl bg-white/70 dark:bg-black/40 border border-vedic-borderLight dark:border-vedic-borderDark text-center">
                    <span class="text-[10px] uppercase font-bold text-gray-400 block">Sunset</span>
                    <span class="text-xs font-semibold text-vedic-ochre">${todayPanchanga.sunset}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Panchanga Snapshot Cards -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <h2 class="font-heading font-bold text-sm tracking-wide text-vedic-charcoal dark:text-vedic-sand uppercase" data-i18n="today.panchanga_header">Daily Panchāṅga Snapshot</h2>
                <button onclick="App.navigate('panchanga')" class="text-xs text-vedic-ochre hover:underline flex items-center">Full Details <i data-lucide="arrow-right" class="w-3 h-3 ml-1"></i></button>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="p-3.5 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">Tithi</span>
                  <p class="text-sm font-bold text-vedic-charcoal dark:text-white mt-1">${todayPanchanga.tithi[App.lang] || todayPanchanga.tithi.en}</p>
                </div>
                <div class="p-3.5 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">Nakṣatra</span>
                  <p class="text-sm font-bold text-vedic-charcoal dark:text-white mt-1">${todayPanchanga.nakshatra[App.lang] || todayPanchanga.nakshatra.en}</p>
                </div>
                <div class="p-3.5 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">Karaṇa</span>
                  <p class="text-sm font-bold text-vedic-charcoal dark:text-white mt-1">${todayPanchanga.karana[App.lang] || todayPanchanga.karana.en}</p>
                </div>
                <div class="p-3.5 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">Yoga</span>
                  <p class="text-sm font-bold text-vedic-charcoal dark:text-white mt-1">${todayPanchanga.yoga[App.lang] || todayPanchanga.yoga.en}</p>
                </div>
              </div>
            </div>

            <!-- Today's Ritual Workspace / Events -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <h2 class="font-heading font-bold text-sm tracking-wide text-vedic-charcoal dark:text-vedic-sand uppercase" data-i18n="today.events_header">Today's Ritual Obligations</h2>
                <button onclick="App.navigate('events')" class="text-xs text-vedic-ochre hover:underline flex items-center">All Events <i data-lucide="arrow-right" class="w-3 h-3 ml-1"></i></button>
              </div>

              ${events.length === 0 ? `
                <div class="p-6 text-center rounded-xl border border-dashed border-vedic-borderLight dark:border-vedic-borderDark text-xs text-gray-500" data-i18n="today.empty_events">
                  No scheduled ritual events for today.
                </div>
              ` : `
                <div class="space-y-3">
                  ${events.map(ev => `
                    <div onclick="App.navigate('events', '${ev.id}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div class="flex items-start space-x-3">
                        <div class="w-10 h-10 rounded-lg bg-vedic-ochre/15 text-vedic-ochre flex items-center justify-center shrink-0">
                          <i data-lucide="flame" class="w-5 h-5"></i>
                        </div>
                        <div>
                          <div class="flex items-center space-x-2">
                            <span class="font-bold text-sm text-vedic-charcoal dark:text-white">${ev.title}</span>
                            ${ev.completed ? `<span class="px-2 py-0.5 rounded text-[10px] bg-vedic-moss/20 text-vedic-moss font-semibold">Completed</span>` : ''}
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5"><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i>${ev.location || 'Ashram'} • ${ev.time}</p>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="text-xs text-vedic-ochre font-medium flex items-center">Open Workspace <i data-lucide="chevron-right" class="w-4 h-4 ml-1"></i></span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Quick Access / Bookmarks -->
            <div>
              <h2 class="font-heading font-bold text-sm tracking-wide text-vedic-charcoal dark:text-vedic-sand uppercase mb-3" data-i18n="today.quick_access">Quick Access</h2>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div onclick="App.navigate('sukta', 'sri-sukta')" class="p-3.5 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition text-left">
                  <i data-lucide="book-open" class="w-5 h-5 text-vedic-ochre mb-2"></i>
                  <div class="font-bold text-xs">${App.lang === 'ml' ? 'ശ്രീ സൂക്തം' : 'Śrī Sūktam'}</div>
                  <span class="text-[10px] text-gray-500">Rigvedic Chanting</span>
                </div>
                <div onclick="App.navigate('devata', 'vishnu')" class="p-3.5 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition text-left">
                  <i data-lucide="sun" class="w-5 h-5 text-amber-500 mb-2"></i>
                  <div class="font-bold text-xs">${App.lang === 'ml' ? 'മഹാവിഷ്ണു' : 'Mahā Viṣṇu'}</div>
                  <span class="text-[10px] text-gray-500">Mūla, Nyāsa, Dhyāna</span>
                </div>
                <div onclick="App.navigate('tools')" class="p-3.5 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition text-left">
                  <i data-lucide="disc" class="w-5 h-5 text-vedic-moss mb-2"></i>
                  <div class="font-bold text-xs">Japa Counter</div>
                  <span class="text-[10px] text-gray-500">Mālā tracker & timer</span>
                </div>
                <div onclick="App.navigate('karma')" class="p-3.5 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition text-left">
                  <i data-lucide="flame" class="w-5 h-5 text-vedic-vermilion mb-2"></i>
                  <div class="font-bold text-xs">${App.lang === 'ml' ? 'സന്ധ്യാവന്ദനം' : 'Sandhyāvandanam'}</div>
                  <span class="text-[10px] text-gray-500">Nitya Karma guide</span>
                </div>
              </div>
            </div>
          </div>
        `;
      },

      // ----------------- DEVATA VIEWS -----------------
      renderDevataList() {
        return `
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="devata.title">Devatā Knowledge Graph</h1>
                <p class="text-xs text-gray-500 dark:text-gray-400" data-i18n="devata.subtitle">Canonical Devata invocations, nyāsa, and connected Vedic relations</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${DevataMaster.map(d => `
                <div onclick="App.navigate('devata', '${d.id}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition flex space-x-4">
                  <img src="${d.image}" alt="${d.name.en}" class="w-20 h-20 rounded-lg object-cover border border-vedic-borderLight dark:border-vedic-borderDark shrink-0">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <h3 class="font-bold text-base text-vedic-charcoal dark:text-white truncate">${d.name[App.lang] || d.name.en}</h3>
                      <button onclick="App.toggleFavourite('devata', '${d.id}', event)" class="text-gray-400 hover:text-vedic-ochre p-1">
                        <i data-lucide="bookmark" class="w-4 h-4 ${App.isFavourite('devata', d.id) ? 'fill-vedic-ochre text-vedic-ochre' : ''}"></i>
                      </button>
                    </div>
                    <p class="text-xs text-gray-500 truncate">${d.title[App.lang] || d.title.en}</p>
                    <div class="mt-2 text-[11px] font-mono text-vedic-ochre truncate">${d.mantras.moola}</div>
                    <div class="mt-2 flex items-center space-x-2 text-[10px] text-gray-400">
                      <span>${d.related.suktas.length} Suktas</span>
                      <span>•</span>
                      <span>${d.related.karma.length} Karmas</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      },

      renderDevataDetail(id) {
        const d = DevataMaster.find(x => x.id === id);
        if (!d) return Pages.renderDevataList();

        const relatedSuktas = SuktasMaster.filter(s => d.related.suktas.includes(s.id));
        const relatedKarmas = KarmaMaster.filter(k => d.related.karma.includes(k.id));

        return `
          <div class="space-y-6">
            <!-- Top Breadcrumb & Actions -->
            <div class="flex items-center justify-between">
              <button onclick="App.navigate('devata')" class="text-xs font-semibold text-vedic-ochre flex items-center">
                <i data-lucide="arrow-left" class="w-4 h-4 mr-1"></i> Back to Devatas
              </button>
              <button onclick="App.toggleFavourite('devata', '${d.id}', event)" class="flex items-center space-x-1 px-3 py-1 rounded-lg border border-vedic-borderLight dark:border-vedic-borderDark text-xs font-medium hover:border-vedic-ochre">
                <i data-lucide="bookmark" class="w-4 h-4 ${App.isFavourite('devata', d.id) ? 'fill-vedic-ochre text-vedic-ochre' : ''}"></i>
                <span>${App.isFavourite('devata', d.id) ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
            </div>

            <!-- Profile Header -->
            <div class="p-6 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
              <img src="${d.image}" alt="${d.name.en}" class="w-32 h-32 rounded-xl object-cover border border-vedic-borderLight dark:border-vedic-borderDark shadow">
              <div class="flex-1 text-center md:text-left">
                <span class="text-xs font-semibold uppercase tracking-wider text-vedic-ochre">Devatā Record</span>
                <h1 class="text-2xl md:text-3xl font-heading font-bold text-vedic-charcoal dark:text-white mt-1">${d.name[App.lang] || d.name.en}</h1>
                <p class="text-xs text-gray-500 mt-1">${d.title[App.lang] || d.title.en} • Provenance: <span class="italic text-gray-400">${d.source.tradition}</span></p>

                <div class="mt-4 p-3 rounded-xl bg-vedic-parchment/60 dark:bg-vedic-charcoal/60 border border-vedic-borderLight dark:border-vedic-borderDark text-xs font-mono text-vedic-ochreDark dark:text-vedic-sandal">
                  <span class="block text-[10px] text-gray-400 uppercase font-sans font-semibold mb-0.5">Mūla Mantra</span>
                  ${d.mantras.moola}
                </div>
              </div>
            </div>

            <!-- Structured Invocations Tab Content -->
            <div class="space-y-4">
              <h2 class="font-heading font-bold text-sm tracking-wider uppercase text-vedic-charcoal dark:text-vedic-sand">Canonical Mantra Ecosystem</h2>

              <!-- Dhyanam -->
              <div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                <h3 class="text-xs font-bold uppercase tracking-wider text-vedic-ochre mb-2">Dhyānam (ധ്യാനം)</h3>
                <p class="text-sm font-serif leading-relaxed text-gray-800 dark:text-gray-200">${d.mantras.dhyanam}</p>
              </div>

              <!-- Avahana & Anganyasa -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-vedic-ochre mb-2">Āvāhana Mantra</h3>
                  <p class="text-xs font-serif leading-relaxed text-gray-800 dark:text-gray-200">${d.mantras.avahana}</p>
                </div>
                <div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-vedic-ochre mb-2">Aṅganyāsa Scheme</h3>
                  <p class="text-xs font-serif leading-relaxed text-gray-800 dark:text-gray-200">${d.mantras.anganyasa}</p>
                </div>
              </div>

              <!-- Dvadasha Mantras -->
              <div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                <h3 class="text-xs font-bold uppercase tracking-wider text-vedic-ochre mb-3">Dvādaśa Mantras (ദ്വാദശ നാമങ്ങൾ)</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  ${d.mantras.dvadasha.map(m => `
                    <div class="p-2 rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal text-[11px] font-medium text-center border border-vedic-borderLight dark:border-vedic-borderDark">
                      ${m}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Nivedyam & Astra -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-vedic-ochre mb-2">Nivedyam Upacāra</h3>
                  <p class="text-xs leading-relaxed text-gray-700 dark:text-gray-300">${d.mantras.nivedyam}</p>
                </div>
                <div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-vedic-ochre mb-2">Astra Mantra</h3>
                  <p class="text-xs font-mono leading-relaxed text-gray-700 dark:text-gray-300">${d.mantras.astra}</p>
                </div>
              </div>
            </div>

            <!-- Connected Knowledge Graph (Stable IDs) -->
            <div class="p-5 rounded-2xl bg-vedic-parchment/40 dark:bg-vedic-charcoal/40 border border-vedic-borderLight dark:border-vedic-borderDark space-y-4">
              <h2 class="font-heading font-bold text-sm tracking-wider uppercase text-vedic-ochre">Connected Knowledge Graph</h2>
              
              <div>
                <span class="text-xs font-semibold block text-gray-500 mb-2">Related Vedic Hymns (Sūktas)</span>
                <div class="flex flex-wrap gap-2">
                  ${relatedSuktas.map(s => `
                    <button onclick="App.navigate('sukta', '${s.id}')" class="px-3 py-1.5 rounded-lg bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre text-xs font-semibold flex items-center space-x-1.5">
                      <i data-lucide="book-open" class="w-3.5 h-3.5 text-vedic-ochre"></i>
                      <span>${s.title[App.lang] || s.title.en}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div>
                <span class="text-xs font-semibold block text-gray-500 mb-2">Related Vaidika Karmas</span>
                <div class="flex flex-wrap gap-2">
                  ${relatedKarmas.map(k => `
                    <button onclick="App.navigate('karma')" class="px-3 py-1.5 rounded-lg bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre text-xs font-semibold flex items-center space-x-1.5">
                      <i data-lucide="flame" class="w-3.5 h-3.5 text-vedic-vermilion"></i>
                      <span>${k.name[App.lang] || k.name.en}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
      },

      // ----------------- SUKTA VIEWS -----------------
      renderSuktaList() {
        return `
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="sukta.title">Vedic Hymns & Suktas</h1>
                <p class="text-xs text-gray-500 dark:text-gray-400">Verified recitations with Malayalam script, English meanings, and attributed audio</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${SuktasMaster.map(s => `
                <div onclick="App.navigate('sukta', '${s.id}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-vedic-ochre px-2 py-0.5 rounded bg-vedic-ochre/15">${s.verses.length} Verses</span>
                    <button onclick="App.toggleFavourite('sukta', '${s.id}', event)" class="text-gray-400 hover:text-vedic-ochre p-1">
                      <i data-lucide="bookmark" class="w-4 h-4 ${App.isFavourite('sukta', s.id) ? 'fill-vedic-ochre text-vedic-ochre' : ''}"></i>
                    </button>
                  </div>
                  <h3 class="font-bold text-base text-vedic-charcoal dark:text-white mt-2">${s.title[App.lang] || s.title.en}</h3>
                  <p class="text-xs text-gray-500 mt-0.5">${s.vibe}</p>
                  
                  <div class="mt-4 pt-3 border-t border-vedic-borderLight dark:border-vedic-borderDark flex items-center justify-between text-xs font-semibold text-vedic-ochre">
                    <span class="flex items-center"><i data-lucide="play-circle" class="w-4 h-4 mr-1"></i> Open Study & Chanting</span>
                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      },

      renderSuktaDetail(id) {
        const s = SuktasMaster.find(x => x.id === id);
        if (!s) return Pages.renderSuktaList();

        const devata = DevataMaster.find(d => d.id === s.devataId);

        return `
          <div class="space-y-6">
            <!-- Breadcrumb & Top Actions -->
            <div class="flex items-center justify-between">
              <button onclick="App.navigate('sukta')" class="text-xs font-semibold text-vedic-ochre flex items-center">
                <i data-lucide="arrow-left" class="w-4 h-4 mr-1"></i> Back to Suktas
              </button>
              <div class="flex items-center space-x-2">
                <button onclick="AudioEngine.loadAndPlay('${s.id}')" class="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-vedic-ochre text-white text-xs font-semibold shadow">
                  <i data-lucide="play" class="w-3.5 h-3.5"></i>
                  <span>Play Vedic Audio</span>
                </button>
                <button onclick="App.toggleFavourite('sukta', '${s.id}', event)" class="p-1.5 rounded-lg border border-vedic-borderLight dark:border-vedic-borderDark text-xs hover:border-vedic-ochre">
                  <i data-lucide="bookmark" class="w-4 h-4 ${App.isFavourite('sukta', s.id) ? 'fill-vedic-ochre text-vedic-ochre' : ''}"></i>
                </button>
              </div>
            </div>

            <!-- Sukta Header -->
            <div class="p-6 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark shadow-sm">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span class="text-xs font-semibold uppercase tracking-wider text-vedic-ochre">Vedic Sūkta</span>
                  <h1 class="text-2xl md:text-3xl font-heading font-bold text-vedic-charcoal dark:text-white mt-1">${s.title[App.lang] || s.title.en}</h1>
                  <p class="text-xs text-gray-500 mt-1">${s.vibe} • Associated Devatā: <button onclick="App.navigate('devata', '${devata.id}')" class="text-vedic-ochre hover:underline font-semibold">${devata.name[App.lang] || devata.name.en}</button></p>
                </div>

                <!-- Provenance & Audio Citation Box -->
                <div class="p-3 rounded-xl bg-vedic-parchment/60 dark:bg-vedic-charcoal/60 border border-vedic-borderLight dark:border-vedic-borderDark text-[11px] text-gray-600 dark:text-gray-300 max-w-sm">
                  <div class="font-bold text-vedic-ochre mb-0.5 flex items-center"><i data-lucide="shield-check" class="w-3.5 h-3.5 mr-1"></i> Audio Provenance</div>
                  <div>Source: ${s.audio.creator}</div>
                  <div class="text-gray-400 text-[10px] mt-0.5">${s.audio.license}</div>
                </div>
              </div>
            </div>

            <!-- Green / Red Semantic Callouts -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Tradition / Use (Green Info Block) -->
              <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-800 dark:text-emerald-300">
                <div class="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-1.5">
                  <i data-lucide="check-circle" class="w-4 h-4"></i>
                  <span data-i18n="sukta.tradition">Tradition / Ritual Use</span>
                </div>
                <p class="text-xs leading-relaxed">${s.tradition[App.lang] || s.tradition.en}</p>
              </div>

              <!-- Caution / Vidhi (Amber Info Block) -->
              <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-800 dark:text-amber-300">
                <div class="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-1.5">
                  <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                  <span data-i18n="sukta.caution">Vidhi / Usage Caution</span>
                </div>
                <p class="text-xs leading-relaxed">${s.caution[App.lang] || s.caution.en}</p>
              </div>
            </div>

            <!-- Verses List with Malayalam & English meaning -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="font-heading font-bold text-sm tracking-wider uppercase text-vedic-charcoal dark:text-vedic-sand">Verses & Meanings</h2>
                <span class="text-xs text-gray-500 font-mono">${s.verses.length} Rcas</span>
              </div>

              ${s.verses.map(v => `
                <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark shadow-sm space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="w-6 h-6 rounded-full bg-vedic-ochre/15 text-vedic-ochre flex items-center justify-center font-bold text-xs">${v.num}</span>
                    <button onclick="AudioEngine.loadAndPlay('${s.id}')" class="p-1.5 rounded-lg text-gray-400 hover:text-vedic-ochre hover:bg-black/5 dark:hover:bg-white/5" title="Play Verse">
                      <i data-lucide="volume-2" class="w-4 h-4"></i>
                    </button>
                  </div>

                  <!-- Malayalam Script Rendering -->
                  <div class="text-base md:text-lg font-ml text-gray-900 dark:text-amber-100/90 font-medium tracking-wide">
                    ${v.malayalam}
                  </div>

                  <!-- Sanskrit Devanagari -->
                  <div class="text-sm font-serif text-gray-600 dark:text-gray-400">
                    ${v.sanskrit}
                  </div>

                  <!-- Meaning -->
                  <div class="pt-3 border-t border-vedic-borderLight dark:border-vedic-borderDark text-xs leading-relaxed">
                    <span class="font-bold text-vedic-ochre block text-[10px] uppercase mb-1">Artham (അർത്ഥം)</span>
                    <p class="text-gray-700 dark:text-gray-300 font-ml">${v.meaning[App.lang] || v.meaning.en}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      },

      // ----------------- EVENTS (RITUAL WORKSPACE) -----------------
      renderEventsList() {
        const events = Storage.get(Storage.KEYS.EVENTS, []);

        // Group events by Month
        const grouped = {};
        events.forEach(ev => {
          const d = new Date(ev.date);
          const monthYear = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          if (!grouped[monthYear]) grouped[monthYear] = [];
          grouped[monthYear].push(ev);
        });

        return `
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="events.title">Ritual Events & History</h1>
                <p class="text-xs text-gray-500 dark:text-gray-400" data-i18n="events.subtitle">Purohita ritual log, connected mantras, and memories</p>
              </div>
              <button onclick="App.initNewItem('event')" class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-vedic-ochre hover:bg-vedic-ochreDark text-white text-xs font-semibold shadow">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Add Ritual</span>
              </button>
            </div>

            ${Object.keys(grouped).length === 0 ? `
              <div class="p-8 text-center rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                <p class="text-xs text-gray-500">No events logged yet. Tap "Add Ritual" to record upcoming Homas or Pūjās.</p>
              </div>
            ` : `
              <div class="space-y-6">
                ${Object.keys(grouped).map(month => `
                  <div class="space-y-3">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-vedic-ochre flex items-center">
                      <i data-lucide="calendar-range" class="w-3.5 h-3.5 mr-1.5"></i> ${month}
                    </h3>

                    <div class="space-y-2">
                      ${grouped[month].map(ev => `
                        <div onclick="App.navigate('events', '${ev.id}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition flex items-center justify-between">
                          <div class="flex items-start space-x-3">
                            <div class="text-center w-10 py-1 rounded bg-vedic-parchment/60 dark:bg-vedic-charcoal shrink-0 border border-vedic-borderLight dark:border-vedic-borderDark">
                              <span class="block text-[10px] uppercase font-bold text-gray-400">${new Date(ev.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                              <span class="text-sm font-bold text-vedic-ochre">${new Date(ev.date).getDate()}</span>
                            </div>
                            <div>
                              <div class="font-bold text-sm text-vedic-charcoal dark:text-white flex items-center space-x-2">
                                <span>${ev.title}</span>
                                ${ev.completed ? `<span class="text-[9px] px-1.5 py-0.5 rounded bg-vedic-moss/20 text-vedic-moss font-semibold">Done</span>` : ''}
                              </div>
                              <p class="text-xs text-gray-500">${ev.time} • ${ev.location}</p>
                            </div>
                          </div>

                          <div class="text-right">
                            <span class="text-xs font-semibold text-vedic-ochre flex items-center">Workspace <i data-lucide="chevron-right" class="w-4 h-4 ml-1"></i></span>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;
      },

      renderEventWorkspace(id) {
        const events = Storage.get(Storage.KEYS.EVENTS, []);
        const ev = events.find(x => x.id === id);
        if (!ev) return Pages.renderEventsList();

        const p = ev.panchangaSnapshot || PanchangaEngine.calculate(new Date(ev.date));
        const devata = DevataMaster.find(d => d.id === ev.relatedDevata) || DevataMaster[0];
        const sukta = SuktasMaster.find(s => s.id === ev.relatedSukta) || SuktasMaster[0];

        return `
          <div class="space-y-6">
            <!-- Breadcrumb -->
            <div class="flex items-center justify-between">
              <button onclick="App.navigate('events')" class="text-xs font-semibold text-vedic-ochre flex items-center">
                <i data-lucide="arrow-left" class="w-4 h-4 mr-1"></i> Back to All Events
              </button>
              <div class="flex items-center space-x-2">
                <button onclick="Pages.toggleEventComplete('${ev.id}')" class="px-3 py-1.5 rounded-lg ${ev.completed ? 'bg-vedic-moss text-white' : 'border border-vedic-borderLight dark:border-vedic-borderDark text-xs hover:border-vedic-ochre'} text-xs font-semibold transition">
                  ${ev.completed ? '✓ Completed' : 'Mark as Complete'}
                </button>
              </div>
            </div>

            <!-- Workspace Banner -->
            <div class="p-6 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark shadow-sm space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-vedic-ochre">Ritual Workspace</span>
              <h1 class="text-2xl md:text-3xl font-heading font-bold text-vedic-charcoal dark:text-white">${ev.title}</h1>
              <p class="text-xs text-gray-500">${ev.date} at ${ev.time} • <i data-lucide="map-pin" class="w-3.5 h-3.5 inline mr-1 text-vedic-ochre"></i>${ev.location}</p>
            </div>

            <!-- Panchanga Snapshot for Event Day -->
            <div class="p-5 rounded-2xl bg-vedic-parchment/40 dark:bg-vedic-charcoal/40 border border-vedic-borderLight dark:border-vedic-borderDark space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold uppercase tracking-wider text-vedic-ochre flex items-center">
                  <i data-lucide="moon" class="w-4 h-4 mr-1"></i> Event Panchāṅga Snapshot
                </h3>
                <span class="text-[10px] text-gray-400">Captured at Creation</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div class="p-3 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <span class="text-[10px] text-gray-400 uppercase font-semibold block">Tithi</span>
                  <span class="font-bold">${p.tithi[App.lang] || p.tithi.en}</span>
                </div>
                <div class="p-3 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <span class="text-[10px] text-gray-400 uppercase font-semibold block">Nakṣatra</span>
                  <span class="font-bold">${p.nakshatra[App.lang] || p.nakshatra.en}</span>
                </div>
                <div class="p-3 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <span class="text-[10px] text-gray-400 uppercase font-semibold block">Vāra</span>
                  <span class="font-bold">${p.vara[App.lang] || p.vara.en}</span>
                </div>
                <div class="p-3 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
                  <span class="text-[10px] text-gray-400 uppercase font-semibold block">Sūryodaya</span>
                  <span class="font-bold">${p.sunrise}</span>
                </div>
              </div>
            </div>

            <!-- Connected Ritual Assets (The Killer UX) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Linked Devata -->
              <div onclick="App.navigate('devata', '${devata.id}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition">
                <span class="text-[10px] font-bold uppercase tracking-wider text-vedic-ochre block mb-1">Presiding Devatā</span>
                <div class="flex items-center space-x-3">
                  <img src="${devata.image}" class="w-12 h-12 rounded-lg object-cover">
                  <div>
                    <h4 class="font-bold text-sm">${devata.name[App.lang] || devata.name.en}</h4>
                    <p class="text-[11px] font-mono text-vedic-ochre truncate">${devata.mantras.moola}</p>
                  </div>
                </div>
              </div>

              <!-- Linked Sukta -->
              <div onclick="App.navigate('sukta', '${sukta.id}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition">
                <span class="text-[10px] font-bold uppercase tracking-wider text-vedic-ochre block mb-1">Prescribed Vedic Sūkta</span>
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-bold text-sm">${sukta.title[App.lang] || sukta.title.en}</h4>
                    <p class="text-xs text-gray-500">${sukta.vibe}</p>
                  </div>
                  <button onclick="AudioEngine.loadAndPlay('${sukta.id}'); event.stopPropagation();" class="p-2 rounded-lg bg-vedic-ochre text-white">
                    <i data-lucide="play" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Multiple Ritual Notes -->
            <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="font-heading font-bold text-sm tracking-wider uppercase text-vedic-charcoal dark:text-white">Purohita Notes & Checklists</h3>
              </div>

              <div class="space-y-2" id="event-notes-list">
                ${ev.notes.length === 0 ? `<p class="text-xs text-gray-500 italic">No notes recorded yet.</p>` : ''}
                ${ev.notes.map((note, nIdx) => `
                  <div class="p-3 rounded-xl bg-vedic-parchment/40 dark:bg-vedic-charcoal text-xs flex items-start justify-between gap-2 border border-vedic-borderLight dark:border-vedic-borderDark">
                    <div class="flex items-start space-x-2">
                      <span class="w-4 h-4 rounded bg-vedic-ochre/20 text-vedic-ochre text-[10px] flex items-center justify-center font-bold mt-0.5">${nIdx + 1}</span>
                      <p class="leading-relaxed">${note}</p>
                    </div>
                    <button onclick="Pages.deleteEventNote('${ev.id}', ${nIdx})" class="text-gray-400 hover:text-red-500 p-1">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                `).join('')}
              </div>

              <form onsubmit="Pages.addEventNote('${ev.id}', event)" class="flex gap-2 pt-2">
                <input type="text" name="newNote" placeholder="Add preparation note (e.g. Bring 5 coconuts, ghee, darbhapulla)..." required class="flex-1 px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark focus:outline-none focus:border-vedic-ochre">
                <button type="submit" class="px-3 py-2 rounded-lg bg-vedic-ochre text-white text-xs font-semibold">Add</button>
              </form>
            </div>

            <!-- Ritual Memory / Upload Attachment (Local Prototype Support) -->
            <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark space-y-3">
              <h3 class="font-heading font-bold text-sm tracking-wider uppercase text-vedic-charcoal dark:text-white flex items-center">
                <i data-lucide="image" class="w-4 h-4 mr-1.5 text-vedic-ochre"></i> Ritual Diary & Memories
              </h3>
              <p class="text-xs text-gray-500">Store photographs of the mandala, receipt lists, or sankalpa documents in browser memory.</p>
              
              <div class="border-2 border-dashed border-vedic-borderLight dark:border-vedic-borderDark rounded-xl p-6 text-center">
                <input type="file" id="event-file-upload" class="hidden" onchange="Pages.handleEventFileUpload(this)">
                <button onclick="document.getElementById('event-file-upload').click()" class="px-4 py-2 rounded-lg bg-vedic-parchment dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark text-xs font-semibold hover:border-vedic-ochre">
                  <i data-lucide="upload-cloud" class="w-4 h-4 inline mr-1"></i> Attach Memory File / Image
                </button>
                <div id="upload-status" class="text-[11px] text-gray-400 mt-2">Saved locally in browser offline storage.</div>
              </div>
            </div>
          </div>
        `;
      },

      toggleEventComplete(id) {
        const events = Storage.get(Storage.KEYS.EVENTS, []);
        const ev = events.find(x => x.id === id);
        if (ev) {
          ev.completed = !ev.completed;
          Storage.set(Storage.KEYS.EVENTS, events);
          App.navigate('events', id);
        }
      },

      addEventNote(id, event) {
        event.preventDefault();
        const text = event.target.newNote.value.trim();
        if (!text) return;
        const events = Storage.get(Storage.KEYS.EVENTS, []);
        const ev = events.find(x => x.id === id);
        if (ev) {
          ev.notes.push(text);
          Storage.set(Storage.KEYS.EVENTS, events);
          App.navigate('events', id);
        }
      },

      deleteEventNote(id, index) {
        const events = Storage.get(Storage.KEYS.EVENTS, []);
        const ev = events.find(x => x.id === id);
        if (ev) {
          ev.notes.splice(index, 1);
          Storage.set(Storage.KEYS.EVENTS, events);
          App.navigate('events', id);
        }
      },

      handleEventFileUpload(input) {
        if (input.files && input.files[0]) {
          document.getElementById('upload-status').innerText = `✓ Attached "${input.files[0].name}" locally for this ritual.`;
        }
      },

      // ----------------- PANCHANGA PAGE -----------------
      renderPanchanga() {
        const p = PanchangaEngine.calculate(new Date());

        return `
          <div class="space-y-6">
            <div>
              <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="nav.panchanga">Panchāṅga Reference</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Carnatic & South Indian Drik calculation scheme</p>
            </div>

            <!-- Disclaimer Notice -->
            <div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark text-xs text-gray-500 leading-relaxed" data-i18n="panchanga.disclaimer">
              ${Locales[App.lang]["panchanga.disclaimer"]}
            </div>

            <!-- Five Limbs Table -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark space-y-3">
                <h3 class="font-bold text-sm text-vedic-ochre uppercase tracking-wider">Five Limbs (Pañca-Aṅga)</h3>
                
                <div class="space-y-2 text-xs">
                  <div class="flex justify-between py-2 border-b border-vedic-borderLight dark:border-vedic-borderDark">
                    <span class="text-gray-400 font-medium">1. Vāra (Day)</span>
                    <span class="font-bold">${p.vara[App.lang]} (${p.vara.en})</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-vedic-borderLight dark:border-vedic-borderDark">
                    <span class="text-gray-400 font-medium">2. Tithi (Lunar Phase)</span>
                    <span class="font-bold">${p.tithi[App.lang]}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-vedic-borderLight dark:border-vedic-borderDark">
                    <span class="text-gray-400 font-medium">3. Nakṣatra (Mansion)</span>
                    <span class="font-bold">${p.nakshatra[App.lang]}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-vedic-borderLight dark:border-vedic-borderDark">
                    <span class="text-gray-400 font-medium">4. Yoga</span>
                    <span class="font-bold">${p.yoga[App.lang]}</span>
                  </div>
                  <div class="flex justify-between py-2">
                    <span class="text-gray-400 font-medium">5. Karaṇa</span>
                    <span class="font-bold">${p.karana[App.lang]}</span>
                  </div>
                </div>
              </div>

              <!-- Solar Timings -->
              <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark space-y-3">
                <h3 class="font-bold text-sm text-vedic-ochre uppercase tracking-wider">Solar & Regional Positions</h3>
                
                <div class="space-y-2 text-xs">
                  <div class="flex justify-between py-2 border-b border-vedic-borderLight dark:border-vedic-borderDark">
                    <span class="text-gray-400 font-medium">Sūryodaya (Sunrise)</span>
                    <span class="font-bold text-vedic-ochre">${p.sunrise}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-vedic-borderLight dark:border-vedic-borderDark">
                    <span class="text-gray-400 font-medium">Sūryāsta (Sunset)</span>
                    <span class="font-bold text-vedic-ochre">${p.sunset}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-vedic-borderLight dark:border-vedic-borderDark">
                    <span class="text-gray-400 font-medium">Ayana</span>
                    <span class="font-bold">${p.ayana[App.lang]}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-vedic-borderLight dark:border-vedic-borderDark">
                    <span class="text-gray-400 font-medium">Ṛtu (Season)</span>
                    <span class="font-bold">${p.ritu[App.lang]}</span>
                  </div>
                  <div class="flex justify-between py-2">
                    <span class="text-gray-400 font-medium">Sankalpa Coordinates</span>
                    <span class="font-mono text-[11px]">${p.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      },

      // ----------------- KARMA PAGE -----------------
      renderKarma() {
        return `
          <div class="space-y-4">
            <div>
              <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="nav.karma">Vaidika Karma Paddhati</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Structured reference for Nitya, Naimittika, and Gṛhya rituals</p>
            </div>

            <div class="space-y-4">
              ${KarmaMaster.map(k => `
                <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark shadow-sm space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-vedic-ochre px-2 py-0.5 rounded bg-vedic-ochre/15">${k.category}</span>
                  </div>
                  <h3 class="text-lg font-heading font-bold text-vedic-charcoal dark:text-white">${k.name[App.lang] || k.name.en}</h3>
                  <p class="text-xs leading-relaxed text-gray-700 dark:text-gray-300">${k.description[App.lang] || k.description.en}</p>

                  <div class="pt-3 border-t border-vedic-borderLight dark:border-vedic-borderDark flex flex-wrap gap-2 text-xs">
                    <span class="text-[11px] text-gray-400 self-center mr-1">Connected:</span>
                    ${k.related.devatas.map(dId => {
                      const d = DevataMaster.find(x => x.id === dId);
                      return `<button onclick="App.navigate('devata', '${d.id}')" class="px-2.5 py-1 rounded bg-vedic-parchment/60 dark:bg-vedic-charcoal hover:border-vedic-ochre border border-transparent font-medium">${d.name[App.lang] || d.name.en}</button>`;
                    }).join('')}
                    ${k.related.suktas.map(sId => {
                      const s = SuktasMaster.find(x => x.id === sId);
                      return `<button onclick="App.navigate('sukta', '${s.id}')" class="px-2.5 py-1 rounded bg-vedic-parchment/60 dark:bg-vedic-charcoal hover:border-vedic-ochre border border-transparent font-medium">${s.title[App.lang] || s.title.en}</button>`;
                    }).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      },

      // ----------------- TEXTS PAGE -----------------
      renderTexts() {
        return `
          <div class="space-y-4">
            <div>
              <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="nav.texts">Vaidika Text Library</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Canonical texts, Saṃhitā chapters, and recensions</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${TextsMaster.map(t => `
                <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark shadow-sm space-y-2">
                  <span class="text-[10px] uppercase font-bold tracking-wider text-vedic-ochre px-2 py-0.5 rounded bg-vedic-ochre/15">${t.tradition}</span>
                  <h3 class="font-bold text-base text-vedic-charcoal dark:text-white">${t.title[App.lang] || t.title.en}</h3>
                  <p class="text-xs text-gray-500">${t.vibe} • ${t.sections}</p>
                  
                  <div class="pt-3 border-t border-vedic-borderLight dark:border-vedic-borderDark flex items-center justify-between text-xs text-vedic-ochre font-semibold">
                    <button onclick="App.navigate('sukta', '${t.related.suktas[0]}')" class="hover:underline flex items-center">
                      <span>Open Associated Sūkta</span>
                      <i data-lucide="chevron-right" class="w-4 h-4 ml-1"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      },

      // ----------------- TOOLS (JAPA COUNTER & TIMER) -----------------
      renderTools() {
        const counters = Storage.get(Storage.KEYS.COUNTERS, []);

        return `
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="tools.counter_title">Vaidika Japa Counter & Timer</h1>
                <p class="text-xs text-gray-500 dark:text-gray-400">Touch counting, mālā completions (108), and sādhanā logs</p>
              </div>
              <button onclick="App.initNewItem('counter')" class="px-3 py-1.5 rounded-lg bg-vedic-ochre text-white text-xs font-semibold flex items-center space-x-1">
                <i data-lucide="plus" class="w-4 h-4"></i> <span>New Counter</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${counters.map(c => `
                <div class="p-6 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark shadow-sm flex flex-col justify-between items-center text-center space-y-4">
                  <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-vedic-ochre">Japa Sādhanā</span>
                    <h3 class="font-bold text-base text-vedic-charcoal dark:text-white mt-1">${c.title}</h3>
                    <p class="text-xs text-gray-500">Target: ${c.target} • Completed Mālās: ${Math.floor(c.value / 108)}</p>
                  </div>

                  <!-- Large Count Button with Haptic Feel -->
                  <div onclick="Pages.incrementCounter('${c.id}')" class="w-36 h-36 rounded-full bg-vedic-parchment dark:bg-vedic-charcoal border-4 border-vedic-ochre/40 hover:border-vedic-ochre flex flex-col items-center justify-center cursor-pointer select-none active:scale-95 transition shadow-lg">
                    <span class="text-3xl font-bold font-mono text-vedic-ochre">${c.value}</span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 mt-1">Tap Japa</span>
                  </div>

                  <div class="flex items-center space-x-3 text-xs w-full justify-center">
                    <button onclick="Pages.resetCounter('${c.id}')" class="px-3 py-1 rounded-lg border border-gray-500/40 text-gray-400 hover:text-white text-xs">Reset</button>
                    <button onclick="Pages.incrementCounter('${c.id}', 108)" class="px-3 py-1 rounded-lg bg-vedic-ochre/20 text-vedic-ochre font-semibold text-xs">+108 Mālā</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      },

      incrementCounter(id, delta = 1) {
        const counters = Storage.get(Storage.KEYS.COUNTERS, []);
        const c = counters.find(x => x.id === id);
        if (c) {
          c.value += delta;
          // Attempt vibration feedback if supported
          if (navigator.vibrate) navigator.vibrate(25);
          Storage.set(Storage.KEYS.COUNTERS, counters);
          App.navigate('tools');
        }
      },

      resetCounter(id) {
        if (!confirm("Reset counter progress?")) return;
        const counters = Storage.get(Storage.KEYS.COUNTERS, []);
        const c = counters.find(x => x.id === id);
        if (c) {
          c.value = 0;
          Storage.set(Storage.KEYS.COUNTERS, counters);
          App.navigate('tools');
        }
      },

      // ----------------- FAVOURITES PAGE -----------------
      renderFavourites() {
        const favs = Storage.get(Storage.KEYS.FAVOURITES, []);

        return `
          <div class="space-y-4">
            <div>
              <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="nav.favourites">Universal Favourites</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">All bookmarked Devatas, Suktas, Karmas, and Texts in one place</p>
            </div>

            ${favs.length === 0 ? `
              <div class="p-8 text-center rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark text-xs text-gray-500" data-i18n="empty.favourites">
                ${Locales[App.lang]["empty.favourites"]}
              </div>
            ` : `
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${favs.map(f => {
                  if (f.type === 'devata') {
                    const d = DevataMaster.find(x => x.id === f.id);
                    if (!d) return '';
                    return `
                      <div onclick="App.navigate('devata', '${d.id}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <img src="${d.image}" class="w-10 h-10 rounded-lg object-cover">
                          <div>
                            <span class="text-[9px] font-bold uppercase text-vedic-ochre">DEVATA</span>
                            <h4 class="font-bold text-sm">${d.name[App.lang] || d.name.en}</h4>
                          </div>
                        </div>
                        <button onclick="App.toggleFavourite('devata', '${d.id}', event)" class="p-2 text-vedic-ochre">
                          <i data-lucide="bookmark" class="w-4 h-4 fill-vedic-ochre"></i>
                        </button>
                      </div>
                    `;
                  } else if (f.type === 'sukta') {
                    const s = SuktasMaster.find(x => x.id === f.id);
                    if (!s) return '';
                    return `
                      <div onclick="App.navigate('sukta', '${s.id}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 rounded-lg bg-vedic-ochre/15 text-vedic-ochre flex items-center justify-center">
                            <i data-lucide="book-open" class="w-5 h-5"></i>
                          </div>
                          <div>
                            <span class="text-[9px] font-bold uppercase text-vedic-ochre">SUKTA</span>
                            <h4 class="font-bold text-sm">${s.title[App.lang] || s.title.en}</h4>
                          </div>
                        </div>
                        <button onclick="App.toggleFavourite('sukta', '${s.id}', event)" class="p-2 text-vedic-ochre">
                          <i data-lucide="bookmark" class="w-4 h-4 fill-vedic-ochre"></i>
                        </button>
                      </div>
                    `;
                  }
                  return '';
                }).join('')}
              </div>
            `}
          </div>
        `;
      },

      // ----------------- SETTINGS PAGE & ZIP EXPORTER -----------------
      renderSettings() {
        return `
          <div class="space-y-6">
            <div>
              <h1 class="text-xl md:text-2xl font-heading font-bold text-vedic-charcoal dark:text-white" data-i18n="nav.settings">Application Settings</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Language, preferences, and modular project deployment</p>
            </div>

            <!-- Language & Script -->
            <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark space-y-4">
              <h3 class="font-bold text-sm text-vedic-ochre uppercase tracking-wider">Language & Script</h3>
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-sm font-semibold block">Primary Interface Language</span>
                  <span class="text-xs text-gray-400">Switches UI strings and translations</span>
                </div>
                <div class="flex space-x-2">
                  <button onclick="App.lang = 'en'; Storage.set(Storage.KEYS.LANGUAGE, 'en'); App.updateLangDisplay(); App.navigate('settings');" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${App.lang === 'en' ? 'bg-vedic-ochre text-white' : 'border border-vedic-borderLight dark:border-vedic-borderDark'}">English</button>
                  <button onclick="App.lang = 'ml'; Storage.set(Storage.KEYS.LANGUAGE, 'ml'); App.updateLangDisplay(); App.navigate('settings');" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${App.lang === 'ml' ? 'bg-vedic-ochre text-white' : 'border border-vedic-borderLight dark:border-vedic-borderDark'}">മലയാളം</button>
                </div>
              </div>
            </div>

            <!-- Appearance -->
            <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark space-y-4">
              <h3 class="font-bold text-sm text-vedic-ochre uppercase tracking-wider">Appearance</h3>
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-sm font-semibold block">Theme</span>
                  <span class="text-xs text-gray-400">Dark granite mode is optimized for temple and early dawn ritual usage</span>
                </div>
                <button onclick="Pages.toggleDarkTheme()" class="px-3 py-1.5 rounded-lg border border-vedic-borderLight dark:border-vedic-borderDark text-xs font-semibold flex items-center space-x-1.5">
                  <i data-lucide="${App.theme === 'dark' ? 'sun' : 'moon'}" class="w-4 h-4"></i>
                  <span>${App.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>

            <!-- Modular Project ZIP Export (Mandated by user requirement) -->
            <div class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark space-y-3">
              <div class="flex items-center space-x-2 text-vedic-ochre">
                <i data-lucide="archive" class="w-5 h-5"></i>
                <h3 class="font-bold text-sm uppercase tracking-wider">Export Full Project ZIP</h3>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Generates a clean, modular repository ZIP archive containing the exact multi-file project structure: <code>index.html</code>, <code>manifest.json</code>, <code>sw.js</code>, <code>/js/data/</code>, <code>/css/</code>, <code>/locales/</code>, and <code>README.md</code>.
              </p>
              <button onclick="App.exportProjectZip()" class="px-4 py-2.5 rounded-xl bg-vedic-ochre hover:bg-vedic-ochreDark text-white text-xs font-bold flex items-center space-x-2 shadow transition">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Download VAIDIKA-MITHRA.zip</span>
              </button>
            </div>

            <!-- About / Provenance -->
            <div class="p-4 rounded-xl bg-vedic-parchment/40 dark:bg-vedic-charcoal/40 border border-vedic-borderLight dark:border-vedic-borderDark text-xs text-gray-500 space-y-1">
              <div class="font-bold text-gray-400 uppercase text-[10px]">Vaidika Mithra V2.0.0</div>
              <p>Designed for South Indian and Carnatic Vaidika practitioners. All audio files adhere strictly to their respective Creative Commons licenses on Wikimedia Commons.</p>
            </div>
          </div>
        `;
      },

      toggleDarkTheme() {
        App.theme = App.theme === 'dark' ? 'light' : 'dark';
        Storage.set(Storage.KEYS.THEME, App.theme);
        if (App.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        App.navigate('settings');
      }
    };


    // ---------------------------------------------------------
    // 9.5 V2 PRODUCT CORRECTIONS / USER-REQUESTED MODULES
    // ---------------------------------------------------------
    // Remove Rudram from the V2 Suktam catalog as requested.
    for (let i = SuktasMaster.length - 1; i >= 0; i--) { if (SuktasMaster[i].id === 'rudram') SuktasMaster.splice(i, 1); }

