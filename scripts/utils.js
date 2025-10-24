export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function showCustomConfirm(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById('customConfirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');

    if (!modal || !confirmMessage || !confirmYes || !confirmNo) return resolve(false);

    confirmMessage.innerHTML = message;
    modal.classList.remove('hidden');

    const handleYes = () => {
      modal.classList.add('hidden');
      confirmYes.removeEventListener('click', handleYes);
      confirmNo.removeEventListener('click', handleNo);
      resolve(true);
    };
    const handleNo = () => {
      modal.classList.add('hidden');
      confirmYes.removeEventListener('click', handleYes);
      confirmNo.removeEventListener('click', handleNo);
      resolve(false);
    };

    confirmYes.addEventListener('click', handleYes);
    confirmNo.addEventListener('click', handleNo);
  });
}

export function createRipple(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const ripple = document.createElement('div');
  ripple.classList.add('ripple');
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  button.appendChild(ripple);

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const ring = document.createElement('div');
      ring.classList.add('pulse-ring');
      ring.style.width = ring.style.height = '60px';
      ring.style.left = '50%';
      ring.style.top = '50%';
      ring.style.marginLeft = '-30px';
      ring.style.marginTop = '-30px';
      button.appendChild(ring);
      setTimeout(() => ring.remove(), 1500);
    }, i * 200);
  }

  setTimeout(() => ripple.remove(), 600);
}
