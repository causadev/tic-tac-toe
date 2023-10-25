const Player = (mark) => {
  return {
    mark
  }
}

const gameBoard = (() => {
  const board = Array(9).fill(null)
  const cells = document.querySelectorAll(".cell")
  const gameStatus = document.querySelector(".gameStatus")
  const restartBtn = document.querySelector(".restart")
  const playAgainBtn = document.querySelector(".play");
  const squareX = document.querySelector(".squareX");
  const squareO = document.querySelector(".squareO")
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector("#overlay")
  let currentPlayer = Player("x")
  let gameActive = true

  const playAgain = () => {
    restartGame()
  }

  const changePlayer = () => {
    currentPlayer.mark = currentPlayer.mark === "x" ? "o" : "x"
  }

  const renderMark = (cell, index) => {
    board[index] = currentPlayer.mark
    cell.textContent = currentPlayer.mark
  }

  const openModal = () => {
    modal.classList.add("active")
    overlay.classList.add("active")
  }
  const closeModal = () => {
    modal.classList.remove("active")
    overlay.classList.remove("active")
  }

  cells.forEach((cell, index) => cell.addEventListener("click", () => {
    if (board[index] !== null || !gameActive) return
    renderMark(cell, index)
    const winner = checkWinner(board);
    if (winner) {
      openModal()
      gameStatus.textContent = `${winner} winner🎉`
      gameActive = false
      playAgainBtn.addEventListener("click", playAgain)
    } else if (!board.includes(null)) {
      openModal()
      playAgainBtn.addEventListener("click", playAgain)
      gameStatus.textContent = `draw 😴`
      gameActive = false
    } else {
      changePlayer()
      activePlayer()
    }
  }))


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


  const checkWinner = (squares) => {
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
  }




  const restartGame = () => {
    board.fill(null)
    cells.forEach((cell) => cell.textContent = "")
    gameStatus.textContent = ""
    gameActive = true
    currentPlayer.mark = "x"
    closeModal()
  }
  restartBtn.addEventListener("click", restartGame)



})();
