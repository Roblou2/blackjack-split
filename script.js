

let gameOver = false
//*****DOM ELEMENTS:******
//hit button
const hit = document.body.querySelector("button.hit")
//stay button
const stay = document.body.querySelector("button.stay")
//new game button
const newGame = document.body.querySelector("button.new")
//double down
const doubleDown = document.body.querySelector("button.double-down")
//money pot 
let pot = document.body.querySelector('.pot h2')


//define amount bet by player
let wager = 0;
let bet = document.body.querySelector('.bet')
bet.textContent=`Stake: $${wager}`

//player total
const playerTotal = document.body.querySelector('.player-total')
//comp total
const compTotal = document.body.querySelector('.comp-total')

//chips buttons
const chips = document.body.querySelectorAll('.chip')


//elements with betting class 
const playButtons = document.querySelectorAll('button.betting')
const playerCardsDisplay = document.querySelector('.betting.player-cards')
const compCardsDisplay = document.querySelector('.betting.computer-cards')

//Updating money pot with local storage
const moneyManager = {
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

//define suits and cards
let suits = ["clubs", "spades", "hearts", "diamonds"];
let unsuitedCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];

// Create a full deck
const createDeck = () => {
    let deck = [];
    for (let suit of suits) {
        for (let card of unsuitedCards) {
            deck.push(`${card} of ${suit}`);
        }
    }
    return deck;
};

let deck = createDeck(); // Make deck fo cards

// Function to draw a random card from the deck
const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    deck.splice(randomIndex, 1); // Remove the drawn card from the deck
    return card; //return the card which goes into hand 
};


//define a function to make a hand for the start of the game
const makeHand = () => {
    return {
        cardOne: drawCard(),
        cardTwo: drawCard(),
    };
};

//tracking for number of displayed comp cards on board
let displayedCompCards = 2
//tracking for number of displayed player cards on board
let displayedPlayerCards = 2

// createPlayer factory function
const createPlayer = (name, hand) => {
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
       console.log(`add 10`)
        total += 10
    }

        if (total > 21  && !gameOver) {
        gameOver = true
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
            gameOver = true
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

 


//make human and computer players and get player's total from hand//
const player = createPlayer("Rob", makeHand()); 
player.calcTotal()

const computer = createPlayer("Computer", makeHand());



hit.addEventListener('click', () => {
    player.hit()
//add players card to board

const playerCards = document.body.querySelector(".player-cards")

//loop through player hand and set i = displayedplayercards
for (let i = displayedPlayerCards; i < player.getHand().length; i++) {
   
    const newCard = document.createElement("img")
    
    newCard.src = `./images/cards/${player.getHand()[i]}.jpg`
  
        playerCards.appendChild(newCard)
    
}

  // Update the count of displayed player cards
  displayedPlayerCards = player.getHand().length;


})



//logic for after human player clicks stay//
const gamePlay = () => {
if (gameOver) return

    //disable buttons
    const stay = document.body.querySelector("button.stay")
    stay.disabled = true 

    const hit = document.body.querySelector("button.hit")
    hit.disabled = true

    console.log(`${player.getPlayerName()} has decided to stay`)

    
const compCardTwo =  document.body.querySelector("img.computer-card-two")

setTimeout(() => {
    compCardTwo.src = `./images/cards/${computer.getSecondCard()}.jpg`;

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
    newCard.src = `./images/cards/${computer.getHand()[i]}.jpg`
  
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
        console.log('called')
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

//button function calls

stay.addEventListener('click', gamePlay)


const restart = () => {
    return location.reload()
}

newGame.addEventListener('click', restart)

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


    for (let i = displayedPlayerCards; i < player.getHand().length; i++) {
       
        const newCard = document.createElement("img")
        
        newCard.src = `./images/cards/${player.getHand()[i]}.jpg`
      
            playerCards.appendChild(newCard)
    }

    //fire the gamePlay function
    gamePlay()
  })
  

//player img elements
const playerCardOne = document.body.querySelector(".player-cards img")
const playerCardTwo =  document.body.querySelector("img.player-card-two")


playerCardOne.src=`./images/cards/${player.getFirstCard()}.jpg`
playerCardTwo.src=`./images/cards/${player.getSecondCard()}.jpg`


//comp img elements

const compCardOne = document.body.querySelector(".computer-cards img")
const compCardTwo =  document.body.querySelector("img.computer-card-two")

compCardOne.src=`./images/cards/${computer.getFirstCard()}.jpg`
compCardTwo.src=`./images/cards/cards-backs/Red_back.jpg`


//inititalise player total on board
  playerTotal.textContent=`Total: ${player.getTotal()}`


  document.addEventListener('DOMContentLoaded', () => {
    moneyManager.display();

  });