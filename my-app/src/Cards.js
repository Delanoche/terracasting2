import cardsJson from './data/cards.json';
import React from 'react';

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

  static getCardRequirement(card) {
    if (card.pre_requisites.global.temperature.min > -30) {
      return 'min ' + card.pre_requisites.global.temperature.min + '°'
    } else if (card.pre_requisites.global.temperature.max < 8) {
      return 'max ' + card.pre_requisites.global.temperature.max + '°'
    } else if (card.pre_requisites.global.oxygen.min > 0) {
      return 'min ' + card.pre_requisites.global.oxygen.min + '%'
    } else if (card.pre_requisites.global.oxygen.max < 14) {
      return 'max ' + card.pre_requisites.global.oxygen.max + '%'
    } else if (card.pre_requisites.global.ocean.min > 0) {
      return 'min ' + card.pre_requisites.global.ocean.min + ' Oceans'
    } else if (card.pre_requisites.global.ocean.max < 9) {
      return 'max ' + card.pre_requisites.global.ocean.max + ' Oceans'
    } else if (card.pre_requisites.global.venus.min > 0) {
      return 'min ' + card.pre_requisites.global.venus.min + ' Venus'
    } else if (card.pre_requisites.global.venus.max < 30) {
      return 'max ' + card.pre_requisites.global.venus.max + ' Venus'
    }

    let tagReq = '';
    Object.keys(card.pre_requisites['non-global']).forEach((tag) => {
      let value = card.pre_requisites['non-global'][tag];
      if (value > 0) {
        tagReq = value + ' ' + tag;
      }
    });
    return tagReq;
  }

  static getCardTags(card) {
    let tags = [];
    Object.keys(card.tags).forEach((tag) => {
      let value = card.tags[tag];
      for (var i = 0; i < value; i++) {
        tags.push(tag);
      }
    });
    return tags;
  }

  static getCardProductions(card) {
    let productions = [];
    Object.keys(card.production).forEach((production) => {
      let value = card.production[production];
      if (production === 'megacredit' && value > 0) {
        productions.push(<div className="production-holder"><div className="production credit-production">{value}</div></div>)
      } else {
        if (value > 0) {
          for (var i = 0; i < value; i++) {
            productions.push(<div className="production-holder"><img className="production" src={require("./ic_" + production + ".png")} /></div>);
          }
          productions.push(<br/>)
        } else if (value < 0) {
          for (var i = 0; i < Math.abs(value); i++) {
            productions.push(<div className="production-holder">-<img className="production" src={require("./ic_" + production + ".png")} /></div>);
          }
          productions.push(<br/>)
        }
      }
    });
    return productions;
  }
}

export default Cards;