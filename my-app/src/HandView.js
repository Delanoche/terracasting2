import React from 'react';
import './HandView.css';
import HandCard from './HandCard.js'

class HandView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
    };
  }

  draftCard(card) {
    console.log('did this call');
    this.state.player.draftableCards.filter((filter) => filter.id_number !== card.id_number);
    this.state.player.currentCards.push(card);
  }

  render () {
    const cards = this.state.player.currentCards.map((card) =>
        <HandCard card={card} />
    );

    const draft = this.state.player.draftableCards.map((card) =>
        <HandCard card={card} onClick={() => this.draftCard(card)} />
    );

    return (
        <div className="hand-view">
          <div className="hand-holder">
            <div>Your hand</div>
            <div className="hand">
              {cards}
            </div>
          </div>
          <div className="draft-holder">
            <div>Draft</div>
            <div className="draft">
              {draft}
            </div>
          </div>
        </div>
    );
  }
}

export default HandView;
