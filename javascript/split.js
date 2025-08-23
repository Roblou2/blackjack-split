import {player, players } from "./game.js"
import { drawCard } from "./deck.js"
import { createPlayer } from "./player.js"


//split button
const split = document.body.querySelector('button.split')

//check if split is possible

export const splitCheck = () => {

let firstCard = player.getFirstCard().split(" ")[0] 
let secondCard = player.getSecondCard().split(" ")[0]

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
 let secondCard = player.removeCard(1)

  //create new player, push to players array and assign split hand//
const secondHand = createPlayer("hand two")
players.push(secondHand)
secondHand.getHand().push(secondCard) //pushes spliced hand from player to secondHand
//now draw another card for secondHand
let newCard = drawCard()
secondHand.getHand().push(newCard)

console.log(players[0].getHand(), players[1].getHand())
//Now add both hands to UI//


})