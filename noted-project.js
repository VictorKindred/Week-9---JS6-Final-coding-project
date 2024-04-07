/* For the final project you will be creating an automated version of the classic card game WAR! 
-2 players.
-You do not need to do anything special when there is a tie in a round.
-Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.
-You do not need to accept any user input, when you run your code, the entire game should play out      instantly without any user input inside of your browser's console 

-Deal 26 Cards to each Player from a Deck of 52 cards.
-Iterate through the turns where each Player plays a Card.
-The Player who played the higher card is awarded a point.
-Ties result in zero points for both Players.
-After all cards have been played, display the score and declare the winner.

*/

class Card {
  //Creates cards with a name and value
  constructor(cardName, cardValue) {
    this.cardName = cardName;
    this.cardValue = cardValue;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.cardNames = ["Spades", "Hearts", "Clubs", "Diamonds"];
    this.cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    // Through each iteration, cardName will take on all cardNames values. Spades will iterate through all numbers, simulating 2 of spades through ace of spades etc.
    // The second for loop goes through each of the values, ex. for each heart there will be 2-14
    // We push to the cards array and create a new object with now all cards, thus creating a deck
    for (let cardName of this.cardNames) {
      for (let cardValue of this.cardValues) {
        this.cards.push(new Card(cardName, cardValue)); //
      }
    }
    this.shuffle();
  }

  // i will start at the last card and iterate down until we have 0 cards
  // To be honest I had troubles and had to resort to using another code for the rest of the shuffle function because I did not understand how to do it. I understand that math.random will give me decimal points. math.random gives random number between 0 and 1. Decimals. We multiply to .random to adjust the range of random numbers. In this case we are multiplying it by i (which goes down from 52) and adding one so that we can include 52.
  // math.floor will round DOWN our const number. we are dealing with 52 cards so we don't need decimals.
  // I had to look it up, apparently thats ARRAY DESTRUCTURING ASSIGNMENT, a way to
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const x = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[x]] = [this.cards[x], this.cards[i]];
    }
  }
  //Removes ONE card from the first element of the deck array (removing a card)
  deal() {
    return this.cards.splice(0, 1)[0];
  }
}

//This is to create instances of player with their name, points, and the cards they've been dealt.
class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.hand = [];
  }
  playCard() {
    //Plays the top card from the players hand
    return this.hand.shift(); //Removes the first element in the hand array
  }
}

class Game {
  constructor() {
    this.players = [new Player("Player 1"), new Player("Player 2")]; //Two instances for both players
    this.deck = new Deck(); //A new instance of deck was created for Game class
    this.dealHands();
  }
  dealHands() {
    for (let i = 0; i < 26; i++) {
      //The deck was split, so now each player has 26 cards -> 26 turns, 26 'deals'
      for (let player of this.players) {
        // For each player, we will
        player.hand.push(this.deck.deal()); // this.deck.deal calls deal() from Deck class, which returned to us the first element of the randomized deck array. we then push that value(card) to the respective player's hand.
      }
    }
  }
  playRound() {
    const cards = this.players.map((player) => player.playCard()); //The map parameter (player) makes it so a new array is made for each player. The array contains player play card, which returns to us the first element in the hand array (using the top card of our hand)

    console.log(
      `${this.players[0].name} drew ${cards[0].cardName} ${cards[0].cardValue}`
    );
    console.log(
      `${this.players[1].name} drew ${cards[1].cardName} ${cards[1].cardValue}`
    );

    if (cards[0].cardValue === cards[1].cardValue) {
      console.log(`It's a tie!`);
    } else {
      if (cards[0].cardValue > cards[1].cardValue) {
        this.players[0].points++;
        console.log(`${this.players[0].name} wins this round!`);
      } else {
        this.players[1].points++;
        console.log(`${this.players[1].name} wins this round!`);
      }
    }
  }

  playGame() {
    for (let i = 0; i < 26; i++) {
      //26 rounds
      console.log(`Round ${i + 1}
--------`);
      this.playRound(); //After each round, we play
    }
    this.Winner(); //Once all rounds are done, we run winner
  }

  Winner() {
    let winner;
    const [player1, player2] = this.players;
    if (player1.points > player2.points) {
      winner = player1;
    } else if (player2.points > player1.points) {
      winner = player2;
    } else player1.points === player2.points;
    {
      console.log("It's a tie!");
    }
    console.log(`${winner.name} wins with ${winner.points} points!`);
  }
}

// Start the game
const war = new Game();
war.playGame();

/* RESOURCES (I only thought about saving my resources later on, I created a new bookmarks folder on desktop to save everything so I have an easier time researching)
https://developer.mozilla.org/
https://www.w3schools.com/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
https://www.w3schools.com/js/js_random.asp
https://www.w3schools.com/js/js_array_iteration.asp
https://www.w3schools.com/js/js_object_constructors.asp

*/
