import React from 'react';
import './HandCard.css';
import Cards from './Cards.js'
import im0 from './0.jpg'
import im1 from './1.jpg'
import im2 from './2.jpg'
import im3 from './3.jpg'
import im4 from './4.jpg'
import im5 from './5.jpg'
import im6 from './6.jpg'
import im7 from './7.jpg'
import im8 from './8.jpg'
import im9 from './9.jpg'
import im10 from './10.jpg'
import im11 from './11.jpg'
import im12 from './12.jpg'
import im13 from './13.jpg'
import im14 from './14.jpg'
import im15 from './15.jpg'
import im16 from './16.jpg'
import im17 from './17.jpg'
import im18 from './18.jpg'
import im19 from './19.jpg'
import im20 from './20.jpg'
import im21 from './21.jpg'

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
    const cardClass = "name " + this.state.card.type.toLowerCase();
    const image = "" + Math.floor(Math.random() * Math.floor(22)) + ".jpg";
    console.log(image);
    // const image = eval("im" + Math.floor(Math.random() * Math.floor(22)));
    return (
        <div className="card">
          <div className="hand-grid">
            <div className="cost">{this.state.card.cost}</div>
            <div className="tags"><div className="hand-card-req">{this.state.card.req}</div>{tags}</div>
            <div className={cardClass}>{this.state.card.name}</div>
            <div className="effects">
              <div className="art"><img className="art-image" src={require('./' + image)}></img></div>
              <div className="actual-effects">{productionBox}{oneTimeEffect}{action}</div>
              <div className="vp_holder">
                <div className="vp_description"></div>
                <div className="vp">{this.state.card.tr_effects.vp > 0 ? this.state.card.tr_effects.vp : ''}</div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default HandCard;
