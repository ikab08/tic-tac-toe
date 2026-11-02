const Gameboard = ( ()=> {
  let gameboard = [];

  const createBoard = () => {
    gameboard = Array(9).fill("");
  }

	const getBoard = () => [...gameboard];	// copie the board to avoid to transmit & edit the real one 

	createBoard();													

	// closure : only return what we want to be public
	return { getBoard };
})();

console.log(Gameboard.getBoard());