
//define suits and cards

let suits = ["Clubs", "Spades", "Hearts", "Diamonds"]
let unsuitedCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"]


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

//create factory function to make player with
//methods for making a card, hitting and getting the total and game outcome
const createPlayer = (name, hand) => {

    const cards =  [hand.cardOne, hand.cardTwo] //initialise start
    //of game with 2 cards for the hand

    let total = 0;


    let getPlayerName = () => name

    let hit = () => {
        
      let newCard =  makeCard()
     cards.push(newCard)
    }

    let getTotal = () => {



    for (let i = 0; i < player.cards.length; i++) {
        let card = player.cards[i].split(" ")[0];  
        
       
        if (!isNaN(card)) {
            total += parseInt(card);
        } 
        
        else {
          
            switch (card) {
                case 'Jack':
                case 'Queen':
                case 'King':
             
                    total += 10;
                    break;
                case 'Ace':
                    total += 11;  // add custom logic for Ace as 1 or 11
                    break;
                default:
                    console.log("Invalid card:", player.cards[i]); // For debugging
            }
        }
    }

   if (total > 21) {
    console.log(player.cards)
    return "You Lose"
   }

   else if (total < 21) { 
    

    return console.log("Total:", total, player.cards)
   }

   else if (total === 21) {
    console.log(player.cards)
    return console.log("Total:", 21, "You Win!")
   }
    }

    return {getPlayerName, cards, hit, getTotal}
    }
    

    const player = createPlayer("Rob", makeHand()) //get name from frontend
player.hit()

console.log(player.getTotal())


