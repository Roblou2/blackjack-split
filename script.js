//make a random player hand for start of game

const makeCard = () => {

    let suits = ["Clubs", "Spades", "Hearts", "Diamonds"]
    let unsuitedCards = ["Jack", "Queen", "King", "Ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    
    const randomSuit = () => Math.floor(Math.random() * 4); //between 0 and 3
    const random = () =>  Math.floor(Math.random() * 13); //between 0 and 12
    
        const card = () => {
    
        const getSuit = () => suits[randomSuit()]
        const getUnsuitedCard = () => unsuitedCards[random()]
    
         return getUnsuitedCard() + " of " + getSuit() 
        }
        return card()
    }

const hand = {
    cardOne: makeCard(),
    cardTwo: makeCard()
}


//create factory function to make player and get their hand
    const createPlayer = (name, hand) => {

let getPlayerName = () => name

let getPlayerHand = () => hand

return {getPlayerName, getPlayerHand}
}
const rob = createPlayer("rob", hand)
console.log(rob.getPlayerHand())