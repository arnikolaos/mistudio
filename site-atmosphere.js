/* MI Architects — decorative light responds only to deliberate desktop pointer movement. */
(() => {
  if (document.querySelector('#geometric-overlay, #overlay-canvas') || /(?:^|\/)development(?:\.html)?\/?$/.test(location.pathname)) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  const selectors = 'header, .c-intro-copy, .c-project-heading, .c-section-label, .c-footer, #services > .container, #quote > .container, #slogan > .container';
  const regions = [];
  document.querySelectorAll(selectors).forEach(surface => {
    if (surface.querySelector('.mi-atmosphere-layer')) return;
    if (getComputedStyle(surface).position === 'static') surface.classList.add('mi-atmosphere-static');
    const layer = document.createElement('span');
    layer.className = 'mi-atmosphere-layer'; layer.setAttribute('aria-hidden', 'true');
    const light = document.createElement('span'); light.className = 'mi-atmosphere-light';
    layer.append(light); surface.prepend(layer);
    let frame = 0, x = 0, y = 0;
    function stop() { cancelAnimationFrame(frame); frame = 0; layer.classList.remove('is-lit'); }
    surface.addEventListener('pointermove', event => {
      if (motion.matches || !mouse.matches || event.pointerType !== 'mouse' || document.hidden) return;
      x = event.clientX; y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = surface.getBoundingClientRect();
        light.style.transform = `translate3d(${x - rect.left}px, ${y - rect.top}px, 0)`;
        layer.classList.add('is-lit');
      });
    }, {passive:true});
    surface.addEventListener('pointerleave', stop);
    surface.addEventListener('pointercancel', stop);
    regions.push(stop);
  });
  const stopAll = () => regions.forEach(stop => stop());
  motion.addEventListener('change', stopAll);
  mouse.addEventListener('change', stopAll);
  document.addEventListener('visibilitychange', stopAll);
  window.addEventListener('blur', stopAll);
  window.addEventListener('scroll', stopAll, {passive:true});
})();
