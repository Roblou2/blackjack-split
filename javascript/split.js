import {players, getActivePlayer, 
  setActivePlayer, getsplitNumber, setSplitNumber, getHandsOnBoard, 
  setHandsOnBoard } from "./game.js"
import { drawCard } from "./deck.js"
import { createPlayer } from "./player.js"


//split button
const split = document.body.querySelector('button.split')
const splitUI = document.body.querySelector('.split-player-hands')

//check if split is possible

export const splitCheck = () => {

let firstCard = players[getActivePlayer()].getFirstCard().split(" ")[0] 
let secondCard = players[getActivePlayer()].getSecondCard().split(" ")[0]

 const isFaceCard = (card) => {
    switch (card) {
      case "jack":
      case "queen":
      case "king":
        return true;
      default:
        return false;
    }
  };

  if (firstCard === secondCard) {
    console.log(`Cards are equal in value (${firstCard} and ${secondCard})`)
    split.style.display = "inline-block"
    return true
  } 
  
  else if (isFaceCard(firstCard) && isFaceCard(secondCard)) {
console.log(`Cards are equal in value (${firstCard} and ${secondCard})`);
 split.style.display = "inline-block"
 return true
  }
  
  else {
    console.log(`Cards are NOT equal (${firstCard} and ${secondCard})`);
    console.log(`isFaceCard(firstCard):", ${isFaceCard(firstCard)}, "isFaceCard(secondCard):", ${isFaceCard(secondCard)}`)
    return false
  }

}



split.addEventListener('click', () => {

  //remove player-cards form UI//
  const playerCards = document.body.querySelector(".player-cards")
  playerCards.style.display = "none"

  //remove 2nd card in player hand and store as var for new player//
  //then draw a new card for player and create 2nd player
 let secondCard = players[getActivePlayer()].removeCard(1)

  //create new player, push to players array and assign split hand//
const newHand = createPlayer(`hand${getsplitNumber()}`)
setSplitNumber() //increase split number for next split button event call
setHandsOnBoard()
players.push(newHand)
newHand.getHand().push(secondCard) //pushes spliced hand from player[activePlayer] 
// to secondHand
//now draw another card for secondHand
let newCard = drawCard()
newHand.getHand().push(newCard)


//Now add both hands to UI//
splitUI.setAttribute('style', 'display: flex;')

for (let i = getActivePlayer(); i <= players.length -1; i++) {
  const div = document.createElement('div')
  for (let z = 0; z < players[i].getHand().length; z++) {

    const newCard = document.createElement("img")
    newCard.src = `../images/cards/${players[i].getHand()[z]}.jpg`
    div.appendChild(newCard)
    splitUI.appendChild(div)
  }

}


})