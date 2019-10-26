import React from 'react';
import greenery from './greenery.png';
import './City.css';
import PlayerMarker from './PlayerMarker.js'

class Greenery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
    };
  }

  render() {
    return (
        <foreignObject x={-7} y={-8} className="tile-object">
          <div className="Greenery tile">
            <img src={greenery} className="tile-icon" />
          </div>
          <PlayerMarker color={this.state.player}/>
        </foreignObject>
    );
  }
}

export default Greenery;
