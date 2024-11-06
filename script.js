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

let deck = createDeck(); // Initialize the deck

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

// createPlayer factory function
const createPlayer = (name, hand) => {
    const cards = [hand.cardOne, hand.cardTwo]; //initialize start of game with 2 cards for the hand
    let total = 0;

    const getTotal = () => total

    const getFirstCard = () => cards[0]
    const getSecondCard = () => cards[1]

    const getPlayerName = () => name;

    const getHand = () => cards

    const hit = () => {
        console.log(`${name} hits`)
        let newCard = drawCard();
        cards.push(newCard);
    };

    const calcTotal = () => {
        total = 0; // Reset total

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i].split(" ")[0];

            if (!isNaN(card)) {
                total += parseInt(card);
            } else {
                switch (card) {
                    case "jack":
                    case "queen":
                    case "king":
                        total += 10;
                        break;
                    case "ace":
                        if (total >= 11) {
                            total += 1;
                        } 
                        else if (total < 11) {
                            total += 11;
                        }
                        break;
                    default:
                        console.log("Invalid card:", cards[i]);
                }
            }
        }

        if (total > 21) {
            return `${name}'s total is over 21. ${name} loses`;
        } 
        else if (total < 21) {
            return `${name}'s total is ${total}.`;
        } 
        else if (total === 21) {
            return `${name} wins!`;
        }
    };

    return { getPlayerName, getHand, hit, calcTotal, getTotal, getFirstCard, getSecondCard };
};

//make human and computer players//
const player = createPlayer("Rob", makeHand()); 

const computer = createPlayer("Computer", makeHand());

//get human total//
console.log(player.calcTotal())

//show comp's first card (as dealer)//
console.log(`the computer has a ${computer.getFirstCard()}`)


const hit = document.body.querySelector("button.hit")
hit.addEventListener('click', () => {
    player.hit()
console.log(player.calcTotal())
})

//logic for after human player clicks stay//
const gamePlay = () => {
    console.log(`${player.getPlayerName()} has decided to stay`)

    
const compCardTwo =  document.body.querySelector("img.computer-card-two")

compCardTwo.src=`./images/cards/${computer.getSecondCard()}.jpg`

    console.log(computer.calcTotal())


if (computer.getTotal() <= 16) {
  
   computer.hit()

   //remove first 2 cards from comp hand
const compCards = document.body.querySelector(".computer-cards")
Array.from(compCards.children).forEach(child => compCards.removeChild(child));
   console.log(computer.getHand())
   console.log(computer.calcTotal())
gamePlay() //recalls the function until an outcome is decided

}

 else if (computer.getTotal() > 16 && computer.getTotal() < 22) {
    console.log("The computer's hand is bigger than 16. It must stay")

    //Computer wins
    if (computer.getTotal() > player.getTotal()) {
        console.log(`${player.getPlayerName()} loses`)
    }


    //Human player wins
    else if (computer.getTotal() < player.getTotal()) {
console.log(`${player.getPlayerName()} wins!`)
}


//Draw scenario
else if (computer.getTotal() == player.getTotal()) {
    console.log("Draw!")
    }
}
}

//button function calls
const stay = document.body.querySelector("button.stay")
stay.addEventListener('click', gamePlay)

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

