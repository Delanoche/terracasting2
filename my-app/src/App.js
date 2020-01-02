import React from 'react';
import './App.css';
import Deck from "./Deck.js"
import HandView from "./HandView.js"
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
      projectCards: projectCards,
      corporationCards: corporationCards,
      deck: deck
    }
  }

  render () {
    return (
        <div>
        {/*<BoardView players={this.state.players}/>*/}
          <HandView player={this.state.players[0]}/>
        </div>
    );
  }
}

export default App;
