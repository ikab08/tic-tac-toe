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


// Gamecontroller

const GameController = (() => {
	const players = [Player("Player 1", "X"), Player("Player 2", "O")];
	let currentPlayer = players[0];
	let gameOver = false;

	const winingCombos = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8],
		[0, 3, 6], [1, 4, 7], [2, 5, 8],
		[0, 4, 8], [2, 4, 6],
	];

	const checkWin = (mark) => {
		const board = Gameboard.getBoard();
		return winingCombos.some((combo) => 
			combo.every((index) => board[index] === mark)
		);
	};

	const isDraw = () => Gameboard.getBoard().every((cell) => cell !== "");

	const switchPlayer = () => {
		currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
	}

	const playRound = (index) => {
		if (gameOver) return { status: "Game over"};
		
		if (!Gameboard.placeMark(index, currentPlayer.getMark())) {
			return { status: "Not allow"};
		}

		if (checkWin(currentPlayer.getMark())) {
			gameOver = true;
			return { status: "Win", winner: currentPlayer.getName()}
		}

		if (isDraw()) {
			gameOver = true;
			return { status: "Draw"};
		}

		switchPlayer();
		return { status: "Continue", next: currentPlayer.getName()};
	};

	const getCurrentPlayer = () => currentPlayer;

	const newGame = () => {
		Gameboard.reset();
		currentPlayer = players[0];
		gameOver = false
	}

	return { playRound, getCurrentPlayer, newGame};
})();

// console display
const printBoard = () => {
	const b = Gameboard.getBoard().map((cell) => cell || " ");
	console.log(`${b[0]} | ${b[1]} | ${b[2]}\n${b[3]} | ${b[4]} | ${b[5]}\n${b[6]} | ${b[7]} | ${b[8]}`);
}

// test
console.log(GameController.playRound(0)); 
console.log(GameController.playRound(0)); 
console.log(GameController.playRound(3)); 
console.log(GameController.playRound(1)); 
console.log(GameController.playRound(4)); 
console.log(GameController.playRound(2)); 
console.log(GameController.playRound(5)); 

printBoard();