import { homePageComponent } from './pages/homePageComponent';
import { toysPageComponent } from './pages/toysPageComponent';
import { treePageComponent } from './pages/treePageComponent';

export const appRoutes = [
  { path: '', component: homePageComponent },
  { path: 'toys', component: toysPageComponent },
  { path: 'tree', component: treePageComponent },
];
