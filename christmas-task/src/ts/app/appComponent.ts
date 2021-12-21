import { BuilderComponent } from '../..';
import { Config } from '../builder/component';

class AppComponent extends BuilderComponent {
  constructor(config: Config) {
    super(config);
  }
}

const appComponent = new AppComponent({
  selector: `wrapper`,
  template: `<section class="header"></section>
            <section class="main__page"></section>  
  `,
});

export default appComponent;

// компоненты регистрируются в модуле
// отвечает за шаблон всего нашего приложения
// вносим тег и пишем что там будет уже в компоненте
