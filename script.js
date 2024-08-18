const cells = document.querySelectorAll('.cell');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'O'; // 플레이어는 'O', AI는 'X'
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', () => playerMove(cell));
});

function playerMove(cell) {
    const index = cell.getAttribute('data-index');
    
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    updateCell(cell, currentPlayer);

    const winner = currentPlayer; // 현재 플레이어를 저장

    checkResult(winner);

    if (gameActive) {
        currentPlayer = 'X';
        setTimeout(aiMove, 500); // AI의 움직임을 살짝 지연시킴
    }
}

function aiMove() {
    let bestMove = findBestMove();
    if (bestMove !== -1) {
        board[bestMove] = currentPlayer;
        const aiCell = document.querySelector(`[data-index='${bestMove}']`);
        updateCell(aiCell, currentPlayer);

        const winner = currentPlayer; // 현재 플레이어를 저장

        checkResult(winner);
        currentPlayer = 'O';
    }
}

function findBestMove() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = currentPlayer;
            if (checkWin(currentPlayer)) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWin('O')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') return i;
    }

    return -1; // 더 이상 빈 칸이 없음
}

function updateCell(cell, player) {
    cell.classList.add(player.toLowerCase());
    cell.innerHTML = `<span>${player}</span>`;
}

function checkResult(winner) {
    if (checkWin(winner)) {
        setTimeout(() => {
            alert(`${winner}가 승리했습니다! 게임을 다시 시작합니다.`);
            resetGame();
        }, 100); // X 또는 O가 그려진 후 확인
    } else if (!board.includes('')) {
        setTimeout(() => {
            alert('공간이 없습니다. 게임을 다시 시작합니다.');
            resetGame();
        }, 100);
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function resetGame() {
    board.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    currentPlayer = 'O';
    gameActive = true;
}
