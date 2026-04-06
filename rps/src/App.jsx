// ...existing code...
import { use, useState } from 'react'

function App() {
  const [userMove, setUserMove] = useState('')
  const [compMove, setCompMove] = useState('')
  const [result, setResult] = useState('')
  const [Count,setCount] = useState(0)

  const choices = ['Rock', 'Paper', 'Scissor']
  const emoji = { Rock: '🗿', Paper: '📄', Scissor: '✂️' }

  function decideWinner(u, c) {
    if (!u || !c) return ''
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
    setUserMove(move)
    const comp = choices[Math.floor(Math.random() * choices.length)]
    setCompMove(comp)
    setCount(Count+1)
    setResult(decideWinner(move, comp))
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: 24 }}>
      <h1>Computer : You</h1>
      <h2 onClick = {handleClick}>{Count}</h2>

      <div style={{ fontSize: 18, marginBottom: 8 }}>
        <strong>Computer:</strong> {emoji[compMove] || '—'} {compMove || '—'}
        <span style={{ marginLeft: 16 }} />
        <strong>You:</strong> {emoji[userMove] || '—'} {userMove || '—'}
      </div>

      <div style={{ marginBottom: 12, fontWeight: 'bold' }}>{result}</div>

      <div>
        <button onClick={() => handleClick('Rock')} style={{ fontSize: 18, padding: '8px 12px', marginRight: 8 }}>🗿 Rock</button>
        <button onClick={() => handleClick('Paper')} style={{ fontSize: 18, padding: '8px 12px', marginRight: 8 }}>📄 Paper</button>
        <button onClick={() => handleClick('Scissor')} style={{ fontSize: 18, padding: '8px 12px' }}>✂️ Scissor</button>
      </div>
    </div>
  )
}

export default App

