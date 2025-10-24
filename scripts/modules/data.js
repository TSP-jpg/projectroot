import { fetchAllData } from '../../api/fetchData.js';
import { renderDashboard } from '../dashboard.js';
import { renderReport } from '../reports.js';
import { renderVendors, renderVendorMultiSelect } from '../vendors.js';
import { renderProjects } from '../projects.js';
import { renderManageProducts } from '../products.js';

const cache = {
  products: [], vendors: [], projects: [], stockReport: [], lots: [],
  recentActivities: [], topIssued: [], topStockValue: [], monthlyActivity: { labels: [], purchase: [], issue: [] },
  projectExpenditureData: [], lastUpdated: null, nextVendorCode: '001', nextProjectNo: 1, nextPurchaseNo: 1,
};

function populateDatalist(datalistId, items, getKey) {
  const datalistEl = document.getElementById(datalistId);
  if (!datalistEl) return;
  datalistEl.innerHTML = '';
  const uniqueItems = new Set();
  items.forEach((item) => {
    const value = String(getKey(item) || '').trim();
    if (value && !uniqueItems.has(value)) {
      const option = document.createElement('option');
      option.value = value;
      datalistEl.appendChild(option);
      uniqueItems.add(value);
    }
  });
}

export async function loadAll() {
  const statusText = document.getElementById('statusText');
  try {
    const data = await fetchAllData();
    cache.products = Array.isArray(data.products) ? data.products : [];
    cache.vendors = Array.isArray(data.vendors) ? data.vendors : [];
    cache.projects = Array.isArray(data.projects) ? data.projects : [];
    cache.stockReport = Array.isArray(data.stockReport) ? data.stockReport : [];
    cache.lots = Array.isArray(data.lots) ? data.lots : [];
    cache.recentActivities = Array.isArray(data.recentActivities) ? data.recentActivities : [];
    cache.topIssued = Array.isArray(data.topIssued) ? data.topIssued : [];
    cache.topStockValue = Array.isArray(data.topStockValue) ? data.topStockValue : [];
    cache.monthlyActivity = data.monthlyActivity || { labels: [], purchase: [], issue: [] };
    cache.projectExpenditureData = Array.isArray(data.projectExpenditureData) ? data.projectExpenditureData : [];
    cache.lastUpdated = new Date();

    populateDatalist('productOptionsProjectReport', cache.products, (item) => item['ชื่อสินค้า']);
    populateDatalist('abbrevOptions', cache.products, (item) => item['ชื่อย่อหมวด']);
    populateDatalist('codeOptions', cache.products, (item) => item['รหัส']);
    populateDatalist('regTypeOptions', cache.vendors, (item) => item['ประเภทจดทบ.']);
    populateDatalist('projectCustomerOptions', cache.projects, (item) => item['Customer']);
    populateDatalist('projectTypeOptions', cache.projects, (item) => item['ประเภท']);
    populateDatalist('projectCodeTextOptions', cache.projects, (item) => item['CODE']);
    populateDatalist('projectPhaseOptions', cache.projects, (item) => item['เฟส']);

    renderDashboard();
    renderReport();
    renderVendors();
    renderVendorMultiSelect();
    renderProjects();
    const manageProductsSearch = document.getElementById('manageProductsSearch');
    renderManageProducts(manageProductsSearch?.value);
  } catch (e) {
    console.error('Error loading data:', e);
    if (statusText) {
      statusText.textContent = `ข้อผิดพลาด: ${e.message}`;
      statusText.classList.remove('text-blue-400', 'text-green-400');
      statusText.classList.add('text-red-400');
    }
  }
}

export function getCache() { return cache; }
