class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.newDeck();
  }

  newDeck() {
    let suit = ["hearts", "spades", "clubs", "diamonds"];
    let rank = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

    for (let i = 0; i < suit.length; i++) {
      for (let j = 0; j < rank.length; j++) {
        this.cards.push(
          new Card(suit[i], rank[j], j + 1)
        )
      }
    }
    this.shuffle();
  }

  shuffle() {
    for (let i in this.cards) {
      let random = Math.floor(Math.random() * this.cards.length);
      [this.cards[i], this.cards[random]] = [
        this.cards[random], this.cards[i]];
    }
  }

  dealHand() {
    let hand = [];
    for (let i = 0; i < 26; i++) {
      hand.push(this.cards[this.cards.length - 1]);
      this.cards.pop();
    }
    return hand;
  }
}

class Game {
  constructor() {
    this.p1 = []
    this.p2 = []
    this.setup()
  }

  setup() {
    const start = new Deck()
    this.p1 = start.dealHand();
    this.p2 = start.dealHand();
    this.temp = []
    this.roundWinner = ""
    this.roundStart(this.p1, this.p2);
  }

  war(p1, p2) {
    if (p1.length < 4 && p2.length < 4) {
      for (let i = 0; i < p1.length; i++) {
        this.temp.push(p1[0])
        p1.shift()
      }
      for (let i = 0; i < p2.length; i++) {
        this.temp.push(p2[0])
        p2.shift()
      }
      if (p1[0].score > p2[0].score) {
        p1.push(...this.temp)
        this.temp = [];
      }
      else {
        p2.push(...this.temp)
        this.temp = []
      }
    }
    else if (p1.length <= 4) {
      for (let i = 0; i < p1.length - 1; i++) {
        this.temp.push(p1[0])
        p1.shift()
      }
      for (let i = 0; i < 4; i++) {
        this.temp.push(p2[0])
        p2.shift()
      }
      if (p1[0].score > p2[0].score) {
        p1.push(...this.temp)
        this.temp = []
      }
      else if (p2[0].score > p1[0].score) {
        p2.push(...this.temp)
        this.temp = []
      }
    }

    else if (p2.length <= 4) {
      for (let i = 0; i < p2.length - 1; i++) {
        this.temp.push(p2[0])
        p2.shift()
      }
      for (let i = 0; i < 4; i++) {
        this.temp.push(p1[0])
        p1.shift()
      }

      if (p1[0].score > p2[0].score) {
        p1.push(...this.temp)
        this.temp = []
      }
      else if (p2[0].score > p1[0].score) {
        p2.push(...this.temp)
        this.temp = []
      }
    }
    else {
      for (let i = 0; i < 4; i++) {
        this.temp.push(p1[0], p2[0])
        p1.shift()
        p2.shift()
      }
      if (p1[0].score > p2[0].score) {
        this.temp.push(p1[0], p2[0])
        p1.shift();
        p2.shift();
        p1.push(...this.temp)
        this.temp = [];
      }
      else if (p2[0].score > p1[0].score) {
        this.temp.push(p1[0], p2[0])
        p1.shift();
        p2.shift();
        p2.push(...this.temp)
        this.temp = [];
      }
    }
  }

  fight(p1, p2) {
    if (p1[0].score === p2[0].score) {
      this.war(p1, p2)
    }
    else if (p1[0].score > p2[0].score) {
      p1.push(p2[0])
      p2.shift()
      p1.push(p1[0])
      p1.shift()
      this.roundWinner = "Player 1";
    }
    else if (p2[0].score > p1[0].score) {
      p2.push(p1[0]);
      p1.shift();
      p2.push(p2[0]);
      p2.shift();
      this.roundWinner = "Player 2";
    }
  }

  roundStart(p1, p2) {
    let i = 1
    while (p1.length > 0 && p2.length > 0) {
      this.fight(p1, p2)
      console.log(`Round: ${i}, Winner: ${this.roundWinner}\nPlayer 1 Cards: ${p1.length}, Player 2 Cards: ${p2.length}`)
      i++;
    }
    if (p1.length > 0) {

      console.log(`Player 1 wins!`)
    }
    else
      console.log(`Player 2 wins!`)
  }
}

const start = new Game();