
//define suits and cards

let suits = ["Clubs", "Spades", "Hearts", "Diamonds"]
let unsuitedCards = ["Jack", "Queen", "King", "Ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]


//define a function to make a card

const makeCard= () => {

    const randomSuit = () => Math.floor(Math.random() * 4); //between 0 and 3
    const random = () =>  Math.floor(Math.random() * 13); //between 0 and 12
    
    
    
        const getSuit = () => suits[randomSuit()]
        const getUnsuitedCard = () => unsuitedCards[random()]
    
         return `${getUnsuitedCard() + " of " + getSuit()}`

    }

    //define a function to make a hand for start of game

    const makeHand = () => {
        return {
            cardOne: makeCard(),
            cardTwo: makeCard()
        };
    };

//create factory function to make player, add makeCard method
// and get their hand
const createPlayer = (name, hand) => {

    const cards =  [hand.cardOne, hand.cardTwo] //initialise start
    //of game with 2 cards for the hand

    //define method to make a random card


    let getPlayerName = () => name

    let hit = () => {
        
      let newCard =  makeCard()
     cards.push(newCard)
    }
    return {getPlayerName, cards, hit}
    }
    

    const player = createPlayer("rob", makeHand()) //get name from frontend


    //define a function to add a card to player's hand
const hit = () => {
  return player.hit()
}

//define a function to make game over if hand is above 21


