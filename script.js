document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');
    let currentPlayer = 'X';
    let currentPlayerName = player1;
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        let winningCombination = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningCombination = winCondition;
                break;
            }
        }

        if (roundWon) {
            statusText.innerHTML = `${currentPlayerName} (${currentPlayer}) has won!`;
            isGameActive = false;
            winningCombination.forEach(index => {
                cells[index].classList.add('winning-cell');
            });
            return;
        }

        if (!board.includes('')) {
            statusText.innerHTML = 'Game ended in a draw!';
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerName = currentPlayer === 'X' ? player1 : player2;
        statusText.innerHTML = `It's ${currentPlayerName} (${currentPlayer})'s turn`;
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;

        handleResultValidation();
    };

    const handleRestartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        currentPlayerName = player1;
        statusText.innerHTML = `It's ${currentPlayerName} (${currentPlayer})'s turn`;
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('winning-cell');
        });
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleRestartGame);

    statusText.innerHTML = `It's ${currentPlayerName} (${currentPlayer})'s turn`;
});
