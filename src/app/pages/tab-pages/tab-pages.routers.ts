import { Routes } from '@angular/router';
import { TabPage1Component } from './tab-page1/tab-page1.component';
import { TabPage2Component } from './tab-page2/tab-page2.component';

export const TABS_ROUTES: Routes = [
    { path: 'page1', component: TabPage1Component, title: 'Tab1' },
    { path: 'page2', component: TabPage2Component, title: 'Tab2' },
];