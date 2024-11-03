//define suits and cards
let suits = ["Clubs", "Spades", "Hearts", "Diamonds"];
let unsuitedCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

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

// Player factory function
const createPlayer = (name, hand) => {
    const cards = [hand.cardOne, hand.cardTwo]; //initialize start of game with 2 cards for the hand
    let total = 0;


    const getFirstCard = () => cards[0]
    const getPlayerName = () => name;

    const getHand = () => {

        const hand = `${name} has a `
    
    for (let i=0; i < cards.length; i++) {
const resultOne = hand.concat(`${cards[i=0]}`)
const resultTwo = resultOne.concat(` and a ${cards[i=1]}`)
console.log(resultTwo)
    }
   
}

    const hit = () => {
        let newCard = drawCard();
        cards.push(newCard);
    };

    const getTotal = () => {
        total = 0; // Reset total

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i].split(" ")[0];

            if (!isNaN(card)) {
                total += parseInt(card);
            } else {
                switch (card) {
                    case "Jack":
                    case "Queen":
                    case "King":
                        total += 10;
                        break;
                    case "Ace":
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
            return "Your total is over 21. You Lose";
        } 
        else if (total < 21) {
            return `Your total is ${total}.`;
        } 
        else if (total === 21) {
            return "You Win!";
        }
    };

    return { getPlayerName, getHand, hit, getTotal, getFirstCard };
};

const player = createPlayer("Rob", makeHand()); 

const computer = createPlayer("Computer", makeHand());


console.log(player.getTotal())
console.log(`the computer has a ${computer.getFirstCard()}`)


const hit = document.body.querySelector("button.hit")
hit.addEventListener('click', () => {
    player.hit()
console.log(player.getTotal())
})

const stay = document.body.querySelector("button.stay")
stay.addEventListener('click', () => {
    console.log(`${player.getPlayerName()} has decided to stay`)
    console.log(player.getHand())
console.log(computer.getHand())

})

