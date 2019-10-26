import React from 'react';
import oceanable from './oceanable.png';
import './City.css';
import PlayerMarker from './PlayerMarker.js'

class Oceanable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
    };
  }

  render() {
    return (
        <foreignObject x={-7} y={-8} className="tile-object">
          <div className="oceanable tile">
            <img src={oceanable} className="tile-icon" />
          </div>
          <PlayerMarker color={this.state.player}/>
        </foreignObject>
    );
  }
}

export default Oceanable;
