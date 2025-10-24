export function initTabs() {
  const tabs = [
    'dashboard','add-product','add-vendor','add-project','purchase','issue',
    'report', 'vendors-list', 'project-expenditure-report', 'budget-estimate', 'settings'
  ];

  const sections = {};
  const tabButtons = document.querySelectorAll('.menu-item');
  tabs.forEach((t) => {
    const el = document.getElementById('tab-' + t);
    if (el) sections[t] = el;
  });

  const reportsDropdown = document.getElementById('reportsDropdown');
  const toggleReportsDropdownBtn = document.getElementById('toggleReportsDropdown');
  const reportsDropdownArrow = document.getElementById('reportsDropdownArrow');

  function setActiveTab(name) {
    Object.values(sections).forEach((section) => section.classList.add('hidden'));
    if (sections[name]) sections[name].classList.remove('hidden');

    tabButtons.forEach((b) => b.classList.remove('tab-active'));
    toggleReportsDropdownBtn?.classList.remove('tab-active');

    const clickedTabButton = document.querySelector(`.menu-item[data-tab="${name}"]`);
    if (clickedTabButton) {
      clickedTabButton.classList.add('tab-active');
    } else if (['report','vendors-list','project-expenditure-report'].includes(name)) {
      toggleReportsDropdownBtn?.classList.add('tab-active');
      const subItem = reportsDropdown?.querySelector(`[data-tab="${name}"]`);
      subItem?.classList.add('tab-active');
    }

    if (['report','vendors-list','project-expenditure-report'].includes(name)) {
      reportsDropdown?.classList.remove('hidden');
      reportsDropdownArrow?.classList.add('rotate-180');
    } else {
      reportsDropdown?.classList.add('hidden');
      reportsDropdownArrow?.classList.remove('rotate-180');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabButtons.forEach((btn) => {
    if (btn.id !== 'toggleReportsDropdown') {
      btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
    }
  });

  toggleReportsDropdownBtn?.addEventListener('click', () => {
    reportsDropdown?.classList.toggle('hidden');
    reportsDropdownArrow?.classList.toggle('rotate-180');
  });

  setActiveTab('dashboard');
}
