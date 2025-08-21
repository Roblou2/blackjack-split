import {player} from "./game.js"

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
  } 
  
  else if (isFaceCard(firstCard) && isFaceCard(secondCard)) {
console.log(`Cards are equal in value (${firstCard} and ${secondCard})`);
  }
  
  else {
    console.log(`Cards are NOT equal (${firstCard} and ${secondCard})`);
    console.log(`isFaceCard(firstCard):", ${isFaceCard(firstCard)}, "isFaceCard(secondCard):", ${isFaceCard(secondCard)}`)
  }

}