import { sleep } from '../utils.js';

export function initRefresh(loadAll) {
  const refreshBtn = document.getElementById('refreshBtn');
  const refreshIcon = document.getElementById('refreshIcon');
  const btnLabel = document.getElementById('btnLabel');
  const progressBar = document.getElementById('progressBar');
  const statusText = document.getElementById('statusText');

  let isRefreshing = false;

  async function startRefresh() {
    isRefreshing = true;
    refreshIcon?.classList.add('refresh-spin');
    if (btnLabel) btnLabel.textContent = 'กำลังรีเฟรช...';
    refreshBtn?.classList.add('opacity-80');
    if (progressBar) {
      progressBar.classList.remove('progress-active');
      progressBar.style.width = '0%';
    }
    setTimeout(() => progressBar?.classList.add('progress-active'), 100);

    const statuses = ['เชื่อมต่อเซิร์ฟเวอร์...','ดาวน์โหลดข้อมูล...','ประมวลผลข้อมูล...','อัพเดทหน้าจอ...','เสร็จสิ้น!'];
    let errorDuringLoad = false;
    try {
      for (let i = 0; i < statuses.length; i++) {
        if (statusText) {
          statusText.textContent = statuses[i];
          statusText.classList.add('text-blue-400');
        }
        if (statuses[i] === 'ดาวน์โหลดข้อมูล...') {
          await loadAll();
        }
        await sleep(i === statuses.length - 1 ? 0 : 100);
      }
    } catch (error) {
      errorDuringLoad = true;
      console.error('Error during refresh process:', error);
      if (statusText) {
        statusText.textContent = `เกิดข้อผิดพลาด: ${error.message}`;
        statusText.classList.remove('text-blue-400');
        statusText.classList.add('text-red-400');
      }
    } finally {
      completeRefresh(errorDuringLoad);
    }
  }

  function completeRefresh(hadError = false) {
    refreshIcon?.classList.remove('refresh-spin');
    if (btnLabel) btnLabel.textContent = 'Refresh';
    refreshBtn?.classList.remove('opacity-80');

    setTimeout(() => {
      if (progressBar) {
        progressBar.classList.remove('progress-active');
        progressBar.style.width = '0%';
      }
    }, 500);

    if (!hadError) {
      if (statusText) {
        statusText.textContent = 'รีเฟรชเสร็จสิ้น!';
        statusText.classList.remove('text-blue-400', 'text-red-400');
        statusText.classList.add('text-green-400');
      }
    }

    setTimeout(() => {
      if (statusText) {
        statusText.textContent = 'พร้อมรีเฟรช';
        statusText.classList.remove('text-green-400', 'text-red-400', 'text-blue-400');
      }
      isRefreshing = false;
    }, 2000);
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      if (isRefreshing) return;
      // optional ripple can be added by importing createRipple
      startRefresh();
    });
  }
}
