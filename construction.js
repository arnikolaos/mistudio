/* MI Development — restrained reveals and accessible photographic galleries. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const introText = document.querySelector('.c-intro-text');
  if (introText && !reduced.matches) {
    introText.setAttribute('aria-label', introText.innerText.replace(/\s+/g, ' ').trim());
    let order = 0;
    [...introText.childNodes].forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(word => {
        if (/^\s+$/.test(word)) { fragment.append(document.createTextNode(word)); return; }
        const wrapper = document.createElement('span');
        wrapper.className = 'c-word'; wrapper.setAttribute('aria-hidden', 'true');
        [...word].forEach(letter => {
          const span = document.createElement('span'); span.className = 'c-letter';
          span.style.setProperty('--letter-order', order++); span.textContent = letter; wrapper.append(span);
        });
        fragment.append(wrapper);
      });
      node.replaceWith(fragment);
    });
  }
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('is-waiting'); observer.unobserve(entry.target); }
    }), { threshold: .06 });
    document.querySelectorAll('.c-reveal').forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('is-waiting'); observer.observe(el); }
    });
    reduced.addEventListener('change', () => {
      if (reduced.matches) { document.querySelectorAll('.is-waiting').forEach(el => el.classList.remove('is-waiting')); observer.disconnect(); }
    });
  }
  document.querySelector('.c-intro-image>img')?.addEventListener('animationend', event => { event.currentTarget.style.animation = 'none'; }, {once:true});
  document.querySelector('.c-intro-copy>.c-text-link')?.addEventListener('animationend', event => { event.currentTarget.classList.add('c-explore-settled'); }, {once:true});
  const dialog = document.querySelector('.c-lightbox');
  if (!dialog) return;
  const buttons = [...document.querySelectorAll('.c-gallery-open')];
  const image = dialog.querySelector('img'), caption = dialog.querySelector('figcaption');
  let active = 0, opener, oldOverflow;
  function show(index) {
    active = (index + buttons.length) % buttons.length;
    const item = buttons[active];
    image.src = item.dataset.full; image.alt = item.dataset.caption;
    caption.textContent = `${active + 1} / ${buttons.length} — ${item.dataset.caption}`;
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    opener = button; show(index); oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; dialog.showModal();
  }));
  dialog.querySelector('.c-lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.c-lightbox-prev').addEventListener('click', () => show(active - 1));
  dialog.querySelector('.c-lightbox-next').addEventListener('click', () => show(active + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(active + (event.key === 'ArrowLeft' ? -1 : 1)); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = oldOverflow; opener?.focus(); });
  let startX = 0, startY = 0;
  image.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; startY = event.changedTouches[0].clientY; }, {passive:true});
  image.addEventListener('touchend', event => {
    const dx = event.changedTouches[0].clientX - startX, dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(active + (dx < 0 ? 1 : -1));
  }, {passive:true});
  if (buttons.length < 2) dialog.querySelectorAll('.c-lightbox-prev,.c-lightbox-next').forEach(el => el.hidden = true);
})();
