import React from 'react';
import ocean from './ocean.png';
import './City.css';
import PlayerMarker from './PlayerMarker.js'

class Ocean extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
    };
  }

  render() {
    return (
        <foreignObject x={-7} y={-8} className="tile-object">
          <div className="ocean tile">
            <img src={ocean} className="tile-icon" />
          </div>
          <PlayerMarker color={this.state.player}/>
        </foreignObject>
    );
  }
}

export default Ocean;
