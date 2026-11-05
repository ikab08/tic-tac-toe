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

const DisplayController = (() => {
	const board = document.querySelector("#board");
	const msg = document.querySelector("#msg");
	const restartBtn = document.querySelector("#restart");

	const render = () => {
		const cells = document.querySelectorAll(".cell");
		const gboard = Gameboard.getBoard();
			cells.forEach((cell, i) => {
			cell.textContent = gboard[i];
			cell.dataset.mark = gboard[i];
		});
	}
		
	const handleClick = (e) => {
		const cell = e.target.closest(".cell");
		if (!cell) return;

		const index = Number(cell.dataset.index);

		const result = GameController.playRound(index);
		render();
		
		switch (result.status) {
			case "Continue":
			msg.textContent = `${result.next}'s turn`;
			break;
			case "Win":
			msg.textContent = `${result.winner} wins !`;
			break;
			case "Draw":
			msg.textContent = "Draw !";
			break;
			case "Not allow":
			msg.textContent = "Case taken, replay !";
			break;
			case "Game over":
			msg.textContent = "Game Over, restart !";
			break;
		}
	};

	const init = () => {
		for (let i = 0; i < 9; i++) {
			const btn = document.createElement("button");
			btn.classList.add("cell");
			btn.dataset.index = i;
			board.appendChild(btn);
		}
		board.addEventListener("click", handleClick);
		
		restartBtn.addEventListener("click", () => {
			GameController.newGame();
			render();
			msg.textContent = "Player 1's turn";
		});

		render();
	}

	return { init };
})();

DisplayController.init();