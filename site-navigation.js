/* MI Architects — navigation collapses before the available width is exceeded. */
(() => {
  document.querySelectorAll('header nav').forEach((nav, index) => {
    const list = nav.querySelector('ul');
    if (!list || nav.classList.contains('mi-nav-ready')) return;
    nav.classList.add('mi-nav-ready');
    nav.setAttribute('aria-label', nav.getAttribute('aria-label') || 'Main navigation');
    list.id ||= `mi-navigation-${index}`;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'mi-menu-toggle';
    button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', list.id);
    button.innerHTML = '<span>Menu</span><svg viewBox="0 0 20 16" aria-hidden="true"><path d="M1 3h18"/><path d="M1 13h18"/></svg>';
    nav.insertBefore(button, list);
    [...list.children].forEach((el,i) => el.style.setProperty('--mi-order', i));
    let compact = false;
    function close(returnFocus = false) {
      nav.classList.remove('mi-nav-open'); button.setAttribute('aria-expanded','false');
      list.inert = compact; if (returnFocus) button.focus();
    }
    function measure() {
      const wasOpen = nav.classList.contains('mi-nav-open');
      nav.classList.remove('mi-nav-compact', 'mi-nav-open');
      list.inert = false;
      const style = getComputedStyle(list);
      const links = [...list.children];
      const needed = links.reduce((sum,li) => sum + li.getBoundingClientRect().width, 0) + (parseFloat(style.columnGap) || 20) * (links.length - 1);
      compact = innerWidth <= 760 || needed > nav.clientWidth - 20 || list.scrollWidth > nav.clientWidth + 1;
      nav.classList.toggle('mi-nav-compact', compact);
      if (compact && wasOpen) { nav.classList.add('mi-nav-open'); button.setAttribute('aria-expanded', 'true'); list.inert = false; }
      else close();
    }
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('mi-nav-open', open); button.setAttribute('aria-expanded',String(open)); list.inert = !open;
    });
    list.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    nav.addEventListener('keydown', event => { if (event.key === 'Escape') { close(true); event.preventDefault(); } });
    document.addEventListener('click', event => { if (!nav.contains(event.target)) close(); });
    nav.addEventListener('focusout', () => requestAnimationFrame(() => { if (!nav.contains(document.activeElement)) close(); }));
    let frame;
    addEventListener('resize', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    document.fonts?.ready.then(measure);
    measure();
  });
})();
