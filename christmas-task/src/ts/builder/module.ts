import router from './tools/router';
import { BuilderComponent } from './component';
import { IAppRoutes } from '../app/appRouts';

export interface IBuilderConfig {
  components: Array<BuilderComponent>;
  bootstrap: BuilderComponent;
  routes: IAppRoutes[];
}

class BuilderModule {
  components: Array<BuilderComponent>;

  bootstrapComponent: BuilderComponent;

  routes: IAppRoutes[];

  constructor(config: IBuilderConfig) {
    this.components = config.components;
    this.bootstrapComponent = config.bootstrap;
    this.routes = config.routes;
  }

  start() {
    this.initComponents();
    if (this.routes) this.initRoutes();
  }

  initComponents() {
    //   проверка чтобы именно appComponent был первый в массиве
    this.bootstrapComponent.render();
    //  из-за forEACH теряется контекст
    this.components.forEach(BuilderModule.renderComponent.bind(this));
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute() {
    //   получаем хэш и по результату генерируем страницу
    const url = router.getUrl();
    let route: IAppRoutes | undefined = this.routes.find((r) => r.path === url);
    if (route) {
      (<HTMLElement>(
        document.querySelector('.main__page')
      )).innerHTML = `<div class="${route.component.selector}"></div>`;
      BuilderModule.renderComponent(route.component);
    } else {
      route = <IAppRoutes>this.routes.find((r) => r.path === '**');
      BuilderModule.renderComponent(route.component);
    }
  }

  static renderComponent(component: BuilderComponent) {
    component.render();
  }
}

export default BuilderModule;
