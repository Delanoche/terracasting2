import React from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import city from './city2 2.png';
import './MoonCity.css';
import MoonPlayerMarker from './MoonPlayerMarker.js'

class MoonCity extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
    };
  }

  render() {
    return (
        <foreignObject x={-37} y={-43} className="city-object">
          <div className="City-tile">
            <img src={city} className="city-icon" />
          </div>
          <MoonPlayerMarker color={this.state.player}/>
        </foreignObject>
    );
  }
}

export default MoonCity;
