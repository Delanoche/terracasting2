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

    var oceansToPlace = 12;
    const oceanables = [];
    var potentialOceans = [];
    this.numOceanPlots = this.getRandomInt(4) + 2; // 2 to 5
    for (var i = 0; i < 61; i++) {
      potentialOceans[i] = i;
    }
    const hexes = [];
    for (var i = 0; i < 61; i++) {
      const hex = {
        positions: this.nToCoords(i),
        placement: [],
        oceanable: false,
      };
      hexes.push(hex);
    }
    const hexesByPosition = {};
    for (var i = 0; i < hexes.length; i++) {
      const hex = hexes[i];
      hexesByPosition[hex.positions.toString()] = hex;
    }

    for (var i = 0; i < oceansToPlace; i++) {
      var num = this.getRandomInt(61);
      var needsToFindSpot = true;
      while(needsToFindSpot) {
        if (!this.shouldReRollOcean(oceanables, hexesByPosition, hexes[num].positions) && !oceanables.includes(num)) {
          // console.log('found one at ' + num);
        }
        // console.log('should reroll ' + this.shouldReRollOcean(oceanables, hexesByPosition, hexes[num].positions) + ' includes? ' + oceanables.includes(num) + ' ' + num);
        if (!this.shouldReRollOcean(oceanables, hexesByPosition, hexes[num].positions) && !oceanables.includes(num)) {
          hexes[num].oceanable = true;
          oceanables.push(num);
          needsToFindSpot = false;
          potentialOceans = potentialOceans.splice(num, 1);
        }
        num = this.getRandomInt(61);
      }
    }
    const bonuses = new PlacementBonuses(hexes, hexesByPosition);

    this.state = {
      hexes: hexes,
      players: props.players
    }
  }

  getPotentialPotentialOcean(potentialOceans) {
    return potentialOceans[this.getRandomInt(potentialOceans.length)];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  shouldReRollOcean(oceanables, hexes, proposed) {
    // return false;
    if (oceanables.length < this.numOceanPlots) {
      return false;
    }

    var wouldHaveTooManyOceans = false;
    const neighbors = this.getNeighbors(proposed, hexes);
    var hasOceanableNeighbor = false;
    for(var i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor.oceanable) {
        hasOceanableNeighbor = true;
      }

      if (!neighbor.oceanable) {
        var neighborsNeighbors = this.getNeighbors(neighbor.positions, hexes);
        var numOceans = 0;
        for (var j = 0; j < neighborsNeighbors.length; j++) {
          if (neighborsNeighbors[j].oceanable) {
            numOceans++;
          }
        }
        if (numOceans + 1 > 3) {
          wouldHaveTooManyOceans = true;
        }
      }
    }
    // if (hasOceanableNeighbor) {
    //   console.log('found one at ' + proposed.toString());
    // }
    return !hasOceanableNeighbor || wouldHaveTooManyOceans;
  }

  getNeighbors(positions, hexesByPosition) {
    const northWest = positions.slice(0);
    northWest[1] -= 1;
    northWest[2] += 1;

    const northEast = positions.slice(0);
    northEast[0] += 1;
    northEast[1] -= 1;

    const east = positions.slice(0);
    east[0] += 1;
    east[2] -= 1;

    const southEast = positions.slice(0);
    southEast[1] += 1;
    southEast[2] -= 1;

    const southWest = positions.slice(0);
    southWest[0] -= 1;
    southWest[1] += 1;

    const west = positions.slice(0);
    west[0] -= 1;
    west[2] += 1;

    return [northWest, northEast, east, southEast, southWest, west].map((position) => position.toString()).map((position) => hexesByPosition[position]).filter(x => !!x);
  }

  nToCoords(n) {
    if (n < 5) {
      return [0 + n, -4, 4 - n];
    } else if (n < 11) {
      return [-1 + n - 5, -3, (5 + 4) - n]
    } else if (n < 18) {
      return [-2 + n - 11, -2, (4 + 11) - n];
    } else if (n < 26) {
      return [-3 + n - 18, -1, (4 + 18) - n];
    } else if (n < 35) {
      return [-4 + n - 26, 0, (4 + 26) - n];
    } else if (n < 43) {
      return [-4 + n - 35, 1, (3 + 35) - n];
    } else if (n < 50) {
      return [-4 + n - 43, 2, (2 + 43) - n];
    } else if (n < 56) {
      return [-4 + n - 50, 3, (1 + 50) - n];
    } else {
      return [-4 + n - 56, 4, (56) - n];
    }
  }

  render () {
    const hexBoard = this.state.hexes.map((hex) =>
        <Hexagon className={hex.oceanable ? "ocean" : ""} q={hex.positions[0]} r={hex.positions[1]} s={hex.positions[2]}>
          <Placements bonuses={hex.placement}/>
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
