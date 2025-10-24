// Component boot loader for static hosting
async function include(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    el.innerHTML = await res.text();
  } catch (e) {
    el.innerHTML = `<div class='text-red-400 text-sm'>โหลดไม่สำเร็จ: ${url}</div>`;
  }
}

await include('#header-root', './components/header.html');
await include('#sidebar-root', './components/sidebar.html');
await include('#modals-root', './components/modal.html');

const { bootstrap } = await import('./main.js');
bootstrap();
