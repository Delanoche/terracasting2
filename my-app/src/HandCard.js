import React from 'react';
import './HandCard.css';
import Cards from './Cards.js'

class HandCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      card: props.card,
    };
  }

  render () {
    const tags = this.state.card.tag_array.map((tag) =>
        <div className="hand-card-tag-holder"><img className="hand-card-tag" src={require("./tag-" + tag + ".png")} /></div>
    );
    const productionArray = Cards.getCardProductions(this.state.card);
    const productionBox = productionArray.length > 0 ? <div className="box-holder"><div className="production-box">{productionArray}</div></div> : null;
    const oneTimeEffect = this.state.card.text.one_time_effect.length > 0 ? <div>{this.state.card.text.one_time_effect}</div> : null;
    const action = this.state.card.text.action_or_effect.length > 0 ? <div>{this.state.card.text.action_or_effect}</div> : null;
    return (
        <div className="card">
          <div className="grid-container">
            <div className="cost">{this.state.card.cost}</div>
            <div className="tags"><div className="hand-card-req">{this.state.card.req}</div>{tags}</div>
            <div className="name">{this.state.card.name}</div>
            <div className="effects">{productionBox}{oneTimeEffect}{action}</div>
            <div className="vp">{this.state.card.tr_effects.vp > 0 ? this.state.card.tr_effects.vp : ''}</div>
            <div className="vp_description"></div>
          </div>
        </div>
    );
  }
}

export default HandCard;
