import React from 'react';
import Card from './Card';

class Deck extends React.Component{

  constructor(props) {
    super(props);
    this.starting_cards = props.cards;
    this.cards = props.cards;

    this.state = {

    }
  }

  shuffle() {
    let cards = Array.from(this.starting_cards);
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    this.cards = cards;
  }

  reset() {
    this.cards = Array.from(this.starting_cards);
  }

  render() {

  }

}

export default Deck;