import { LeftMenu } from '../widget-objects/left-menu.wo';
import { Page } from '@playwright/test';
import { TopMenu } from '../widget-objects/top-menu';
import { SearchModal } from '../widget-objects/search-modal.wo';
import { ResultsPanel } from '../widget-objects/results-panel.wo';


export class Common
{
  static getTopMenu(page: Page): TopMenu
  {
    return new TopMenu(page.locator('nav[aria-label="Main"]'));
  }

  static getLeftMenu(page: Page): LeftMenu
  {
    return new LeftMenu(page.locator('ul.theme-doc-sidebar-menu'));
  }

  static getSearchModal(page: Page): SearchModal
  {
    return new SearchModal(page.locator('div.DocSearch-Modal'));
  }

  static getResultsPanelList(page: Page): ResultsPanel
  {
    return new ResultsPanel(page.locator('ul[role="listbox"]'));
  }
}
