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

	const reset = () => createBoard();

	createBoard();					

	// closure : only return what we want to be public
	return { getBoard, placeMark, reset };
})();


const Player = (name, mark) => {
	const getName = () => name;
	const getMark = () => mark;
	return {getName, getMark};
}

const player1 = Player("Alice", "X");
const player2 = Player("Bob", "O");


console.log(player1.getName());                        // "Alice"
console.log(player2.getMark());                        // "O"
console.log(Gameboard.placeMark(4, player1.getMark())); // true
console.log(Gameboard.placeMark(4, player2.getMark())); // false : case taken
console.log(Gameboard.placeMark(5, player2.getMark())); // true
console.log(Gameboard.getBoard());                			
// Gameboard.reset();