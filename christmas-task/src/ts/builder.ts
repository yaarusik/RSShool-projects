class Builder {
  el: string;

  constructor(el: string) {
    this.el = el;
    this.build();
  }

  build() {
    document.body.innerHTML = `${this.el}`;
  }

  // dectroy() {

  // }
}

export default Builder;
