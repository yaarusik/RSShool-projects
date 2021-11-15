const buttons = document.querySelectorAll(".buttons");
console.log(buttons);
buttons.forEach((item) => {
  item.addEventListener("click", function (e) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    let maxValue = Math.max(this.clientWidth, this.clientHeight);
    let styleDiv = circle.style;
    let px = "px";
    let x = this.getBoundingClientRect();

    styleDiv.width = styleDiv.height = maxValue + px;

    styleDiv.left = e.clientX - x.left - maxValue / 2 + px;
    styleDiv.top = e.clientY - x.top - maxValue / 2 + px;
    console.log(this);
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 11700);

    // let x = e.clientX - e.target.offsetLeft;
    // let y = e.clientY - e.target.offsetTop;

    // let ripples = document.createElement("div");
    // ripples.style.left = x + "px";
    // ripples.style.top = y + "px";
    // this.appendChild(ripples);

    // setTimeout(() => {
    //   ripples.remove();
    // }, 1000);
  });
});
