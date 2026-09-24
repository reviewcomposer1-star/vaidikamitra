/* Vaidika Mithra navigation + content organization layer.
   Keeps existing pages intact while grouping the primary menu into:
   Today, Events, Time, Knowledge, Practice, Tools.
*/
(function () {
  const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  const card = (icon, title, subtitle, action) => `
    <button onclick="${action}" class="w-full text-left p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre transition shadow-sm">
      <div class="w-10 h-10 rounded-xl bg-vedic-ochre/10 dark:bg-vedic-ochre/15 text-vedic-ochre flex items-center justify-center mb-3"><i data-lucide="${icon}" class="w-5 h-5"></i></div>
      <div class="font-bold text-sm">${title}</div>
      <div class="text-xs text-gray-500 mt-1 leading-relaxed">${subtitle}</div>
    </button>`;

  Pages.renderTimeHub = function () {
    return `<div class="space-y-5">
      <div><h1 class="text-xl md:text-2xl font-heading font-bold">Time</h1><p class="text-xs text-gray-500 mt-1">Calendar, vrata and auspicious-time tools.</p></div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${card('calendar-days','Panchanga','Thekku / Vadakku Panchanga and daily details.',"App.navigate('panchanga')")}
        ${card('sunrise','Vrata','Upāsanā, Ekādaśī, Mupeṭṭu Velliyāzhcha and other vrata.',"App.navigate('vrata')")}
        ${card('sparkles','Muhurta','Select a ritual type and month for future date availability.',"App.navigate('vrata','muhurta')")}
      </div>
    </div>`;
  };

  Pages.renderKnowledgeHub = function () {
    return `<div class="space-y-5">
      <div><h1 class="text-xl md:text-2xl font-heading font-bold">Knowledge</h1><p class="text-xs text-gray-500 mt-1">Connected Vaidika reference material.</p></div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${card('sun','Devata','Deity records, mantras, dhyāna and connected knowledge.',"App.navigate('devata')")}
        ${card('book-open','Suktam','Study Suktas with verse, meaning and Vedic audio.',"App.navigate('sukta')")}
        ${card('scroll-text','Granthangal','Your Vaidika text and grantha reference library.',"App.navigate('texts')")}
      </div>
      <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-gray-600 dark:text-gray-300">Use the global + button beside Search to add a Devata or Text to your personal library.</div>
    </div>`;
  };

  Pages.renderPracticeHub = function () {
    return `<div class="space-y-5">
      <div><h1 class="text-xl md:text-2xl font-heading font-bold">Practice</h1><p class="text-xs text-gray-500 mt-1">Ritual practice references. Detailed Karma content will be added later.</p></div>
      ${card('flame','Karma','Saṁskāra and ritual reference skeleton. Detailed content coming later.',"App.navigate('karma')")}
    </div>`;
  };

  Pages.renderTools = function () {
    const cs = Storage.get(Storage.KEYS.COUNTERS, []);
    return `<div class="space-y-5">
      <div><h1 class="text-xl md:text-2xl font-heading font-bold">Tools</h1><p class="text-xs text-gray-500 mt-1">Practical utilities. More tools can be added here later.</p></div>
      <section class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark">
        <div class="flex items-start justify-between gap-4">
          <div><div class="flex items-center gap-2"><div class="w-9 h-9 rounded-lg bg-vedic-ochre/10 text-vedic-ochre flex items-center justify-center"><i data-lucide="hash" class="w-4 h-4"></i></div><h2 class="font-heading font-bold">Counter</h2></div><p class="text-xs text-gray-500 mt-2">Count or time your daily practice.</p></div>
          <button onclick="App.initNewItem('counter')" class="px-3 py-2 rounded-lg bg-vedic-ochre text-white text-xs font-semibold whitespace-nowrap">+ Add Counter</button>
        </div>
        ${cs.length ? `<div class="mt-4 space-y-2">${cs.map(c=>`<div class="p-3 rounded-xl border border-vedic-borderLight dark:border-vedic-borderDark flex items-center justify-between gap-3"><div><span class="font-semibold text-sm">${esc(c.title)}</span><div class="text-[10px] text-gray-500 mt-0.5">${c.mode==='timer'?'Timer':'Count'}</div></div><span class="text-sm font-bold text-vedic-ochre">${c.value||0}</span></div>`).join('')}</div>` : '<div class="mt-4 p-4 rounded-xl border border-dashed border-vedic-borderLight dark:border-vedic-borderDark text-xs text-gray-500">No counters yet. Add your first one.</div>'}
      </section>
      <section class="p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-dashed border-vedic-borderLight dark:border-vedic-borderDark"><div class="font-bold text-sm">More tools coming</div><p class="text-xs text-gray-500 mt-1">This section is intentionally expandable for future Vaidika practice utilities.</p></section>
    </div>`;
  };

  Pages.renderVrata = function (section = null) {
    if (section === 'muhurta') return Pages.renderMuhurta();
    if (['upasana','ekadashi','mupeṭṭu-velli','other'].includes(section)) {
      const labels = {upasana:'Upāsanā',ekadashi:'Ekādaśī','mupeṭṭu-velli':'Mupeṭṭu Velliyāzhcha',other:'Other Vrata'};
      return `<div class="space-y-5"><button onclick="App.navigate('vrata')" class="text-xs text-vedic-ochre flex items-center gap-1"><i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to Vrata</button><div><h1 class="text-xl md:text-2xl font-heading font-bold">${labels[section]}</h1><p class="text-xs text-gray-500 mt-1">Reference skeleton. Detailed rules and content will be added later.</p></div><div class="p-6 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-dashed border-vedic-borderLight dark:border-vedic-borderDark text-center"><div class="w-12 h-12 mx-auto rounded-xl bg-vedic-ochre/10 text-vedic-ochre flex items-center justify-center mb-3"><i data-lucide="sunrise" class="w-6 h-6"></i></div><div class="font-bold text-sm">${labels[section]} skeleton</div><div class="text-xs text-gray-500 mt-2">The module is intentionally kept simple until the correct tradition-specific content is supplied.</div></div></div>`;
    }
    const items = (typeof V2Vrata !== 'undefined' && Array.isArray(V2Vrata)) ? V2Vrata : [
      {id:'upasana',name:'Upāsanā',desc:'Daily and deity-focused practice skeleton.'},
      {id:'ekadashi',name:'Ekādaśī',desc:'Ekādaśī reference skeleton.'},
      {id:'mupeṭṭu-velli',name:'Mupeṭṭu Velliyāzhcha',desc:'Vrata reference skeleton.'},
      {id:'other',name:'Other Vrata',desc:'Additional vrata references can be added later.'},
      {id:'muhurta',name:'Muhurta',desc:'Auspicious-time selection architecture.'}
    ];
    return `<div class="space-y-5"><div><h1 class="text-xl md:text-2xl font-heading font-bold">Vrata</h1><p class="text-xs text-gray-500 mt-1">Vrata and Upāsanā modules. Detailed rules will be added later.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${items.map(v=>`<button onclick="App.navigate('vrata','${esc(v.id)}')" class="text-left p-5 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre transition"><div class="font-bold">${esc(v.name)}</div><div class="text-xs text-gray-500 mt-1">${esc(v.desc)}</div></button>`).join('')}</div></div>`;
  };

  Pages.renderMuhurta = function () {
    const types = ['Gṛha Praveśa','Vivāha','Brahmopadeśa','Seemandham','Other Common Muhurta'];
    return `<div class="space-y-5"><button onclick="App.navigate('time')" class="text-xs text-vedic-ochre flex items-center gap-1"><i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to Time</button><div><h1 class="text-xl md:text-2xl font-heading font-bold">Muhurta</h1><p class="text-xs text-gray-500 mt-1">Select a month to view available dates when the verified Muhurta engine is connected.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-3">${types.map(t=>`<div class="p-4 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark"><div class="font-bold">${t}</div><div class="text-xs text-gray-500 mt-2">Month</div><select onchange="this.nextElementSibling.textContent='Available dates will appear here for '+this.value" class="mt-1 w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark"><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select><div class="text-xs text-gray-500 mt-3">Verified available dates will appear here.</div></div>`).join('')}</div></div>`;
  };

  Pages.renderSuktaList = function () {
    const local = Storage.get('vm_local_suktas', []);
    const ids = ['sri-sukta','purusha-sukta','ganapati-suktam'];
    return `<div class="space-y-5"><div class="flex items-center justify-between gap-3"><div><h1 class="text-xl md:text-2xl font-heading font-bold">Suktam</h1><p class="text-xs text-gray-500 mt-1">Study verses, meanings and Vedic audio in one place.</p></div><label class="px-3 py-2 rounded-lg bg-vedic-ochre text-white text-xs font-semibold cursor-pointer whitespace-nowrap"><i data-lucide="folder-plus" class="w-4 h-4 inline"></i> Add from Local Library<input type="file" accept=".txt,.json,.pdf" class="hidden" onchange="App.importLocalSukta(event)"></label></div><div class="space-y-2">${SuktasMaster.filter(s=>ids.includes(s.id)).map(s=>`<div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark"><div class="flex items-center justify-between gap-3"><button onclick="App.navigate('sukta','${esc(s.id)}')" class="text-left min-w-0 flex-1"><div class="font-bold truncate">${esc(s.title[App.lang]||s.title.en)}</div><div class="text-xs text-gray-500 mt-1">${s.verses.length} verses • audio available</div></button><button onclick="AudioEngine.loadAndPlay('${esc(s.id)}')" class="shrink-0 px-3 py-2 rounded-lg bg-vedic-ochre text-white text-xs font-semibold flex items-center gap-1.5"><i data-lucide="play" class="w-3.5 h-3.5"></i> Play</button></div></div>`).join('')}${local.map(x=>`<div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark"><b>${esc(x.name)}</b><div class="text-xs text-gray-500 mt-1">Imported from local library • ${esc(x.type)}</div></div>`).join('')}</div></div>`;
  };

  // Devata list: explicit Add button + custom records. Existing master Devatas are retained.
  Pages.renderDevataList = function () {
    const custom = Storage.get('vm_custom_devatas', []);
    const master = DevataMaster || [];
    return `<div class="space-y-5"><div class="flex items-center justify-between gap-3"><div><h1 class="text-xl md:text-2xl font-heading font-bold">Devata</h1><p class="text-xs text-gray-500 mt-1">Deity records, mantras and connected Vedic references.</p></div><button onclick="App.initNewItem('devata')" class="px-3 py-2 rounded-lg bg-vedic-ochre text-white text-xs font-semibold whitespace-nowrap"><i data-lucide="plus" class="w-4 h-4 inline"></i> Add Devata</button></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${master.map(d=>`<div onclick="App.navigate('devata','${esc(d.id)}')" class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark hover:border-vedic-ochre cursor-pointer transition flex gap-4"><img src="${esc(d.image)}" class="w-20 h-20 rounded-lg object-cover border border-vedic-borderLight dark:border-vedic-borderDark shrink-0" alt="${esc(d.name.en)}"><div class="flex-1 min-w-0"><div class="flex items-center justify-between gap-2"><h3 class="font-bold text-base truncate">${esc(d.name[App.lang] || d.name.en)}</h3><button onclick="App.toggleFavourite('devata','${esc(d.id)}',event)" class="text-gray-400 hover:text-vedic-ochre p-1"><i data-lucide="bookmark" class="w-4 h-4 ${App.isFavourite('devata', d.id) ? 'fill-vedic-ochre text-vedic-ochre' : ''}"></i></button></div><p class="text-xs text-gray-500 truncate">${esc(d.title?.[App.lang] || d.title?.en || 'Devata')}</p><div class="mt-2 text-[11px] font-mono text-vedic-ochre truncate">${esc(d.mantras?.moola || 'Mantra details coming later')}</div></div></div>`).join('')}${custom.map(d=>`<div class="p-4 rounded-xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-vedic-borderLight dark:border-vedic-borderDark flex gap-4"><div class="w-20 h-20 rounded-lg overflow-hidden bg-vedic-parchment dark:bg-vedic-charcoal shrink-0 flex items-center justify-center">${d.image ? `<img src="${esc(d.image)}" class="w-full h-full object-cover" alt="${esc(d.name)}">` : `<i data-lucide="sun" class="w-7 h-7 text-vedic-ochre"></i>`}</div><div><h3 class="font-bold">${esc(d.name)}</h3><p class="text-xs text-gray-500 mt-1">Personal Devata • image optional</p></div></div>`).join('')}</div></div>`;
  };

  // Robust custom Devata form. It deliberately stores only user-supplied fields.
  App.initNewItem = ((original) => function (type) {
    if (type !== 'devata') return original.call(this, type);
    const c = document.getElementById('add-form-container');
    const grid = document.getElementById('add-options-grid');
    if (!c || !grid) return;
    grid.classList.add('hidden'); c.classList.remove('hidden');
    c.innerHTML = `<form onsubmit="App.saveCustomDevata(event)" class="space-y-3">
      <div class="font-semibold text-xs text-vedic-ochre uppercase tracking-wider">Add Devata</div>
      <input name="name" required placeholder="Devata name" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark">
      <input name="image" type="url" placeholder="Image URL (optional)" class="w-full px-3 py-2 text-xs rounded-lg bg-vedic-parchment/40 dark:bg-vedic-charcoal border border-vedic-borderLight dark:border-vedic-borderDark">
      <div class="flex justify-end gap-2"><button type="button" onclick="App.openAddModal()" class="px-3 py-2 text-xs border rounded-lg">Back</button><button type="submit" class="px-4 py-2 text-xs bg-vedic-ochre text-white rounded-lg">Done</button></div>
    </form>`;
  })(App.initNewItem);

  App.saveCustomDevata = function (e) {
    e.preventDefault();
    const f = e.target;
    const name = (f.name.value || '').trim();
    if (!name) return;
    const image = (f.image.value || '').trim();
    const items = Storage.get('vm_custom_devatas', []);
    items.push({ id: 'd_' + Date.now(), name, image });
    Storage.set('vm_custom_devatas', items);
    App.closeAddModal();
    App.navigate('devata');
  };

  Pages.renderKarma = function () {
    return `<div class="space-y-5"><div><h1 class="text-xl md:text-2xl font-heading font-bold">Karma</h1><p class="text-xs text-gray-500 mt-1">Saṁskāra and ritual practice reference.</p></div><div class="p-6 rounded-2xl bg-vedic-cardLight dark:bg-vedic-cardDark border border-dashed border-vedic-borderLight dark:border-vedic-borderDark text-center"><div class="w-12 h-12 mx-auto rounded-xl bg-vedic-ochre/10 text-vedic-ochre flex items-center justify-center mb-3"><i data-lucide="flame" class="w-6 h-6"></i></div><h2 class="font-heading font-bold text-sm">Karma module skeleton</h2><p class="text-xs text-gray-500 mt-2 max-w-md mx-auto">The Karma structure is ready. Detailed saṁskāra procedures and references will be added later.</p></div></div>`;
  };

  // Custom records are intentionally skeleton-only until content is supplied.
  App.navigate = ((original) => function (tab, params = null) {
    const hubs = ['time','knowledge','practice'];
    if (hubs.includes(tab)) {
      this.activeTab = tab; this.activeParams = params;
      document.querySelectorAll('.nav-desktop-tab').forEach(el => el.className = el.getAttribute('data-tab') === tab ? 'nav-desktop-tab text-vedic-ochre font-bold flex items-center space-x-1 border-b-2 border-vedic-ochre pb-1' : 'nav-desktop-tab text-gray-600 dark:text-gray-300 hover:text-vedic-ochre flex items-center space-x-1 pb-1');
      document.querySelectorAll('.nav-btn').forEach(el => { const active = el.getAttribute('data-page') === tab; el.classList.toggle('text-vedic-ochre', active); el.classList.toggle('text-gray-500', !active); el.classList.toggle('dark:text-gray-400', !active); });
      const container = document.getElementById('app-viewport');
      container.innerHTML = tab === 'time' ? Pages.renderTimeHub() : tab === 'knowledge' ? Pages.renderKnowledgeHub() : Pages.renderPracticeHub();
      lucide.createIcons(); window.scrollTo(0,0); return;
    }
    if (tab === 'vrata') {
      this.activeTab = tab; this.activeParams = params;
      document.querySelectorAll('.nav-desktop-tab').forEach(el => el.className = el.getAttribute('data-tab') === tab ? 'nav-desktop-tab text-vedic-ochre font-bold flex items-center space-x-1 border-b-2 border-vedic-ochre pb-1' : 'nav-desktop-tab text-gray-600 dark:text-gray-300 hover:text-vedic-ochre flex items-center space-x-1 pb-1');
      document.querySelectorAll('.nav-btn').forEach(el => { const active = el.getAttribute('data-page') === tab; el.classList.toggle('text-vedic-ochre', active); el.classList.toggle('text-gray-500', !active); el.classList.toggle('dark:text-gray-400', !active); });
      document.getElementById('app-viewport').innerHTML = Pages.renderVrata(params); lucide.createIcons(); window.scrollTo(0,0); return;
    }
    return original.call(this, tab, params);
  })(App.navigate);
  // Keep the parent section highlighted when opening a child page.
  App.navigate = ((original) => function (tab, params = null) {
    const result = original.call(this, tab, params);
    const parent = { panchanga:'time', vrata:'time', sukta:'knowledge', devata:'knowledge', texts:'knowledge', karma:'practice' }[tab] || tab;
    document.querySelectorAll('.nav-desktop-tab').forEach(el => {
      const active = el.getAttribute('data-tab') === parent;
      el.className = active ? 'nav-desktop-tab text-vedic-ochre font-bold flex items-center space-x-1 border-b-2 border-vedic-ochre pb-1' : 'nav-desktop-tab text-gray-600 dark:text-gray-300 hover:text-vedic-ochre flex items-center space-x-1 pb-1';
    });
    document.querySelectorAll('.nav-btn').forEach(el => {
      const active = el.getAttribute('data-page') === parent;
      el.classList.toggle('text-vedic-ochre', active);
      el.classList.toggle('text-gray-500', !active);
      el.classList.toggle('dark:text-gray-400', !active);
    });
    return result;
  })(App.navigate);

})();
