import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [values, setValues] = useState(Array(9).fill(null))
  const [currentVal, setCurrentVal] = useState('X')
  const [disabled, setDisabled] = useState(Array(9).fill(false))
  const [winMessage, setWinMessage] = useState(null)
  const [history, setHistory] = useState([])

  const LOCAL_STORAGE_KEY = 'TicTacToeApp.history'

  useEffect(() => {
    // Obtains history of saved games
    const wins = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (wins)
    {
      setHistory(wins)
    }
  }, [])

  useEffect(() => {
    // Checks winner of game
    const newDisabled = [...disabled]

    const winner = checkWinner()

    if (winner)
    {
      if (winner === 'O' || winner === 'X')
      {
        setWinMessage(winner + ' Wins!')
        setHistory(prevHistory => {
          return [...prevHistory, winner + ' win']
        })
      }
      else
      {
        setWinMessage('Tie!')
        setHistory(prevHistory => {
          return [...prevHistory,'Tie']
        })
      }

      newDisabled.fill(true)
      setDisabled(newDisabled)
    }
  }, [values])

  useEffect(() => {
    // Saves game history
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history))

  }, [history])


  function handleClick(i) {
    const newValues = [...values]
    const newDisabled = [...disabled]

    // Sets clicked square
    newValues[i] = currentVal
    setValues(newValues)

    // Disables clicked square
    newDisabled[i] = true
    setDisabled(newDisabled)

    // Toggles X and O value
    if (currentVal === 'X') 
      {setCurrentVal('O')}
    else
      {(setCurrentVal('X'))}
  }

  function checkWinner() {
    const winPattern = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < winPattern.length; i++)
    {
      const [index1, index2, index3] = winPattern[i]

      if (values[index1] === values[index2] && values[index2] === values[index3] && values[index1] != null)
      {
        return values[index1]
      }
    }

   // Check if there's a tie
    if (values[0] != null && values[1] != null && values[2] != null && values[3] != null && values[4] != null && values[5] != null && values[6] != null && values[7] != null && values[8] != null)
    {
      return 'T'
    }

    return null;
  }

  function handleRestart() {
    /* Restarts the game by resetting each square */
    const newValues = [...values]
    const newDisabled = [...disabled]

    newValues.fill(null)
    newDisabled.fill(false)

    setValues(newValues)
    setDisabled(newDisabled)

    setCurrentVal('X')
    setWinMessage(null)
  }

  function handleHistoryReset() {
    setHistory([])
  }

  return (
    <div className="App">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="board">
        <button className="square" onClick={() => handleClick(0)} disabled={disabled[0]}>{values[0]}</button>
        <button className="square" onClick={() => handleClick(1)} disabled={disabled[1]}>{values[1]}</button>
        <button className="square" onClick={() => handleClick(2)} disabled={disabled[2]}>{values[2]}</button>

        <button className="square" onClick={() => handleClick(3)} disabled={disabled[3]}>{values[3]}</button>
        <button className="square" onClick={() => handleClick(4)} disabled={disabled[4]}>{values[4]}</button>
        <button className="square" onClick={() => handleClick(5)} disabled={disabled[5]}>{values[5]}</button>

        <button className="square" onClick={() => handleClick(6)} disabled={disabled[6]}>{values[6]}</button>
        <button className="square" onClick={() => handleClick(7)} disabled={disabled[7]}>{values[7]}</button>
        <button className="square" onClick={() => handleClick(8)} disabled={disabled[8]}>{values[8]}</button>
      </div>

      <h1>{winMessage}</h1>

      <button className="restart reset" onClick={handleRestart}>Restart Game</button>

      <h1>Next Player: {currentVal}</h1>

      <div className="history-container">
        <h2>Game History</h2>
        <div className="history">
          {history.map(game => {
            return <h3>{game}</h3>
          })}
        </div>
        <button className="reset" onClick={handleHistoryReset}>Clear History</button>
      </div>
    </div>
  );
}

export default App;
