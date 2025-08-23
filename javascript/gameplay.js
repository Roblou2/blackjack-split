import {computer, player, compTotal} from "./game.js"
import {moneyManager} from "./money.js"
import { getGameState } from "./game.js"

//tracking for number of displayed comp cards on board
let displayedCompCards = 2

//logic for after human player clicks stay//
export const gamePlay = () => {
    
if (getGameState() === true ) return

    //disable buttons
    const stay = document.body.querySelector("button.stay")
    stay.disabled = true 

    const hit = document.body.querySelector("button.hit")
    hit.disabled = true

    console.log(`${player.getPlayerName()} has decided to stay`)

    
const compCardTwo =  document.body.querySelector("img.computer-card-two")

setTimeout(() => {
    compCardTwo.src = `../images/cards/${computer.getSecondCard()}.jpg`;

//get computer's total from its hand and update comp total score on board
   computer.calcTotal()
     compTotal.textContent=`Total: ${computer.getTotal()}`

if (computer.getTotal() <= 16) {
  
   computer.hit()

   //get computer cards class
const compCards = document.body.querySelector(".computer-cards")

//loop through comp's hand from i=displayedCompCards and make src of each one equal to card

for (let i = displayedCompCards; i < computer.getHand().length; i++) {
   
    const newCard = document.createElement("img")
    newCard.src = `../images/cards/${computer.getHand()[i]}.jpg`
  
        compCards.appendChild(newCard)
    
}

  // Update the count of displayed comp cards
  displayedCompCards = computer.getHand().length;


computer.calcTotal()
//update comp score dispaly on board
     compTotal.textContent=`Total: ${computer.getTotal()}`
gamePlay() //recalls the function for computer to hit again

}

 else if (computer.getTotal() > 16 && computer.getTotal() < 22) {


    //Computer wins
    if (computer.getTotal() > player.getTotal()) {
        const score = document.body.querySelector(".score")
        score.setAttribute("style", "display: block;")
        const result = document.body.querySelector(".result")
        result.setAttribute("style", "display: block;")
        result.innerHTML="YOU LOSE! :("
        stay.disabled = true
        hit.disabled = true
    
    }


    //Human player wins
    else if (computer.getTotal() < player.getTotal()) {
     
        moneyManager.winNormal()
        const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="YOU WIN! Your hand was bigger. :)"
            stay.disabled = true
            hit.disabled = true
 
}


//Draw scenario
else if (computer.getTotal() == player.getTotal()) {
    moneyManager.draw()
    const score = document.body.querySelector(".score")
    score.setAttribute("style", "display: block;")
    const result = document.body.querySelector(".result")
    result.setAttribute("style", "display: block;")
    result.innerHTML="DRAW!"
    stay.disabled = true
    hit.disabled = true
   
    }
}}, 2500);
}