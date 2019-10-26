import React from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import city from './city2 2.png';
import './City.css';
import PlayerMarker from './PlayerMarker.js'

class City extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
    };
  }

  render() {
    return (
        <foreignObject x={-7} y={-8} className="tile-object">
          <div className="City tile">
            <img src={city} className="tile-icon" />
          </div>
          <PlayerMarker color={this.state.player}/>
        </foreignObject>
    );
  }
}

export default City;
