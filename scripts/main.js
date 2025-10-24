import { initLayout } from './modules/layout.js';
import { initTabs } from './modules/tabs.js';
import { initRefresh } from './modules/refresh.js';
import { loadAll } from './modules/data.js';
import './dashboard.js';
import './products.js';
import './vendors.js';
import './projects.js';
import './purchase.js';
import './issue.js';
import './reports.js';

export function bootstrap() {
  initLayout();
  initTabs();
  initRefresh(loadAll);
}
