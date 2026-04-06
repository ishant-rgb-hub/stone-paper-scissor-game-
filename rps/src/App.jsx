import { useState } from 'react'
import './App.css'

function App() {
  const [userMove, setUserMove] = useState('')
  const [compMove, setCompMove] = useState('')
  const [result, setResult] = useState('')
  const [count, setCount] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [compScore, setCompScore] = useState(0)
  const [history, setHistory] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [gameMode, setGameMode] = useState(null) 
  const [gameStarted, setGameStarted] = useState(false)

  const choices = ['Rock', 'Paper', 'Scissor']
  const emoji = { Rock: '🗿', Paper: '📄', Scissor: '✂️' }

  function decideWinner(u, c) {
    if (u === c) return 'Tie'
    if (
      (u === 'Rock' && c === 'Scissor') ||
      (u === 'Scissor' && c === 'Paper') ||
      (u === 'Paper' && c === 'Rock')
    ) {
      return 'You win'
    }
    return 'Computer wins'
  }

  function handleClick(move) {
    if (!gameStarted || userScore >= Math.ceil(gameMode/2) || compScore >= Math.ceil(gameMode/2) || showResult) return
    const comp = choices[Math.floor(Math.random() * choices.length)]
    const gameResult = decideWinner(move, comp)
    setUserMove(move)
    setCompMove(comp)
    setResult(gameResult)
    setShowResult(true)
    setCount(prev => prev + 1)
    if (gameResult === 'You win') setUserScore(prev => prev + 1)
    else if (gameResult === 'Computer wins') setCompScore(prev => prev + 1)
    setHistory(prev => [
      `${move} vs ${comp} → ${gameResult}`,
      ...prev.slice(0, 4)
    ])
    if ((gameResult === 'You win' && userScore + 1 === Math.ceil(gameMode/2)) || (gameResult === 'Computer wins' && compScore + 1 === Math.ceil(gameMode/2))) {
      setTimeout(() => setShowConfetti(true), 600)
    }
    // Automatically proceed to next round after short delay if not game over
    setTimeout(() => {
      setShowResult(false)
      setUserMove('')
      setCompMove('')
      setResult('')
    }, 1200)
  }

  function resetGame() {
    setUserMove('')
    setCompMove('')
    setResult('')
    setCount(0)
    setUserScore(0)
    setCompScore(0)
    setHistory([])
    setShowResult(false)
    setShowConfetti(false)
    setGameStarted(false)
    setGameMode(null)
  }

  function startGame(mode) {
    setGameMode(mode)
    setGameStarted(true)
    setUserMove('')
    setCompMove('')
    setResult('')
    setCount(0)
    setUserScore(0)
    setCompScore(0)
    setHistory([])
    setShowResult(false)
    setShowConfetti(false)
  }

  const winScore = gameMode ? Math.ceil(gameMode/2) : 0
  const gameOver = userScore >= winScore || compScore >= winScore
  const winner = userScore >= winScore ? 'You' : compScore >= winScore ? 'Computer' : null

  if (!gameStarted) {
    return (
      <div className="container">
        <h1>🪨 Rock Paper Scissors ✂️</h1>
        <h2>Choose Match Type</h2>
        <div className="mode-buttons">
          <button onClick={() => startGame(3)}>Best of 3</button>
          <button onClick={() => startGame(5)}>Best of 5</button>
          <button onClick={() => startGame(7)}>Best of 7</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>🪨 Rock Paper Scissors ✂️</h1>
      <h2>Round {count + (showResult ? 0 : 1)} / {gameMode}</h2>
      {showConfetti && (
        <div className="confetti">🎉🎊✨</div>
      )}
      {gameOver && (
        <div className="winner-area">
          <button className="winner-button" onClick={resetGame}>
            🏆 {winner} won the match — Play Again
          </button>
        </div>
      )}
      <div className="scoreboard">
        <p>You: {userScore}</p>
        <p>Computer: {compScore}</p>
      </div>
      <div className="moves">
        <div className={`move-card ${showResult && result === 'Computer wins' ? 'highlight' : ''}`}> 
          <h3>Computer</h3>
          <p className="move-emoji">{emoji[compMove] || '—'} {compMove || '—'}</p>
        </div>
        <div className={`move-card ${showResult && result === 'You win' ? 'highlight' : ''}`}> 
          <h3>You</h3>
          <p className="move-emoji">{emoji[userMove] || '—'} {userMove || '—'}</p>
        </div>
      </div>
      <h2 className={`result ${result === 'Tie' ? 'tie' : ''}`}>{showResult && result}</h2>
      <div className="buttons">
        {choices.map(choice => (
          <button key={choice} onClick={() => handleClick(choice)} disabled={gameOver || showResult}>
            {emoji[choice]} {choice}
          </button>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset Game</button>
      <div className="history">
        <h3>Last 5 Rounds</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
