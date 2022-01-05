import React from 'react';
import './App.css';
import Deck from "./Deck.js"
import HandView from "./HandView.js"
import PlacementBonuses from './PlacementBonuses.js'
import PlacementBonuses2 from './PlacementBonuses2.js'
import BoardView from "./BoardView.js"
import Cards from "./Cards";
import ConfigView from "./ConfigView.js";
import HexUtils from 'react-hexgrid/lib/HexUtils';

class App extends React.Component {

  constructor() {
    super();

    let projectCards = Cards.getBaseGameProjectCards();
    projectCards = projectCards.map((card) => {
      card.req = Cards.getCardRequirement(card);
      card.tag_array = Cards.getCardTags(card);
      return card;
    });
    console.log('Project Cards');
    console.log(projectCards);

    let corporationCards = Cards.getBaseGameCorporationCards();
    console.log('Corporation Cards');
    console.log(corporationCards);

    let deck = new Deck({ cards: projectCards });
    deck.shuffle();

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

    var config = {
      oceanPlots: this.getRandomInt(4) + 2,
      maxOceanAdjacency: 3,
      maxTotal: 65,
      minTotal: 55,
      maxTiles: 50,
      minTiles: 40,
      maxBonus: 3,
      minPlant: 27,
      maxPlant: 38,
      minPlantTiles: 20,
      maxPlantTiles: 27,
      plantPlots: 1,
      minTitanium: 4,
      maxTitanium: 6,
      minTitaniumTiles: 3,
      maxTitaniumTiles: 5,
      titaniumPlots: this.getRandomInt(4) + 2, // or 2
      minSteel: 11,
      maxSteel: 14,
      minSteelTiles: 7,
      maxSteelTiles: 9,
      steelPlots: this.getRandomInt(4) + 3, // or 2
      minHeat: 0,
      maxHeat: 11,
      minHeatTiles: 0,
      maxHeatTiles: 5,
      heatPlots: 2,
      minCards: 5,
      maxCards: 8,
      minCardTiles: 5,
      maxCardTiles: 6,
      cardPlots: this.getRandomInt(4) + 2
    };

    this.state = {
      players: players,
      projectCards: projectCards,
      corporationCards: corporationCards,
      deck: deck,
      currentView: 'board',
      hexes: this.generateBoard(false, config),
      config: config
    };
  }

  keyPress(e) {
    if (e.code === 'KeyM') {
      if (this.state.currentView === 'board') {
        this.setState({ currentView: 'hand' });
      // } else if (this.state.currentView === 'hand') {
      //   this.setState({ currentView: 'overview' });
      } else {
        this.setState({ currentView: 'board' });
      }
    } else if (e.code ==='KeyG') {
      this.setState(prevState => ({
        hexes: [...this.generateBoard(false, this.state.config)]
      }));
      // this.setState({
      //   hexes: this.state.hexes.splice(0, this.state.hexes.length, ...this.generateBoard())
      // });
    } else if (e.code === 'KeyC') {
      if (this.state.currentView === 'board') {
        this.setState({ currentView: 'config' });
      } else {
        this.setState({ currentView: 'board' });
      }
    }
  }

  getPotentialPotentialOcean(potentialOceans) {
    return potentialOceans[this.getRandomInt(potentialOceans.length)];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  shouldReRollOcean(oceanables, hexes, proposed, config) {
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
        if (numOceans + 1 > config.maxOceanAdjacency) {
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

  generateBoard(regenerate, config) {
    var oceansToPlace = 12;
    const oceanables = [];
    var potentialOceans = [];
    this.numOceanPlots = config.oceanPlots; // 2 to 5
    for (var i = 0; i < 61; i++) {
      potentialOceans[i] = i;
    }
    const hexes = [];
    for (var i = 0; i < 61; i++) {
      const hex = {
        index: i,
        positions: this.nToCoords(i),
        placement: [],
        oceanable: false,
        city: '',
        greenery: '',
        marker: '',
        text: ''
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
        if (!this.shouldReRollOcean(oceanables, hexesByPosition, hexes[num].positions, config) && !oceanables.includes(num)) {
          // console.log('found one at ' + num);
        }
        // console.log('should reroll ' + this.shouldReRollOcean(oceanables, hexesByPosition, hexes[num].positions) + ' includes? ' + oceanables.includes(num) + ' ' + num);
        if (!this.shouldReRollOcean(oceanables, hexesByPosition, hexes[num].positions, config) && !oceanables.includes(num)) {
          hexes[num].oceanable = true;
          oceanables.push(num);
          needsToFindSpot = false;
          potentialOceans = potentialOceans.splice(num, 1);
        }
        num = this.getRandomInt(61);
      }
    }
    const bonuses = new PlacementBonuses2(hexes, hexesByPosition, config);
    this.placeNoctis(hexes, hexesByPosition);
    this.placeMons(hexes, hexesByPosition)
    return hexes;
  }

  placeNoctis(hexes, hexesByPosition) {
    var viable = false;
    var chosen = null;
    var hex = null;
    while(!viable) {
      hex = hexes[this.getRandomInt(61)];
      var ocean = false;
      var neighbors = this.getNeighbors(hex.positions, hexesByPosition);
      for (var i = 0; i < neighbors.length; i++) {
        if (neighbors[i].oceanable) {
          ocean = true;
        }
      }
      if (!hex.oceanable && ocean && hex.placement.length === 0 && !this.touchingEdge(hex)) {
        viable = true;
        chosen = hex;
      }
    }
    hex.text = 'Noctis';
  }

  touchingEdge(hex) {
    return Math.abs(hex.positions[0]) >= 4 || Math.abs(hex.positions[1] >= 4) || Math.abs(hex.positions[2] >= 4);
  }

  placeMons(hexes, hexesByPosition) {
    const distance = 2;
    var positions = [];
    var numChecked = 0;
    while(positions.length < 4) {
      var hex = hexes[this.getRandomInt(61)];
      var minDistance = 100;
      for (var i = 0; i < positions.length; i++) {
        var currentDistance = this.distanceFrom(positions[i], hex);
        if (currentDistance < minDistance) {
          minDistance = currentDistance;
        }
      }
      if (!hex.oceanable && (((minDistance <= distance || positions.length < 3) && hex.text.length === 0) || numChecked > 200)) {
        numChecked = 0;
        positions.push(hex);
        hex.text = 'Tholus';
      }
      numChecked++;
    }
  }

  distanceFrom(existing, hex) {
    var dx = Math.abs(existing.positions[0] - hex.positions[0]);
    var dy = Math.abs(existing.positions[1] - hex.positions[1]);
    var dz = Math.abs(existing.positions[2] - hex.positions[2]);

    return (dx + dy + dz) / 2;
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyPress.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress);
  }

  configChangedHandler(config) {
    console.log(config);
    this.setState({ config: config })
  }

  render () {
    return (
        <div className="app-holder">
          {this.state.currentView === 'hand' ? <HandView player={this.state.players[0]}/> : this.state.currentView === 'config' ? <ConfigView config={this.state.config} configChanged={this.configChangedHandler.bind(this)}/> : <BoardView players={this.state.players} hexes={this.state.hexes}/> }
        </div>
    );
  }
}

export default App;
