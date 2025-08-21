//define suits and cards
export let suits = ["clubs", "spades", "hearts", "diamonds"];
export let unsuitedCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];

// Create a full deck
export const createDeck = () => {
    let deck = [];
    for (let suit of suits) {
        for (let card of unsuitedCards) {
            deck.push(`${card} of ${suit}`);
        }
    }
    return deck;
};

export let deck = createDeck(); // Make deck fo cards

// Function to draw a random card from the deck
export const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    deck.splice(randomIndex, 1); // Remove the drawn card from the deck
    return card; //return the card which goes into hand 
};

