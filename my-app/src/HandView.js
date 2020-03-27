import React from 'react';
import './HandView.css';
import HandCard from './HandCard.js'

class HandView extends React.Component {

  constructor(props) {
    super(props);

    this.draftCard = this.draftCard.bind(this);
    this.state = {
      player: props.player,
      handChanged: props.handChanged
    };
  }

  unDraftCard(card) {
    console.log('did this call');
    const currentCards = this.state.player.currentCards.filter((filter) => filter.id_number !== card.id_number);
    this.state.player.draftableCards.push(card);
    this.state.handChanged({draftableCards: this.state.player.draftableCards, currentCards: currentCards});
    this.setState({
      player: {
        draftableCards: this.state.player.draftableCards,
        currentCards: currentCards
      }
    });
  }

  draftCard(card) {
    const index = this.state.player.draftableCards.findIndex((c) => c.id_number === card.id_number);
    const newArray = [...this.state.player.draftableCards];
    newArray.splice(index, 1);
    // const draftableCards = this.state.player.draftableCards.filter((filter) => filter.id_number !== card.id_number);
    console.log(newArray);
    this.state.player.currentCards.push(card);
    this.state.handChanged({draftableCards: newArray, currentCards: this.state.player.currentCards});
    this.setState({
      player: {
        draftableCards: newArray,
        currentCards: this.state.player.currentCards
      }
    });
  }

  render () {
    var self = this;
    const cards = this.state.player.currentCards.map((card) =>
      <div key={card.id_number} onClick={() => this.unDraftCard(card)}><HandCard card={card} /></div>
    );

    const draft = this.state.player.draftableCards.map((card) =>
      <div key={card.id_number} onClick={() => this.draftCard(card)}><HandCard card={card} /></div>
    );

    return (
      <div>
        <div className="hand-view">
          <div className="hand-holder">
            <div>Your hand</div>
            <div className="hand">
              {cards}
            </div>
          </div>
          {draft.length > 0 ? <div className="draft-holder">
            <div>Draft</div>
            <div className="draft">
              {draft}
            </div>
          </div> : null}
        </div>
        <button>Confirm</button>
      </div>
    );
  }
}

export default HandView;
