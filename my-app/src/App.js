import React from 'react';
import './App.css';
import Deck from "./Deck.js"
import HandView from "./HandView.js"
import PlacementBonuses from './PlacementBonuses.js'
import PlacementBonuses2 from './PlacementBonuses2.js'
import BoardView from "./BoardView.js"
import Cards from "./Cards";

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
      var player = { id: i, initialCards: [], initialCorps: [], currentCards: [], currentCorp: [], draftableCards: [], dongs: 0, dongduction: 0, steel: 0, steelProduction: 0, titanium: 0, titaniumProduction: 0, plants: 0, plantProduction: 0, energy: 0, energyProduction: 0, heat: 0, heatProduction: 0};
      for (var cards = 0; cards < 10; cards++) {
        const card = deck.cards.pop();
        player.initialCards.push(card);
        player.draftableCards.push(card);
      }
      player.initialCorps.push(corporationCards.pop());
      player.initialCorps.push(corporationCards.pop());
      players.push(player);
    }

    console.log(players);

    this.state = {
      players: players,
      projectCards: projectCards,
      corporationCards: corporationCards,
      deck: deck,
      currentView: 'board',
      hexes: this.generateBoard()
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
        hexes: [...this.generateBoard()]
      }));
      // this.setState({
      //   hexes: this.state.hexes.splice(0, this.state.hexes.length, ...this.generateBoard())
      // });
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

  generateBoard(regenerate) {
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
        index: i,
        positions: this.nToCoords(i),
        placement: [],
        oceanable: false,
        city: '',
        greenery: '',
        marker: ''
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
    const bonuses = new PlacementBonuses2(hexes, hexesByPosition);
    return hexes;
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyPress.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress);
  }

  render () {
    return (
        <div className="app-holder">
          {this.state.currentView === 'hand' ? <HandView player={this.state.players[0]}/> : <BoardView players={this.state.players} hexes={this.state.hexes}/> }
        </div>
    );
  }
}

export default App;
