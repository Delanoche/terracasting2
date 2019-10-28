import React from 'react';
import cardBack from './card_back.png';
import './Card.css';

class Card extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      card: props.card
    };
  }

  render() {
    return (
     <div className="card">
       <img src={cardBack} />
     </div>
    );
  }
}

export default Card;