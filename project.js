class Card {
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

    for (let cardName of this.cardNames) {
      for (let cardValue of this.cardValues) {
        this.cards.push(new Card(cardName, cardValue)); 
      }
    }
    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const x = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[x]] = [this.cards[x], this.cards[i]];
    }
  }
  deal() {
    return this.cards.splice(0, 1)[0];
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.hand = [];
  }
  playCard() {
    return this.hand.shift();
  }
}

class Game {
  constructor() {
    this.players = [new Player("Player 1"), new Player("Player 2")];
    this.deck = new Deck();
    this.dealHands();
  }
  dealHands() {
    for (let i = 0; i < 26; i++) {
      for (let player of this.players) {
        player.hand.push(this.deck.deal());
      }
    }
  }
  playRound() {
    const cards = this.players.map((player) => player.playCard());

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
      console.log(`Round ${i + 1}
--------`);
      this.playRound();
    }
    this.Winner();
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
