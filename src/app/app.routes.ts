import { Routes } from '@angular/router';
import { TABS_ROUTES } from './pages/tab-pages/tab-pages.routers';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'tabs', loadChildren: () => import('./pages/tab-pages/tab-pages.routers').then(m => m.TABS_ROUTES) },
];
