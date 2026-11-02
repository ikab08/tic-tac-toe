const Gameboard = ( ()=> {
  let gameboard = [];

  const createBoard = () => {
    gameboard = Array(9).fill("");
  }

	const getBoard = () => [...gameboard];						// copie the board to avoid to transmit & edit the real one 

	const placeMark = (index, mark) => {
		if (index<0 || index>=9) return false ;					// off limit
		if (gameboard[index] !== "") return false;			// already mark

		gameboard[index] = mark;
		return true;
	}

	createBoard();					

	// closure : only return what we want to be public
	return { getBoard, placeMark };
})();