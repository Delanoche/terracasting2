import React from 'react';
import {Hexagon, HexGrid, Layout, Pattern, Text} from 'react-hexgrid';
import './BoardView.css';
import Oceanable from "./Oceanable";
import Placements from "./Placements";
import PlacementBonuses from "./PlacementBonuses";
import mars from "./mars.png"
import phobos from "./phobos.png"
import Card from './Card';
import Cards from './Cards';
import Deck from './Deck';
import Thermometer from "./Thermometer";
import Oxygometer from "./Oxygometer";
import Player from './Player.js'
import City from './City.js'
import MoonCity from './MoonCity.js'
import Greenery from './Greenery.js'
import PlayerMarker from "./PlayerMarker";

class BoardView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hexes: props.hexes,
      players: props.players
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      hexes: newProps.hexes,
      players: newProps.players
    })
  }

  placeCity(hex) {
    if (hex.city.length > 0) {
      hex.greenery = 'red';
      hex.city = '';
    } else if (hex.greenery.length > 0) {
      hex.greenery = '';
      hex.city = '';
    } else {
      hex.city = "red";
      hex.greenery = '';
    }
    this.setState({
      hexes: this.state.hexes
    });
  }

  render () {
    const hexBoard = this.state.hexes.map((hex) =>
        <Hexagon className={hex.oceanable ? "ocean" : ""} q={hex.positions[0]} r={hex.positions[1]} s={hex.positions[2]} onClick={() => this.placeCity(hex)}>
          <Placements bonuses={hex.placement}/>
          { hex.city.length > 0 ? <City player={hex.city} /> : null }
          { hex.greenery.length > 0 ? <Greenery player={hex.greenery} /> : null }

        </Hexagon>
    );

    const players = this.state.players.map((player) =>
        <Player player={player} />
    );
    return (
        <div className="App grid-container">
          <div className="general">

          </div>
          <div className="board">
            <div className="mars-holder">
              <img src={mars} className="mars-image" alt="logo"/>
            </div>
            <div className="hex-board">
              <HexGrid viewBox="-50 -75 100 150">
                <Layout size={{x: 9, y: 9}} flat={false} spacing={1.1} origin={{x: 0, y: 0}}>
                  {hexBoard}
                </Layout>
                <Pattern id="pat-1" link="http://cat-picture"/>
                <Pattern id="pat-2" link="http://cat-picture2"/>
              </HexGrid>
            </div>
            <div className="moons">
              <div className="moon-holder">
                <div className="moon">
                  <img src={phobos} className="moon-image" alt="logo"/>
                </div>
                <div className="phobos">
                  <HexGrid width={100} height={100}>
                    <Layout size={{x: 43.4, y: 43.4}} flat={false} spacing={0.0} origin={{x: 0, y: 0}}>
                      <Hexagon q={0} r={0} s={0}>
                        <Text>Phobos</Text>
                      </Hexagon>
                    </Layout>
                  </HexGrid>
                </div>
              </div>
              <div className="moon-holder">
                <div className="moon">
                  <img src={phobos} className="moon-image" alt="logo"/>
                </div>
                <div className="ganymede">
                  <HexGrid width={100} height={100}>
                    <Layout size={{x: 43.4, y: 43.4}} flat={false} spacing={0.0} origin={{x: 0, y: 0}}>
                      <Hexagon q={0} r={0} s={0}>
                        <Text>Ganymede</Text>
                        {/*<Greenery/>*/}
                        {/*<MoonCity player={'red'}/>*/}
                      </Hexagon>
                    </Layout>
                  </HexGrid>
                </div>
              </div>
            </div>
          </div>
          <div className="heat">
            <Thermometer />
          </div>
          <div className="o2_tracker">
            <Oxygometer />
          </div>
          <div className="players">
            {players}
          </div>
        </div>
    );
  }
}

export default BoardView;
