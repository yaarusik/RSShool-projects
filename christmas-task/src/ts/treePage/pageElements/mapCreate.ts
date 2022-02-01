const favoriteTreeContainer: HTMLAreaElement = <HTMLAreaElement>document.querySelector('.favorite__area');

const choordsArr = [
  '246,0,198,41,157,151,117,242,96,301,73,369,55,437,35,485,7,549,39,596,49,617,85,638,109,661,201,682,318,682,375,682,435,675,463,626,369,443,271,67,259,36',
];

const setChoords = () => {
  favoriteTreeContainer.coords = `${choordsArr[0]}`;
};

setChoords();
