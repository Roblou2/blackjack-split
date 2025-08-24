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

//stay button
const stay = document.body.querySelector("button.stay")

//new game button
const newGame = document.body.querySelector("button.new")



export const getGameState = () => gameOver
export const setGameState = (val) => {gameOver = val}

//active player var for deciding which player object functions should target
let activePlayer = 0

export const getActivePlayer = () => activePlayer
export const setActivePlayer = () => activePlayer++

//number of splits var to monitor how many times player has split (max of 4 hands)//
let splitNumber = 0

export const getsplitNumber = () => splitNumber
export const setSplitNumber = () => splitNumber++

//define var for number of hands on board//

let handsAmount = 0

export const getHandsOnBoard = () => handsAmount
export const setHandsOnBoard = () => handsAmount++

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
//push to players array
players.push(player)
players[activePlayer].isSplit()


//Make computer player//
export const computer = createPlayer("Computer", makeHand());

//loop through players array in case of split hands and play each one in turn//
export const playersLoop = () => {
  if (getsplitNumber() == 0) {
    return players[getActivePlayer()].isSplit() //game proceeds as normal //
  }

  else if (getsplitNumber() > 0) { //if a split happened //

    for (let i = getActivePlayer(); i < players.length; i++) {
      //is another split possible?//
if (players[getActivePlayer()].splitCheck()) {

}
    }
  }
}

hit.addEventListener('click', () => {
    players[activePlayer].hit()
//add players card to board

const playerCards = document.body.querySelector(".player-cards")

//loop through player hand and set i = displayedplayercards
for (let i = displayedPlayerCards; i < player.getHand().length; i++) {
   
    const newCard = document.createElement("img")
    
    newCard.src = `../images/cards/${player.getHand()[i]}.jpg`
  
        playerCards.appendChild(newCard)
    
}

  // Update the count of displayed player cards
  displayedPlayerCards = player.getHand().length;


})




//button function calls

stay.addEventListener('click', gamePlay)


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