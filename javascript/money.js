import {player, getDisplayedPlayerCards} from "./game.js"
import { gamePlay } from "./gameplay.js"

//double down button
const doubleDown = document.body.querySelector("button.double-down")

//chips buttons
const chips = document.body.querySelectorAll('.chip')

//hit button
const hit = document.body.querySelector("button.hit")

//money pot 
let pot = document.body.querySelector('.pot h2')

//elements with betting class 
const playButtons = document.querySelectorAll('button.betting')
const playerCardsDisplay = document.querySelector('.betting.player-cards')
const compCardsDisplay = document.querySelector('.betting.computer-cards')


//define amount bet by player
let wager = 0;
let bet = document.body.querySelector('.bet')
bet.textContent=`Stake: $${wager}`

//place bet function
const placeBet = (betAmount) => {
wager += betAmount
bet.textContent=`Stake: $${wager}`

//update pot in local storage and UI
moneyManager.bet(wager)


//set display of buttons and cards

setTimeout(() => {
playButtons.forEach((btn) => {
btn.style.display = 'inline-block'
})

playerCardsDisplay.style.display = 'flex'
compCardsDisplay.style.display ='flex'
doubleDown.style.display = 'inline-block'
}, 2500)

chips.forEach((chip) => {
    chip.style.display = 'none'
})

}

//event listner for chip buttons
chips.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = Number(e.currentTarget.textContent);
        placeBet(value);
    });
  });



  //event listener for double down button
 doubleDown.addEventListener('click', () => {
    moneyManager.doubleDown()
    wager = moneyManager.wager
    bet.textContent=`Stake: $${wager}`

    hit.style.display = 'none'
    doubleDown.style.display = 'none'
    player.hit()
    

    //show extra card added from hand on UI
    const playerCards = document.body.querySelector(".player-cards")


    for (let i = getDisplayedPlayerCards(); i < player.getHand().length; i++) {
       
        const newCard = document.createElement("img")
        
        newCard.src = `../images/cards/${player.getHand()[i]}.jpg`
      
            playerCards.appendChild(newCard)
    }

    //fire the gamePlay function
    gamePlay()
  })

//Updating money pot with local storage
export const moneyManager = {
    key: 'moneyPot', 
    wager: 'amount',
  
    // Get the current pot value (initialize if not present)
    get() {
      let money = localStorage.getItem(this.key);
      if (money === null) {
        money = 2000; // starting pot
        localStorage.setItem(this.key, money) //(stored as string here)
      }
      return parseInt(money, 10); //return string as a value
    },
  
    // Subtract money bet and save to local storage
    bet(amount) {
      let money = this.get() - amount; //(pot value - amount bet)
      localStorage.setItem(this.key, money) //update to new pot value in local storage
      this.display(money) // set new pot value on UI
      this.wager = amount //set the amount bet
      console.log(`Amount bet: $${this.wager}`)
    },

    //dobule down 
    doubleDown() {
let money = this.get() - this.wager
localStorage.setItem(this.key, money)
this.wager = this.wager*2
this.display(money)
    },

//update pot in local storage with winnings for a standard win (pot + (wager*2))
    winNormal() {
       
        let winnings = this.get() + (wager *2)
        console.log(`Amount won: $${winnings}`)
localStorage.setItem(this.key, winnings)

    },

 blackJack() {
let winnings = this.get() + (this.wager + (this.wager*1.5))
console.log(`Amount won: $${winnings}`)
localStorage.setItem(this.key, winnings)
 },

    draw() {
        let returnAmount = this.get() + this.wager
        localStorage.setItem(this.key, returnAmount)

    },
  
    // Display pot
    display(money = null) {
let value;
if (money !== null && money !== undefined) {
  value = money;     // value is set to money var passed 
} else {
  value = this.get(); 
}
  
      if (pot) {
        pot.textContent = `Pot: $${value}` //update UI here
      }
    },
  

    reset() {
      localStorage.setItem(this.key, 2000)
      this.display(2000)
    }
  };
