import { BuilderComponent, ComponentConfig } from '../../builder/component';

class AppHeader extends BuilderComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

const appHeader = new AppHeader({
  selector: `header`,
  template: `
      <div class="container">
        <nav class="toys__menu">
          <div class="menu__row">
            <div class="menu__left">
              <ul class="left__buttons">
                <li class="navigation__btn"><a href="#" class="navigation__home bcg__size"></a></li>
                <li class="navigation__btn"><a href="#toys" class="navigation__link">Игрушки</a></li>
                <li class="navigation__btn"><a href="#tree" class="navigation__link">Ёлка</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
   `,
});

export default appHeader;
