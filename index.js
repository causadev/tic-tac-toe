const Player = (mark) => {
	return {
		mark
	}
}

const gameBoard = (() => {
	const board = Array(9).fill(null);
	const cells = document.querySelectorAll(".cell");
	const playAgainBtn = document.querySelector(".play")


	let gameActive = true
	cells.forEach((cell, index) => cell.addEventListener("click", () => {
		if (board[index] !== null || !gameActive) return
		displayController.renderMark(cell, index);
		const winner = checkWinner(board);
		if (winner) {
			handleWinner(winner)
		} else if (!board.includes(null)) {
			handleDraw()
		}

		displayController.switchPlayer()
		displayController.activePlayer()
	}))

	const handleWinner = (winner) => {
		displayController.openModal()
		displayController.gameStatus.textContent = `${winner} winner🎉`
		gameActive = false
		playAgainBtn.addEventListener("click", playAgain)
	}

	const handleDraw = () => {
		displayController.openModal()
		displayController.gameStatus.textContent = `draw...😑`
		gameActive = false
		playAgainBtn.addEventListener("click", playAgain)
	}



	const playAgain = () => {
		gameActive = true;
		displayController.currentPlayer = Player("x");
		cells.forEach((cell) => cell.textContent = "");
		board.fill(null);
		displayController.closeModal();
	}

	return {
		board,
		cells,
		gameActive
	}

})()


const displayController = (() => {
	let currentPlayer = Player("x");
	const restartBtn = document.querySelector(".restart")
	const gameStatus = document.querySelector(".gameStatus")
	const squareX = document.querySelector(".squareX");
	const squareO = document.querySelector(".squareO")
	const modal = document.querySelector(".modal");
	const overlay = document.querySelector("#overlay")


	const openModal = () => {
		modal.classList.add("active")
		overlay.classList.add("active")
	}
	const closeModal = () => {
		modal.classList.remove("active")
		overlay.classList.remove("active")
	}

	const renderMark = (cell, index) => {
		gameBoard.board[index] = currentPlayer.mark
		cell.textContent = currentPlayer.mark
	}

	const switchPlayer = () => {
		currentPlayer.mark = currentPlayer.mark === "x" ? "o" : "x"
	}


	const restartGame = () => {
		gameBoard.board.fill(null)
		gameBoard.cells.forEach((cell) => cell.textContent = "")
		activePlayer()
		currentPlayer = Player("x")
		gameActive = true;
	}

	const activePlayer = () => {
		if (squareX.textContent === currentPlayer.mark) {
			squareX.style.background = "#776e62"
			squareO.style.background = "#181a1b"
			squareX.style.transition = "all 0.2s ease-in-out";
		} else if (squareO.textContent === currentPlayer.mark) {
			squareO.style.background = "#776e62"
			squareX.style.background = "#181a1b"
			squareO.style.transition = "all 0.2s ease-in-out";
		}
	}

	activePlayer()

	restartBtn.addEventListener("click", restartGame)
	return {
		renderMark,
		switchPlayer,
		activePlayer,
		openModal,
		closeModal,
		gameStatus,
		restartGame,
		currentPlayer,
		squareX,
		squareO
	}
})()


const checkWinner = ((squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return null
})
