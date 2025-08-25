import {players, getActivePlayer, 
  setActivePlayer, getNumHands } from "./game.js"
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

  //create new player, push to players array //
const newHand = createPlayer(`hand${getNumHands()}`)


players.push(newHand)
newHand.getHand().push(secondCard) //pushes spliced hand from player[activePlayer] 
// to secondHand
//now draw another card for secondHand
let newCard = drawCard()
newHand.getHand().push(newCard)


//Now add split hands to UI//
getNumHands()

splitUI.setAttribute('style', 'display: flex;')

//firstly, remove hands from UI that are not done because their UI needs updating
// to reflect new hand just made for them//
//start at activePlayer as all hands will be done up to here://

if (getNumHands() > 2) {

  const handDivs = document.querySelectorAll('.split-player-hands div')

for (let x = getActivePlayer(); x < players.length; x++) {


  //scenario: when hand[getActivePlayer()] = 0 in array can be split and no hands are done//
  if (!players[getActivePlayer()].getHandDone() && getActivePlayer() == 0) {

handDivs.forEach(div => {
  // grab the dataset value
div.remove()
  
  })
}

//scenario: when hand[getActivePlayer()] != 0, remove hand that is active
else if (!players[getActivePlayer()].getHandDone() && getActivePlayer() > 0 && getNumHands() < 5) {

  handDivs.forEach(div => {
   const toRemove = players[getActivePlayer()].getHandIndex()
   console.log(toRemove)
    const handIndex = div.dataset.hand;   // string
    const handIndexNum = parseInt(handIndex, 10);
    console.log(handIndexNum)
    if (handIndexNum == toRemove) {
    
      div.remove()
    }
    })
}

}
}


for (let i = getActivePlayer(); i < players.length; i++) {

  const div = document.createElement('div')
  div.dataset.hand = i
  for (let z = 0; z < players[i].getHand().length; z++) {
players[i].setHandIndex(i) //set hand index in this hand to same as its div
    const newCard = document.createElement("img")
    newCard.src = `../images/cards/${players[i].getHand()[z]}.jpg`
    div.appendChild(newCard)
    splitUI.appendChild(div)
   
  }

}

})