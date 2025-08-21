import {drawCard} from "./deck.js"
import {player} from "./game.js"
import {getGameState, setGameState} from "./game.js"
import { moneyManager } from "./money.js"
import {splitCheck} from "./split.js"

//DOM//

//player total 
export const playerTotal = document.body.querySelector('.player-total')
//stay button
const stay = document.body.querySelector("button.stay")

// createPlayer factory function
export const createPlayer = (name, hand) => {
    let total = 0



    const cards = [hand.cardOne, hand.cardTwo] //initialize start of game with 2 cards for the hand

  

    const getTotal = () => total


    const getFirstCard = () => cards[0]
    const getSecondCard = () => cards[1]

    const getPlayerName = () => name;

    const getHand = () => cards

    const hit = () => {
        let newCard = drawCard();
    
        cards.push(newCard)
        calcTotal()
        playerTotal.textContent=`Total: ${player.getTotal()}`
   
    }

    const calcTotal = () => {
        total = 0
       splitCheck()
                   // adjust Aces if total > 21 before deciding on outcome
 

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i].split(" ")[0];

            if (!isNaN(card)) {
            total += parseInt(card);
        }
             else {
                switch (card) {
                    case "jack":
                    case "queen":
                    case "king":
                        
                        total += 10;
                    
                        break
                    case "ace":
                       total += 1
                       break;
                    } 
                       
                   
                }
            }
            const hasAce = cards.some(card => /ace of \w+/.test(card))
    if (total < 12 && hasAce === true) {
       
        total += 10
    }

        if (total > 21  && getGameState() === false) {
        setGameState(true)
            if (getPlayerName() == `Computer`) {

                moneyManager.winNormal()
            const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="YOU WIN!"
            stay.disabled = true
            hit.disabled = true
            return console.log(`${name}'s total is over 21. ${name} loses`)
        } 
        else if (getPlayerName() != `Computer`) {
            const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="YOU LOSE! :("
            stay.disabled = true
            hit.disabled = true
            return console.log(`${name}'s total is over 21. ${name} loses`)
        }
    }
        else if (total < 21) {
            `${name}'s total is ${total}.`;

        } 
        else if (total === 21) {
            setGameState(true)
            if (getPlayerName() != `Computer`) {
                moneyManager.blackJack()
                stay.disabled = true
                hit.disabled = true
setTimeout(() => {
            const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="WINNER! YOU GOT BLACKJACK! :D"
            return console.log(`${name} wins!`)
        }, 2500)
    }
        else if (getPlayerName() == `Computer`) {
            const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="COMPUTER WINS! :("
            stay.disabled = true
            hit.disabled = true
            return console.log(`${name} wins!`)
        }
    }}
    return { getPlayerName, getHand, hit, calcTotal, getTotal, getFirstCard, getSecondCard };
    };
