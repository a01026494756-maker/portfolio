(() => {
  const storage = {
    read(key) { try { return JSON.parse(sessionStorage.getItem(key)); } catch { return null; } },
    write(key, value) { try {sessionStorage.setItem(key, JSON.stringify(value));} catch {} },
  };
  document.querySelectorAll('[data-project]').forEach(link => link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    storage.write('sarah-project-return', {id:link.dataset.project,y:window.scrollY});
  }));
  document.querySelectorAll('[data-return]').forEach(link => link.addEventListener('click',event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    storage.write('sarah-restore-request',true);
  }));
  function restoreHome(event) {
    if (document.body.dataset.page !== 'home') return;
    const nav = performance.getEntriesByType('navigation')[0];
    const restore = storage.read('sarah-restore-request') || event?.persisted || nav?.type === 'back_forward';
    const saved = storage.read('sarah-project-return');
    if (restore && saved) {
      storage.write('sarah-restore-request',false);
      const link = document.querySelector(`[data-project="${CSS.escape(saved.id)}"]`);
      if (link) { requestAnimationFrame(() => {link.focus({preventScroll:true}); window.scrollTo({top:saved.y,behavior:'instant'});}); }
    } else if (location.hash === '#projects') {
      document.querySelector('#projects-heading')?.focus({preventScroll:true});
    }
  }
  window.addEventListener('pageshow',restoreHome);
  if (document.body.dataset.page === 'detail') document.querySelector('h1')?.focus({preventScroll:true});
  document.querySelectorAll('.project-image img').forEach(img => {
    const fail = () => {img.hidden=true; img.nextElementSibling.hidden=false;};
    img.addEventListener('error',fail);
    if (img.complete && !img.naturalWidth) fail();
  });
})();
