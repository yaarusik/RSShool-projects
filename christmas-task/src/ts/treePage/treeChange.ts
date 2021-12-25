const trees: NodeListOf<HTMLElement> = document.querySelectorAll('.tree');

const changeTree = () => {};

trees.forEach((tree) => tree.addEventListener('click', changeTree));
