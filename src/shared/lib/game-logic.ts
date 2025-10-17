import type { GameBoard, CellValue, Position } from '../types';

// Проверка на выигрыш
export const checkWinner = (board: GameBoard): CellValue => {
  // Проверка строк
  for (let row = 0; row < 3; row++) {
    if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      return board[row][0];
    }
  }

  // Проверка столбцов
  for (let col = 0; col < 3; col++) {
    if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      return board[0][col];
    }
  }

  // Проверка диагоналей
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }

  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }

  return null;
};

// Проверка на ничью
export const isBoardFull = (board: GameBoard): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

// Получение всех доступных ходов
export const getAvailableMoves = (board: GameBoard): Position[] => {
  const moves: Position[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        moves.push({ row, col });
      }
    }
  }
  return moves;
};

// Алгоритм минимакс для оптимальной игры бота
export const minimax = (
  board: GameBoard, 
  depth: number, 
  isMaximizing: boolean, 
  player: CellValue, 
  opponent: CellValue
): number => {
  const winner = checkWinner(board);
  
  if (winner === player) {
    return 10 - depth; // Бот выигрывает
  }
  if (winner === opponent) {
    return depth - 10; // Игрок выигрывает
  }
  if (isBoardFull(board)) {
    return 0; // Ничья
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    const moves = getAvailableMoves(board);
    
    for (const move of moves) {
      const newBoard = board.map(row => [...row]);
      newBoard[move.row][move.col] = player;
      const score = minimax(newBoard, depth + 1, false, player, opponent);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    const moves = getAvailableMoves(board);
    
    for (const move of moves) {
      const newBoard = board.map(row => [...row]);
      newBoard[move.row][move.col] = opponent;
      const score = minimax(newBoard, depth + 1, true, player, opponent);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
};

// Получение лучшего хода для бота
export const getBestMove = (board: GameBoard, botPlayer: CellValue): Position => {
  const player = botPlayer === 'X' ? 'O' : 'X';
  const moves = getAvailableMoves(board);
  
  if (moves.length === 0) {
    throw new Error('Нет доступных ходов');
  }

  let bestMove = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const newBoard = board.map(row => [...row]);
    newBoard[move.row][move.col] = botPlayer;
    const score = minimax(newBoard, 0, false, botPlayer, player);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

// Простая логика бота (легкий уровень)
export const getEasyBotMove = (board: GameBoard): Position => {
  const moves = getAvailableMoves(board);
  
  if (moves.length === 0) {
    throw new Error('Нет доступных ходов');
  }

  // 70% шанс на случайный ход, 30% на оптимальный
  if (Math.random() < 0.7) {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  } else {
    return getBestMove(board, 'O');
  }
};

// Средний уровень бота
export const getMediumBotMove = (board: GameBoard): Position => {
  const moves = getAvailableMoves(board);
  
  if (moves.length === 0) {
    throw new Error('Нет доступных ходов');
  }

  // 30% шанс на случайный ход, 70% на оптимальный
  if (Math.random() < 0.3) {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  } else {
    return getBestMove(board, 'O');
  }
};
