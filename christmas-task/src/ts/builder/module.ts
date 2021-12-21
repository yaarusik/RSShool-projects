import { router } from './tools/router';

export class BuilderModule {
  constructor(config) {
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
    this.components.forEach(this.renderComponent.bind(this));
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute() {
    //   получаем хэш и по результату генерируем страницу
    const url = router.getUrl();
    const route = this.routes.find((r) => r.path === url);

    document.querySelector('.main__page')?.innerHTML = `<div class="${route.component.selector}"></div>`;
    this.renderComponent(route.component);
  }

  renderComponent(component) {
    component.render();
  }
}
