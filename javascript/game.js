import { createDeck, drawCard } from "./deck.js"
import {gamePlay} from "./gameplay.js"
import {createPlayer} from "./player.js"
import {moneyManager} from "./money.js"
import {playerTotal} from "./player.js"
import {splitCheck} from "./split.js"

export let gameOver = false
//*****DOM ELEMENTS:******
//hit button
const hit = document.body.querySelector("button.hit")
const playerUp = document.body.querySelector("button.active-player-up")
const playerDown = document.body.querySelector("button.active-player-down")



//stay button
const stay = document.body.querySelector("button.stay")

//new game button
const newGame = document.body.querySelector("button.new")



export const getGameState = () => gameOver
export const setGameState = (val) => {gameOver = val}

//active player var for deciding which player object functions should target
let activePlayer = 0

export const getActivePlayer = () => activePlayer
export const setActivePlayer = () => {
  activePlayer++

  //each time the hand changes to next one, reset number of cards on UI//
  setDisplayedPlayerCards(2)
}

playerUp.addEventListener('click', () => {
  activePlayer++
  console.log(activePlayer)
})

playerDown.addEventListener('click', () => {
  activePlayer--
  console.log(activePlayer)
})
//define var for number of hands on board//


export const getNumHands = () => players.length


//define players array
export let players = []

//comp total
export const compTotal = document.body.querySelector('.comp-total')





//define a function to make a hand for the start of the game
const makeHand = () => {
    return {
        cardOne: drawCard(),
        cardTwo: drawCard(),
    };
};


//tracking for number of displayed player cards on board
let displayedPlayerCards = 2

export const getDisplayedPlayerCards = () => displayedPlayerCards
export const setDisplayedPlayerCards = (val) => {displayedPlayerCards = val}


//**GAME START **/

// Make deck of cards//
createDeck() 
//make human player and get player's total from hand//
export const player = createPlayer("Rob", makeHand()); 

//increase number of hands on board by 1//

//push to players array
players.push(player)
players[activePlayer].isSplit()


//Make computer player//
export const computer = createPlayer("Computer", makeHand());

//loop through players array in case of split hands and play each one in turn//



hit.addEventListener('click', () => {

  //for only 1 hand and no split ones
  if (getNumHands() == 1) {
    
    players[activePlayer].hit()
//add players card to board

const playerCards = document.body.querySelector(".player-cards")

//loop through player hand and set i = displayedplayercards
for (let i = displayedPlayerCards; i < players[activePlayer].getHand().length; i++) {
   
    const newCard = document.createElement("img")
    
    newCard.src = `../images/cards/${players[activePlayer].getHand()[i]}.jpg`
  
        playerCards.appendChild(newCard)
    
}

  // Update the count of displayed player cards
  displayedPlayerCards = players[activePlayer].getHand().length;
  }

  else if (getNumHands() > 1) {
    players[activePlayer].hit()
    console.log("Updating UI...")
    const splitPlayerCards = document.body.querySelector(".split-player-hands")
    //get all hands under parent //
    const hands = splitPlayerCards.querySelectorAll(":scope > div") 


    for (let i = displayedPlayerCards; i < players[activePlayer].getHand().length; i++) {
   
      // define which div in split-player-hands to add card img to//
      const target = hands[activePlayer]

      const newCard = document.createElement("img")
      
      newCard.src = `../images/cards/${players[activePlayer].getHand()[i]}.jpg`
    
         target.appendChild(newCard)
      
  }
  
    // Update the count of displayed player cards
    displayedPlayerCards = players[activePlayer].getHand().length;

    // now check if hands has bust:
if (players[activePlayer].getHandDone()) {
  console.log(`Hand ${activePlayer} has busted, or has blackjack.
     Moving to next hand...`)
  if (activePlayer < players.length - 1) {
    //**This must be called to reset displayedPlayerCards*: */
      setActivePlayer()
  } else if (activePlayer == players.length - 1) {
    console.log("Last hand reached")
    //**do not call setActivePlayer if it's last hand in players array **/
      // all hands finished.Could call gamePlay here
  }
}

  }

})




//button function calls

stay.addEventListener('click', () => {
    //for only 1 hand and no split ones
    if (getNumHands() == 1) {
  gamePlay()
    }

    //*when there are split hands*://

    else if (getNumHands() > 1) {
//check activePlayer is not last player in players array and set hand to done//

//if last player in array://
if (activePlayer == players.length - 1) {
  players[activePlayer].setHandDone()
  console.log("Last hand reached")
  //**do not call setActivePlayer if it's last hand in players array **/
    // all hands finished.Could call gamePlay here
    }

    //when not last player in array set hand to done:
    else if (activePlayer < players.length -1)
      console.log(`Player ${activePlayer} has decided to stay. Moving to
    next player...`)
      players[activePlayer].setHandDone()

    //switch to next player and reset displayedPlayerCards for UI
    setActivePlayer()
  }
})


const restart = () => {
    return location.reload()
}

newGame.addEventListener('click', restart)



 
  

//player img elements
const playerCardOne = document.body.querySelector(".player-cards img")
const playerCardTwo =  document.body.querySelector("img.player-card-two")


playerCardOne.src=`../images/cards/${player.getFirstCard()}.jpg`
playerCardTwo.src=`../images/cards/${player.getSecondCard()}.jpg`


//comp img elements

const compCardOne = document.body.querySelector(".computer-cards img")
const compCardTwo =  document.body.querySelector("img.computer-card-two")

compCardOne.src=`../images/cards/${computer.getFirstCard()}.jpg`
compCardTwo.src=`../images/cards/cards-backs/Red_back.jpg`


//inititalise player total on board
  playerTotal.textContent=`Total: ${player.getTotal()}`


  document.addEventListener('DOMContentLoaded', () => {
    moneyManager.display();

  });