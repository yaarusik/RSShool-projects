// import helper from './tools/helper';

export class BuilderComponent {
  template: string;

  selector: string;

  el: HTMLElement | null;

  events: { [key: string]: string };

  constructor(config: ComponentConfig) {
    this.template = config.template;
    this.selector = config.selector;
    this.el = null;
    this.events = config.events;
  }

  public render() {
    this.el = document.querySelector(`.${this.selector}`);
    if (!this.el) throw new Error(`Component with ${this.selector} wasn't found`);
    this.el.innerHTML = this.template;

    this.initEvents();
  }

  private initEvents() {
    // if (helper.isUndefined(this.toysEvents)) return;
    if (!this.events) return;

    console.log(this.events);

    Object.keys(this.events).forEach((key) => {
      const listener = key.split(' ');
      console.log(listener);
      if (this.el)
        this.el
          .querySelector(<string>listener[1])
          ?.addEventListener(<string>listener[0], this[this.events[key]].bind(this));
    });
  }
}

export type ComponentConfig = {
  selector: string;
  template: string;
  events: { [key: string]: string };
};
