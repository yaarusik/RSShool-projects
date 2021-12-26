let coordX: number;
let coordY: number;
let img: HTMLImageElement;
const dropZone: HTMLElement = <HTMLElement>document.querySelector('.favorite__map');

const imgDragStart = (e: DragEvent) => {
  img = <HTMLImageElement>e.target;

  e.dataTransfer?.setData('id', img.id);
  coordX = e.offsetX;
  coordY = e.offsetY;
};

const imgDragEnd = (e: DragEvent) => {
  img = <HTMLImageElement>e.target;
};

const addImgEvents = (image: HTMLImageElement) => {
  image.addEventListener('dragstart', imgDragStart);
  image.addEventListener('dragend', imgDragEnd);
};

const zoneLeave = () => {
  console.log('leave');
};

const zoneOver = (e: MouseEvent) => {
  e.preventDefault();
  console.log('over');
};
const zoneDrop = (e: DragEvent) => {
  const itemId = e.dataTransfer?.getData('id');

  const zone: HTMLImageElement = <HTMLImageElement>e.target;

  if (img) {
    if (coordY) img.style.top = `${e.pageY - 74}px`;
    if (coordX) img.style.left = `${e.pageX - img.offsetWidth}px`;
  }

  zone.append(document.getElementById(`${itemId}`) as HTMLImageElement);
};
dropZone.addEventListener('dragover', zoneOver);
dropZone.addEventListener('drop', zoneDrop);

// dropZone.addEventListener('dragenter', zoneEnter);
dropZone.addEventListener('dragleave', zoneLeave);

export default addImgEvents;
