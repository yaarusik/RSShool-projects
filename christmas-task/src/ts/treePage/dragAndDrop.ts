let img: HTMLImageElement;
const dropZone: HTMLElement = <HTMLElement>document.querySelector('.favorite__map');
const containerTree: HTMLElement = <HTMLElement>document.querySelector('.favorite__area');
let isDrop = false;
const parentsArr: HTMLElement[] = [];

const imgDragStart = (e: DragEvent) => {
  isDrop = false;
  img = <HTMLImageElement>e.target;

  e.dataTransfer?.setData('id', img.id);
};

const getImgId = (target: HTMLElement) => {
  return Number(target.id.split('-')[0]);
};

const imgDragEnd = (e: DragEvent) => {
  img = <HTMLImageElement>e.target;
  const imgId = getImgId(img);
  const parent = parentsArr[imgId];
  const parentChildren = parent?.children;
  const parentCountTitle = parent?.children[0];

  if (parentCountTitle && parentChildren) {
    const count = parentChildren.length - 1;
    parentCountTitle.innerHTML = `${count}`;
  }
};

const addImgEvents = (image: HTMLImageElement) => {
  image.addEventListener('dragstart', imgDragStart);
  image.addEventListener('dragend', imgDragEnd);
};

export const saveParents = (parent: HTMLElement) => {
  parentsArr.push(parent);
};

const zoneOver = (e: MouseEvent) => {
  e.preventDefault();
};

const zoneDrop = (e: DragEvent) => {
  isDrop = true;

  const itemId = e.dataTransfer?.getData('id');
  const zone: HTMLImageElement = <HTMLImageElement>e.target;

  if (img) {
    img.style.top = `${e.pageY - img.offsetHeight * 1.5}px`;
    img.style.left = `${e.pageX - img.offsetWidth / 2}px`;
  }

  zone.append(document.getElementById(`${itemId}`) as HTMLImageElement);
};

const styleReset = (target: HTMLElement) => {
  const toy = target;
  toy.style.top = 'auto';
  toy.style.left = 'auto';
};

const returnToys = (target: HTMLElement): HTMLElement | undefined => {
  const imgId = getImgId(target);
  const cloneImg = target;

  target.remove();
  parentsArr[imgId]?.append(cloneImg);

  return parentsArr[imgId];
};

const changeCount = (parent: HTMLElement) => {
  const parentCountTitle = parent.children[0];
  if (parentCountTitle) {
    const countToys = Number(parentCountTitle.innerHTML) + 1;
    parentCountTitle.innerHTML = `${countToys}`;
  }
};

const checkTree = (e: DragEvent) => {
  const target: HTMLElement = <HTMLElement>e.target;
  if (target) {
    if (!isDrop && target.parentNode === containerTree) {
      const parentImg = returnToys(target);
      if (parentImg) {
        changeCount(parentImg);
      }
      styleReset(target);
    }
  }
};

document.body.addEventListener('dragend', checkTree);
dropZone.addEventListener('dragover', zoneOver);
dropZone.addEventListener('drop', zoneDrop);

export default addImgEvents;
