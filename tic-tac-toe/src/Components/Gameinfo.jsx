import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw } from 'lucide-react';

const gameinfo = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ player: 0, ai: 0, draw: 0 });

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: pattern };
      }
    }
    if (board.every(cell => cell !== null)) {
      return { winner: 'draw', line: [] };
    }
    return { winner: null, line: [] };
  };

  const minimax = (board, depth, isMaximizing, alpha, beta) => {
    const result = checkWinner(board);
    
    if (result.winner === 'O') return 10 - depth;
    if (result.winner === 'X') return depth - 10;
    if (result.winner === 'draw') return 0;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false, alpha, beta);
          board[i] = null;
          maxScore = Math.max(score, maxScore);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) break; // Alpha-Beta Pruning
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true, alpha, beta);
          board[i] = null;
          minScore = Math.min(score, minScore);
          beta = Math.min(beta, score);
          if (beta <= alpha) break; // Alpha-Beta Pruning
        }
      }
      return minScore;
    }
  };

  const getBestMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, 0, false, -Infinity, Infinity);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleCellClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const result = checkWinner(newBoard);
    if (result.winner) {
      handleGameEnd(result.winner, result.line);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const aiMove = getBestMove(newBoard);
        if (aiMove !== null) {
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          
          const result = checkWinner(newBoard);
          if (result.winner) {
            handleGameEnd(result.winner, result.line);
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner]);

  const handleGameEnd = (result, line) => {
    setWinner(result);
    setWinningLine(line);
    if (result === 'X') {
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (result === 'O') {
      setScores(prev => ({ ...prev, ai: prev.ai + 1 }));
    } else {
      setScores(prev => ({ ...prev, draw: prev.draw + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine([]);
  };

  const renderCell = (index) => {
    const value = board[index];
    const isWinningCell = winningLine.includes(index);

    return (
      <button
        key={index}
        onClick={() => handleCellClick(index)}
        className={`
          aspect-square bg-slate-800 rounded-xl flex items-center justify-center
          transition-all duration-300 hover:bg-slate-700 active:scale-95
          ${!value && isPlayerTurn && !winner ? 'cursor-pointer' : 'cursor-not-allowed'}
          ${isWinningCell ? 'bg-emerald-600 ring-4 ring-emerald-400' : ''}
        `}
        disabled={!!value || !!winner || !isPlayerTurn}
      >
        {value === 'X' && (
          <X className={`w-16 h-16 text-cyan-400 ${isWinningCell ? 'text-white' : ''}`} strokeWidth={3} />
        )}
        {value === 'O' && (
          <Circle className={`w-16 h-16 text-pink-400 ${isWinningCell ? 'text-white' : ''}`} strokeWidth={3} />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-yellow from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Tic-Tac-Toe</h1>
          <p className="text-slate-300">Unbeatable AI with Minimax</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{scores.player}</div>
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <X className="w-3 h-3" /> You
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-400">{scores.draw}</div>
              <div className="text-xs text-slate-400">Draws</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{scores.ai}</div>
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <Circle className="w-3 h-3" /> AI
              </div>
            </div>
          </div>

          {winner && (
            <div className="text-center mb-4 p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">
                {winner === 'draw' ? "It's a Draw!" : winner === 'X' ? '🎉 You Win!' : '🤖 AI Wins!'}
              </div>
              <div className="text-sm text-slate-300">
                {winner === 'draw' ? 'Well played!' : winner === 'X' ? 'Amazing! You beat the AI!' : 'Better luck next time!'}
              </div>
            </div>
          )}

          {!winner && (
            <div className="text-center mb-4 p-3 bg-slate-700 rounded-lg">
              <div className="text-lg font-semibold text-white">
                {isPlayerTurn ? 'Your Turn' : 'AI is thinking...'}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            {board.map((_, index) => renderCell(index))}
          </div>
        </div>

        <button
          onClick={resetGame}
          className="w-full  from-cyan-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl
                     hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2
                     shadow-lg hover:shadow-xl active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          New Game
        </button>

        <div className="mt-6 text-center text-slate-400 text-sm">
          <p>Algorithm: Minimax with Alpha-Beta Pruning</p>
        </div>
      </div>
    </div>
  );
};

export default gameinfo;