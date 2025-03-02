import { useState, useEffect, useRef } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti'
import{ useWindowSize } from 'react-use'

function App() {

  //Dice array of objects, each die is an object with value, isHeld and id property
  //Check if all dice are held and have the same value (gameWon)
  //Optional width and height attributes for Confette drop to make it responsive, imported useWindowSize hook from react-use and installed it
  
  const [dice, setDice] = useState(() => generateAllNewDice())                                  // lazy state initialization here: () => generateAllNewDice()
  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)
  const { width, height } = useWindowSize()
  const [shake, setShake] = useState(false)

  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [rollsNumber, setRollsNumber] = useState(0)
  

  useEffect(() => {

    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  } , [isActive]
  )

  useEffect(() => {
    setIsActive(true)
  }, [])

//Generates Array with 10 items, fills it with throwaway value 0 and then maps over it to replace it with obj
  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => {
        return (
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      )
      })
  }

//Roll Dice/New Game button depending on the bolean value of gameWon
  function rollDice() {
    setShake(prevShake => !prevShake)
    setTimeout(() => setShake(false), 500);
    if (!gameWon) {
      setRollsNumber(prevNumber => prevNumber + 1)
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      }))
    }
    else {
      setDice(generateAllNewDice())
      setIsActive(true)
      setSeconds(0)
      setRollsNumber(0)
    } 

    /*if (dice.every(die => die.isHeld === false)) {
      setIsActive(true)
      setSeconds(0)
    }*/
  }
  

//Hold die function that's being passed down to Die component as prop (for the sake of having one source of truth between parent and child componenent)
  function hold(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }


//Using this variable to render Die components
  const diceElements = dice.map(die => 
  <Die 
    key={die.id} 
    id={die.id} 
    value={die.value} 
    isHeld={die.isHeld} 
    hold={hold}
    shake={shake}
  />
)

//accessing the DOM node with useRef, refs allow us to save values between render cycles without triggering a rerender itself
  const buttonRef = useRef(null)

//useEffect is needed in this case because we're reacting to a state change (gameWon) and because DOM is an external system, it runs at the end when the DOM is fully rendered
  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
      setIsActive(false)
    }
  }, [gameWon])


  //div with className='sr-only' is for screenreader only, it doesn't display on the page. It's an aria-live region.

  return (
    <main>
      {gameWon ? <ReactConfetti width={width} height={height} /> : null}
      <div aria-live='polite' className='sr-only'>
        {gameWon ? <p>Congratulations! You won! Press "New Game" to start again.</p> : null}
      </div>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button ref={buttonRef} onClick={rollDice} className='roll'>{gameWon ? "New Game" : "Roll"}</button>
      {gameWon ? <div className='congratz-msg'>Congratulations! You won in {seconds} seconds and {rollsNumber} rolls. 🏆</div> : <div className='timer'>Timer: {seconds} Seconds</div>}
    </main>
  )
}

export default App
