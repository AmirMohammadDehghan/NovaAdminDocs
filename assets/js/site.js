(() => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('nova-docs-theme');
  if (storedTheme) root.dataset.theme = storedTheme;
  const themeBtn = document.querySelector('[data-theme-toggle]');
  themeBtn?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    localStorage.setItem('nova-docs-theme', next);
  });

  const navToggle = document.querySelector('[data-nav-toggle]');
  navToggle?.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.body.classList.remove('nav-open');
      closeSearch();
    }
  });
  document.addEventListener('click', (event) => {
    if (document.body.classList.contains('nav-open') && !event.target.closest('[data-sidebar], [data-nav-toggle]')) {
      document.body.classList.remove('nav-open');
    }
  });

  const tocList = document.querySelector('[data-toc-list]');
  const headings = [...document.querySelectorAll('.doc-card h2, .doc-card h3')];
  if (tocList && headings.length) {
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = 'section-' + index;
      const link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      if (heading.tagName === 'H3') link.style.paddingInlineStart = '12px';
      tocList.appendChild(link);
    });
  }

  document.querySelectorAll('pre').forEach((pre) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'کپی';
    button.style.cssText = 'position:absolute;top:8px;inset-inline-end:8px;border:1px solid rgba(148,163,184,.25);background:rgba(15,23,42,.78);color:#e5e7eb;border-radius:8px;padding:3px 8px;font:inherit;font-size:11px;cursor:pointer;';
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(pre.innerText);
      button.textContent = 'کپی شد';
      setTimeout(() => button.textContent = 'کپی', 1200);
    });
    pre.appendChild(button);
  });

  const input = document.querySelector('[data-search-input]');
  const panel = document.querySelector('[data-search-panel]');
  const results = document.querySelector('[data-search-results]');
  const index = window.NOVA_DOCS_SEARCH_INDEX || [];
  function closeSearch() { if (panel) panel.hidden = true; }
  function normalize(value) { return (value || '').toString().toLowerCase().replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک'); }
  function renderSearch(query) {
    if (!panel || !results) return;
    const q = normalize(query).trim();
    if (q.length < 2) { closeSearch(); return; }
    const matches = index.map(item => {
      const hay = normalize(`${item.title} ${item.description} ${item.content}`);
      let score = 0;
      if (normalize(item.title).includes(q)) score += 4;
      if (normalize(item.description).includes(q)) score += 2;
      if (hay.includes(q)) score += 1;
      return { item, score };
    }).filter(x => x.score > 0).sort((a,b) => b.score - a.score).slice(0, 8);
    results.innerHTML = matches.length ? matches.map(({item}) => `<a class="search-result" href="${baseUrl(item.url)}"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small></a>`).join('') : '<div class="search-result"><strong>نتیجه‌ای پیدا نشد</strong><small>عبارت دیگری را امتحان کن.</small></div>';
    panel.hidden = false;
  }
  function baseUrl(url) {
    const base = document.querySelector('link[rel="stylesheet"]')?.href.split('/assets/css/site.css')[0] || '';
    return base + url.replace(/^\//, '/');
  }
  function escapeHtml(s) { return s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  input?.addEventListener('input', (event) => renderSearch(event.target.value));
  input?.addEventListener('focus', (event) => renderSearch(event.target.value));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-panel, .search-box')) closeSearch();
  });
})();
