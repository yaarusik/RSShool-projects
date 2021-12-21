export class BuilderComponent {
  template: string;

  selector: string;

  el: HTMLElement | null;

  constructor(config: Config) {
    this.template = config.template;
    this.selector = config.selector;
    this.el = null;
  }

  render() {
    this.el = document.querySelector(`.${this.selector}`);
    if (!this.el) throw new Error(`Component with ${this.selector} wasn't found`);
    this.el.innerHTML = this.template;
  }
}

export type Config = {
  selector: string;
  template: string;
};
