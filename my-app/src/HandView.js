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

  render () {
    const cards = this.state.player.initialCards.map((card) =>
        <HandCard card={card} />
    );

    return (
      <div className="hand">
        {cards}
      </div>
    );
  }
}

export default HandView;
