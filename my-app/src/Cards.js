import cardsJson from './data/cards.json';

class Cards {

  static getBaseGameProjectCards() {
    return this.filterProjectCards(this.filterBaseGameCards(cardsJson))
  }

  static getBaseGameCorporationCards() {
    return this.filterCorporationCards(this.filterBaseGameCards(cardsJson))
  }

  static filterProjectCards(cards) {
    return cards.filter(card => ['Automated', 'Active', 'Event'].includes(card['type']))
  }

  static filterCorporationCards(cards) {
    return cards.filter(card => 'Corporation' === card['type'])
  }

  static filterBaseGameCards(cards) {
    return cards.filter(card => ['Basic', 'Corporate'].includes(card['deck']));
  }

  static getAllProjectCards() {
    return cardsJson.filter(card => ['Automated', 'Active', 'Event'].includes(card.type));
  }

}

export default Cards;