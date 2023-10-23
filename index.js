const turns = {
  X: "×",
  O: "o"
}


const user = (name) => {
  const userName = "@" + name
  return { name, userName }
}


const gameBoard = (() => {
  let running = true;
  let currentPlayer = turns.X
  let board = ["", "", "", "", "", "", "", "", ""];
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector("#overlay")
  const form = document.querySelector("form")
  const input = document.querySelector("input");
  const name = document.querySelector("p")

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    name.textContent = `Name: ${input.value}`
  })
  const openModal = () => {
    modal.classList.add("active")
    overlay.classList.add("active")
  }



  const closeModal = () => {
    modal.classList.remove("active")
    overlay.classList.remove("active")
  }

  const renderBoard = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.addEventListener("click", handleCellClicked));
    const restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", restartGame)
  };


  function handleCellClicked() {
    const cellClicked = this.getAttribute("data-cell");

    if (board[cellClicked] !== "" || !running) {
      return
    }

    renderMark(this, cellClicked)
    chekWinner()
  }


  const renderMark = (cell, index) => {
    board[index] = currentPlayer
    cell.textContent = currentPlayer
    activePlayer();
  }


  const changePlayer = () => {
    currentPlayer = currentPlayer === turns.X ? turns.O : turns.X
  }

  const activePlayer = () => {
    const squareX = document.querySelector(".squareX");
    const squareO = document.querySelector(".squareO");


    if (currentPlayer === turns.X) {
      squareX.style.background = "#776e62"
      squareO.style.background = "#181a1b"
      squareX.style.transition = "all 0.2s ease-in-out";
    } else if (currentPlayer === turns.O) {
      squareO.style.background = "#776e62"
      squareX.style.background = "#181a1b"
      squareO.style.transition = "all 0.2s ease-in-out";
    }
  }




  const restartGame = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.textContent = "")
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = turns.X
    closeModal()
  }




  const chekWinner = () => {
    const gameStatus = document.querySelector(".gameStatus")
    const playAgainBtn = document.querySelector(".play")
    let roundWon = false
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < winCombos.length; i++) {
      const condition = winCombos[i];
      const cellA = board[condition[0]];
      const cellB = board[condition[1]];
      const cellC = board[condition[2]];

      if (cellA == "" || cellB == "" || cellC == "") {
        continue;
      }
      if (cellA == cellB && cellB == cellC) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      gameStatus.textContent = `${input.value} winner: ${currentPlayer} 🏆`
      openModal()
      playAgainBtn.addEventListener("click", () => {
        restartGame()
        closeModal()
      })
    } else if (!board.includes("")) {
      gameStatus.textContent = `draw`
      openModal()
      playAgainBtn.addEventListener("click", () => {
        restartGame()
        closeModal()
      })
    } else {
      changePlayer()
    }
  }


  renderBoard()

})();


