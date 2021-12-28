const treeBtns: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('.tree');

const treeContainer: HTMLElement = <HTMLElement>document.querySelector('.favorite__tree');

const createTree = (e?: Event) => {
  const imgUrl = localStorage.getItem('tree') || `./assets/images/tree/6.png`;
  const img = new Image();
  img.className = 'main__tree';
  img.useMap = `#image-map`;
  if (e) {
    const treeNum = Number((<HTMLButtonElement>e.target).dataset.tree);
    img.src = `./assets/images/tree/${treeNum}.png`;
    localStorage.setItem('tree', img.src);
  } else {
    img.src = `${imgUrl}`;
  }

  treeContainer.appendChild(img);
};

export const cleanTree = (e?: Event) => {
  (<HTMLElement>document.querySelector('.main__tree')).remove();
  createTree(e);
};

treeBtns.forEach((btn) => btn.addEventListener('click', cleanTree));

createTree();

export default createTree;
