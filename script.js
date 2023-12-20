//your JS code here. If required.
let currentPlayer = 1;
  let board = ['', '', '', '', '', '', '', '', ''];
  let players = ['', ''];

  function startGame() {
    players[0] = document.getElementById('player-1').value;
    players[1] = document.getElementById('player-2').value;

    document.getElementById('board').innerHTML = '';
    document.getElementById('message').innerHTML = '';

    for (let i = 1; i <= 9; i++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = i;
      cell.onclick = function() { playTurn(i); };
      document.getElementById('board').appendChild(cell);
    }

    updateMessage();
  }

  function playTurn(cellId) {
    if (!board[cellId - 1]) {
      board[cellId - 1] = currentPlayer === 1 ? 'X' : 'O';
      updateBoard();
      if (checkWin()) {
        document.getElementById('message').innerText = players[currentPlayer - 1] + ', congratulations you won!';
        currentPlayer = 0; // Disable further moves
      } else if (checkDraw()) {
        document.getElementById('message').innerText = 'It\'s a draw!';
        currentPlayer = 0; // Disable further moves
      } else {
        currentPlayer = 3 - currentPlayer; // Switch player (1 -> 2, 2 -> 1)
        updateMessage();
      }
    }
  }

  function updateBoard() {
    for (let i = 0; i < 9; i++) {
      document.getElementById(i + 1).innerText = board[i];
    }
  }

  function updateMessage() {
    document.getElementById('message').innerText = players[currentPlayer - 1] + ", you're up!";
  }

  function checkWin() {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
      if (
        (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) ||
        (board[i * 3] !== '' && board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2])
      ) {
        return true;
      }
    }

    if (
      (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
      (board[2] !== '' && board[2] === board[4] && board[2] === board[6])
    ) {
      return true;
    }

    return false;
  }

  function checkDraw() {
    return board.every(cell => cell !== '');
  }

  // function resetGame() {
  //   currentPlayer = 1;
  //   board = ['', '', '', '', '', '', '', '', ''];
  //   updateBoard();
  //   document.getElementById('message').innerText = '';
  // }