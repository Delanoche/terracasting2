import React from 'react';
import {Hexagon, HexGrid, Layout, Pattern, Text} from 'react-hexgrid';
import './App.css';
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

class App extends React.Component {

  constructor() {
    super();

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

    let projectCards = Cards.getBaseGameProjectCards();
    console.log('Project Cards');
    console.log(projectCards);

    let corporationCards = Cards.getBaseGameCorporationCards();
    console.log('Corporation Cards');
    console.log(corporationCards);

    let deck = new Deck({ cards: projectCards });
    deck.shuffle();
    const bonuses = new PlacementBonuses(hexes, hexesByPosition);

    let players = [];
    for (var i = 0; i < 4; i++) {
      var player = { id: i, initialCards: [], initialCorps: [], currentCards: [], currentCorp: [], dongs: 0, dongduction: 0, steel: 0, steelProduction: 0, titanium: 0, titaniumProduction: 0, plants: 0, plantProduction: 0, energy: 0, energyProduction: 0, heat: 0, heatProduction: 0};
      for (var cards = 0; cards < 10; cards++) {
        player.initialCards.push(deck.cards.pop());
      }
      player.initialCorps.push(corporationCards.pop());
      player.initialCorps.push(corporationCards.pop());
      players.push(player);
    }

    console.log(players);

    this.state = {
      players: players,
      hexes: hexes,
      projectCards: projectCards,
      corporationCards: corporationCards,
      deck: deck
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
      <Hexagon q={hex.positions[0]} r={hex.positions[1]} s={hex.positions[2]}>
        { hex.oceanable ? <Oceanable/> : null }
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
              <HexGrid width={731.25} height={528.63} viewBox="-50 -75 100 150">
                <Layout size={{x: 9, y: 9}} flat={false} spacing={1.1} origin={{x: 0, y: 0}}>
                  {hexBoard}
                  {/*<Hexagon q={0} r={-4} s={4}/>*/}
                  {/*<Hexagon q={1} r={-4} s={3}/>*/}
                  {/*<Hexagon q={2} r={-4} s={2}>*/}
                    {/*<City player={'red'}/>*/}
                  {/*</Hexagon>*/}
                  {/*<Hexagon q={3} r={-4} s={1}>*/}
                    {/*<Placements bonuses={['steel', 'titanium']}/>*/}
                  {/*</Hexagon>*/}
                  {/*<Hexagon q={4} r={-4} s={0}>*/}
                    {/*<Placements bonuses={['plant', 'plant']}/>*/}
                  {/*</Hexagon>*/}
                  {/**/}
                  {/*<Hexagon q={-1} r={-3} s={4}/>*/}
                  {/*<Hexagon q={0} r={-3} s={3}/>*/}
                  {/*<Hexagon q={1} r={-3} s={2}/>*/}
                  {/*<Hexagon q={2} r={-3} s={1}/>*/}
                  {/*<Hexagon q={3} r={-3} s={0}/>*/}
                  {/*<Hexagon q={4} r={-3} s={-1}/>*/}
                  {/**/}
                  {/*<Hexagon q={-2} r={-2} s={4}>*/}
                    {/*<Oceanable/>*/}
                  {/*</Hexagon>*/}
                  {/*<Hexagon q={-1} r={-2} s={3}>*/}
                    {/*<Ocean/>*/}
                  {/*</Hexagon>*/}
                  {/*<Hexagon q={0} r={-2} s={2}/>*/}
                  {/*<Hexagon q={1} r={-2} s={1}/>*/}
                  {/*<Hexagon q={2} r={-2} s={0}/>*/}
                  {/*<Hexagon q={3} r={-2} s={-1}/>*/}
                  {/*<Hexagon q={4} r={-2} s={-2}/>*/}
                  {/**/}
                  {/*<Hexagon q={-3} r={-1} s={4}/>*/}
                  {/*<Hexagon q={-2} r={-1} s={3}/>*/}
                  {/*<Hexagon q={-1} r={-1} s={2}/>*/}
                  {/*<Hexagon q={0} r={-1} s={1}/>*/}
                  {/*<Hexagon q={1} r={-1} s={0}/>*/}
                  {/*<Hexagon q={2} r={-1} s={1}/>*/}
                  {/*<Hexagon q={3} r={-1} s={2}/>*/}
                  {/*<Hexagon q={4} r={-1} s={3}/>*/}
                  {/**/}
                  {/*<Hexagon q={-1} r={0} s={1}/>*/}
                  {/*<Hexagon q={-2} r={0} s={2}>*/}
                    {/*<Greenery player={'yellow'}/>*/}
                  {/*</Hexagon>*/}
                  {/*<Hexagon q={-3} r={0} s={3}>*/}
                    {/*<City player={'yellow'}/>*/}
                  {/*</Hexagon>*/}
                  {/*<Hexagon q={-4} r={0} s={4}/>*/}
                  {/**/}
                  {/*<Hexagon q={0} r={0} s={0}>*/}
                    {/*<City/>*/}
                  {/*</Hexagon>*/}
                  {/**/}
                  {/*<Hexagon q={1} r={0} s={-1}/>*/}
                  {/*<Hexagon q={2} r={0} s={-2}/>*/}
                  {/*<Hexagon q={3} r={0} s={-3}/>*/}
                  {/*<Hexagon q={4} r={0} s={-4}/>*/}
                  {/**/}
                  {/*<Hexagon q={-4} r={1} s={3}>*/}
                  {/*</Hexagon>*/}
                  {/*<Hexagon q={-3} r={1} s={2}/>*/}
                  {/*<Hexagon q={-2} r={1} s={1}/>*/}
                  {/*<Hexagon q={-1} r={1} s={0}/>*/}
                  {/*<Hexagon q={0} r={1} s={-1}/>*/}
                  {/*<Hexagon q={1} r={1} s={-2}/>*/}
                  {/*<Hexagon q={2} r={1} s={-3}/>*/}
                  {/*<Hexagon q={3} r={1} s={-4}/>*/}
                  {/**/}
                  {/*<Hexagon q={-4} r={2} s={2}/>*/}
                  {/*<Hexagon q={-3} r={2} s={1}/>*/}
                  {/*<Hexagon q={-2} r={2} s={0}/>*/}
                  {/*<Hexagon q={-1} r={2} s={-1}/>*/}
                  {/*<Hexagon q={0} r={2} s={-2}/>*/}
                  {/*<Hexagon q={1} r={2} s={-3}/>*/}
                  {/*<Hexagon q={2} r={2} s={-4}/>*/}
                  {/**/}
                  {/*<Hexagon q={-4} r={3} s={1}/>*/}
                  {/*<Hexagon q={-3} r={3} s={0}/>*/}
                  {/*<Hexagon q={-2} r={3} s={-1}/>*/}
                  {/*<Hexagon q={-1} r={3} s={-2}/>*/}
                  {/*<Hexagon q={0} r={3} s={-3}/>*/}
                  {/*<Hexagon q={1} r={3} s={-4}/>*/}
                  {/**/}
                  {/*<Hexagon q={-4} r={4} s={0}/>*/}
                  {/*<Hexagon q={-3} r={4} s={-1}/>*/}
                  {/*<Hexagon q={-2} r={4} s={-2}/>*/}
                  {/*<Hexagon q={-1} r={4} s={-3}/>*/}
                  {/*<Hexagon q={0} r={4} s={-4}/>*/}

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

export default App;
