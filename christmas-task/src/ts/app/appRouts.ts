import homePageComponent from './pages/homePageComponent';
import toysPageComponent from './pages/toysPageComponent';
import treePageComponent from './pages/treePageComponent';
import notFoundComponent from './common/notFoundComponent';
import { BuilderComponent } from '../builder/component';

const appRoutes: IAppRoutes[] = [
  { path: '', component: homePageComponent },
  { path: 'toys', component: toysPageComponent },
  { path: 'tree', component: treePageComponent },
  { path: '**', component: notFoundComponent },
];

export interface IAppRoutes {
  path: string;
  component: BuilderComponent;
}

export default appRoutes;
