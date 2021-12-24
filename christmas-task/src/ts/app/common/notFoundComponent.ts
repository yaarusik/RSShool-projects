import { BuilderComponent, ComponentConfig } from '../../builder/component';

class NotFoundComponent extends BuilderComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

const notFoundComponent = new NotFoundComponent({
  selector: `main__page`,
  template: `
      <div class="container">
         <h2>Страница не найдена</h2>
      </div>
   `,
});

export default notFoundComponent;
