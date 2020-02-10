class PlacementBonuses2 {

  constructor(tiles,
              hexesByPosition,
              maxTotal = 65,
              minTotal = 55,
              maxTiles = 50,
              minTiles = 40,
              maxBonus = 3,
              minPlant = 27,
              maxPlant = 38,
              minPlantTiles = 20,
              maxPlantTiles = 27,
              plantPlots = 1,
              minTitanium = 4,
              maxTitanium = 6,
              minTitaniumTiles = 3,
              maxTitaniumTiles = 5,
              titaniumPlots = this.getRandomInt(4) + 2, // or 2
              minSteel = 11,
              maxSteel = 14,
              minSteelTiles = 7,
              maxSteelTiles = 9,
              steelPlots = this.getRandomInt(4) + 3, // or 2
              minHeat = 0,
              maxHeat = 11,
              minHeatTiles = 0,
              maxHeatTiles = 5,
              heatPlots = 2,
              minCards = 5,
              maxCards = 8,
              minCardTiles = 5,
              maxCardTiles = 6,
              cardPlots = this.getRandomInt(4) + 2) {

    this.maxTotal = maxTotal;
    this.minTotal = minTotal;
    this.minTiles = minTiles;
    this.maxBonus = maxBonus;

    this.minPlant = minPlant;
    this.maxPlant = maxPlant;
    this.maxPlantTiles = maxPlantTiles;
    this.minPlantTiles = minPlantTiles;
    this.plantPlots = plantPlots;

    this.minTitanium = minTitanium;
    this.maxTitanium = maxTitanium;
    this.minTitaniumTiles = minTitaniumTiles;
    this.maxTitaniumTiles = maxTitaniumTiles;
    this.titaniumPlots = titaniumPlots;

    this.minSteel = minSteel;
    this.maxSteel = maxSteel;
    this.minSteelTiles = minSteelTiles;
    this.maxSteelTiles = maxSteelTiles;
    this.steelPlots = steelPlots;

    this.minHeat = minHeat;
    this.maxHeat = maxHeat;
    this.minHeatTiles = minHeatTiles;
    this.maxHeatTiles = maxHeatTiles;
    this.heatPlots = heatPlots;

    this.minCards = minCards;
    this.maxCards = maxCards;
    this.minCardTiles = minCardTiles;
    this.maxCardTiles = maxCardTiles;
    this.cardPlots = cardPlots;

    this.currentPlant = 0;
    this.currentPlantTiles = 0;
    this.currentTitanium = 0;
    this.currentTitaniumTiles = 0;
    this.currentSteel = 0;
    this.currentSteelTiles = 0;
    this.temperature = 200;
    this.convergence = 0;
    this.tiles = tiles;
    this.hexesByPosition = hexesByPosition;

    this.trackingTotal = {'plant': 0, 'heat': 0, 'titanium': 0, 'steel': 0, 'cards': 0};
    this.trackingTiles = {'plant': 0, 'heat': 0, 'titanium': 0, 'steel': 0, 'cards': 0};

    this.numThrees = this.getRandomInt(3);
    this.threeHeats = 0;
    this.currentThrees = 0;
    this.currentTwos = 0;
    const totalGreaterThanOne = this.getRandomInt(2) > 0 ? 19 : 20;
    this.numTwos = totalGreaterThanOne - (3 * this.numThrees);
    this.numOverlaps = this.getRandomInt(2) + 1;
    // this.numOverlaps = 10;
    this.currentOverlaps = 0;

    // this.numSteel = this.randn_bm(this.minSteel, this.maxSteel, 1);
    // this.numSteelTiles = this.randn_bm(this.minSteelTiles, this.maxSteelTiles, 1);
    // this.numTitanium = this.randn_bm(this.minTitanium, this.maxTitanium, 1);
    // this.numTitaniumTiles = this.randn_bm(this.minTitaniumTiles, this.maxTitaniumTiles, 1);
    // this.numCards = this.randn_bm(this.minCards, this.maxCards, 1);
    // this.numCardsTiles = this.randn_bm(this.minCardTiles, this.maxCardTiles, 1);
    // this.numPlants = this.randn_bm(this.minPlant, this.maxPlant, 1);
    // this.numPlantTiles = this.randn_bm(this.minPlantTiles, this.maxPlantTiles, 1);

    this.threesBonusOne = ['plant', 'card', ''][this.getRandomInt(2)];
    this.threesBonusTwo = ['plant', 'card', ''][this.getRandomInt(2)];

    console.log(this.numThrees + ' ' + this.threesBonusOne + ' ' + this.threesBonusTwo);
    this.numSteel = this.getRandomInt(1 + this.maxSteel - this.minSteel) + this.minSteel;
    this.numSteelTiles = this.getRandomInt(1 + this.maxSteelTiles - this.minSteelTiles) + this.minSteelTiles;
    this.numTitanium = this.getRandomInt(1 + this.maxTitanium - this.minTitanium) + this.minTitanium;
    // this.numTitaniumTiles = this.getRandomInt(1 + this.maxTitaniumTiles - this.minTitaniumTiles) + this.minTitaniumTiles;
    this.numTitaniumTiles = this.numTitanium - 1;
    this.numCards = this.getRandomInt(1 + this.maxCards - this.minCards) + this.minCards;
    this.numCardsTiles = this.getRandomInt(1 + this.maxCardTiles - this.minCardTiles) + this.minCardTiles;
    this.numPlants = this.getRandomInt(1 + this.maxPlant - this.minPlant) + this.minPlant;
    this.numPlantTiles = this.getRandomInt(1 + this.maxPlantTiles - this.minPlantTiles) + this.minPlantTiles;

    this.numHeat = 0;
    this.numHeatTiles = 0;
    this.heatPlots = 0;
    this.totalBonuses = this.numPlants + this.numCards + this.numTitanium + this.numSteel;
    if (this.totalBonuses < 59) {
      this.numHeat = 63 - this.totalBonuses;
      this.numHeatTiles = Math.floor(this.numHeat / 2);
      this.heatPlots = 2;
    }

    this.multisNeeded = (this.numSteel - this.numSteelTiles) + (this.numTitanium - this.numTitaniumTiles) + (this.numCards - this.numCardsTiles) + (this.numPlants - this.numPlantTiles);

    this.generate();
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

  getNeighbors(hex, hexesByPosition, bonusType) {
    const northWest = hex.positions.slice(0);
    northWest[1] -= 1;
    northWest[2] += 1;

    const northEast = hex.positions.slice(0);
    northEast[0] += 1;
    northEast[1] -= 1;

    const east = hex.positions.slice(0);
    east[0] += 1;
    east[2] -= 1;

    const southEast = hex.positions.slice(0);
    southEast[1] += 1;
    southEast[2] -= 1;

    const southWest = hex.positions.slice(0);
    southWest[0] -= 1;
    southWest[1] += 1;

    const west = hex.positions.slice(0);
    west[0] -= 1;
    west[2] += 1;

    const things = [northWest, northEast, east, southEast, southWest, west].map((position) => position.toString()).map((position) => hexesByPosition[position]).filter(x => !!x).filter(x => x.placement.indexOf(bonusType) < 0);
    return this.shuffle(things);
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  randn_bm(min, max, skew) {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = this.randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return Math.floor(num);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  findEmptyTileOrRandom() {
    var mostEmpty = 3;
    var leastPlacements = 0;
    var candidates = [];
    for (var i = 0; i < 61; i++) {
      const neighbors = this.getNeighbors(this.tiles[i], this.hexesByPosition, '');
      // const numEmpties = neighbors.map(x => x.placement.length < 1 ? 1 : 0).reduce((x,y) => x+y);
      const numEmpties = neighbors.map(x => x.placement.length).reduce((x,y) => x+y) + this.tiles[i].placement.length;
      // console.log('' + i + ' ' + numEmpties);
      if (numEmpties <= leastPlacements) {
        leastPlacements = numEmpties;
        candidates.push(this.tiles[i]);
      }
    }
    // candidates = this.tiles.filter(x => x.placement.length <= leastPlacements);
    // console.log(candidates.length);

    if (candidates.length === 0) {
      // console.log('used random tile');
      return this.tiles[this.getRandomInt(61)];
    }
    const chosen = candidates[this.getRandomInt(candidates.length)];
    // console.log('used candidate! ' + leastPlacements + ' ' + JSON.stringify(chosen));
    return chosen;
  }

  generate() {
    this.plotPlants();
    const plotFunctions = [this.plotSteel, this.plotTitanium, this.plotCards, this.plotHeat];
    this.shuffle(plotFunctions);
    for (var i = 0; i < plotFunctions.length; i++) {
      (plotFunctions[i])(this);
    }
    // this.plotSteel();
    // this.plotTitanium();
    // this.plotCards();
    console.log('total bonuses ' + this.tiles.map(x => x.placement.length).reduce((x, y) => x + y));
    console.log('total placed tiles ' + this.tiles.map(x => x.placement.length > 0 ? 1 : 0).reduce((x, y) => x + y));
    console.log('num twos ' + this.tiles.map(x => x.placement.length === 2 ? 1 : 0).reduce((x, y) => x + y));
    console.log('num threes ' + this.tiles.map(x => x.placement.length === 3 ? 1 : 0).reduce((x, y) => x + y));
    console.log('num plants ' + this.numPlants + ' on ' + this.numPlantTiles);
    console.log('num titanium ' + this.numTitanium + ' on ' + this.numTitaniumTiles);
    console.log('num steel ' + this.numSteel + ' on ' + this.numSteelTiles);
    console.log('num cards ' + this.numCards + ' on ' + this.numCardsTiles);
    console.log('num heat ' + this.numHeat + ' on ' + this.numHeatTiles);
  }

  splitNums(numPlots, num, numTiles) {
  }

  findContiguousPlot(allowOverlaps, bonusType, num, numTiles) {
    for (var i = 0; i < 61; i++) {
      var hexes = this.isPlaceable(this.tiles[i], bonusType, num, numTiles, {});
      if (Object.keys(hexes).length > 0) {
        console.log(JSON.stringify(hexes));
        Object.keys(hexes).forEach((key) => {
          for (var j = 0; j < hexes[key]; j++) {
            this.hexesByPosition[this.nToCoords(this.tiles[key].index).toString()].placement.push(bonusType);
            this.tiles[key].placement.push(bonusType);
          }
        });
        return;
      }
    }
  }

  isPlaceable(hex, bonusType, num, numTiles, hexesToPlace) {
    const neighbors = this.getNeighbors(hex, this.hexesByPosition, bonusType);
    const realCandidates = neighbors.filter((neighbor) => neighbor.placement.length === 0);
    const bonusNeighbors = neighbors.filter((neighbor) => neighbor.placement.includes(bonusType));
    console.log(JSON.stringify(neighbors.map((neighbor) => neighbor.placement)) + ' ' +  bonusNeighbors.length);
    if (hex.placement.length === 0 && bonusNeighbors.length < 1 && !hexesToPlace[hex.index]) {
      const toPlace = this.howManyToPlace(num, numTiles);
      if (num - toPlace === 0) {
        hexesToPlace[hex.index] = toPlace;
        return hexesToPlace;
      } else if (realCandidates.length > 0) {
        hexesToPlace[hex.index] = toPlace;
        return this.isPlaceable(realCandidates[0], bonusType, num - toPlace, numTiles - 1, hexesToPlace);
      } else {
        return {};
      }
    } else {
      return {};
    }
  }

  howManyToPlace(num, numTiles) {
    if (num === numTiles) {
      return 1;
    } else if (numTiles === 1) {
      return 2;
    } else {
      if (Math.random() > 0.5) {
        return 2;
      } else {
        return 1;
      }
    }
  }

  sectionPlots(total, num, numTiles, bonusType) {
    const shouldReserveThreeBomb = (bonusType === this.threesBonusOne && this.numThrees > 0) || (bonusType === this.threesBonusTwo && this.numThrees > 1);
    if (total === 1) {
      return [{'num': num, 'tiles': numTiles}];
    }
    var sections = [];
    var percentages = [];
    for (var i = 1; i <= total; i++) {
      num--;
      numTiles--;
      sections.push({ 'id': i, 'tiles': 1, 'num': 1 });
    }
    while(numTiles > 0) {
      for (var i = 0; i < total; i++) {
        if (Math.random() < 0.3 && numTiles > 0) {
          sections[i]['tiles'] += 1;
          numTiles--;
        }
      }
    }
    for (var i = 0; i < total; i++) {
      var currentNum = sections[i]['num'];
      var tiles = sections[i]['tiles'];
      sections[i]['num'] = tiles;
      num -= tiles - currentNum;
    }
    console.log(sections);
    console.log(numTiles);
    var thisThrees = 0;
    while(num > 0) {
      for (var i = 0; i < total; i++) {
        // console.log(bonusType + ' ' + JSON.stringify(sections[i]));
        if ((Math.random() > 0.5 && num > 0) && (sections[i]['num'] + 1 <= sections[i]['tiles'] * 2 || bonusType === 'heat' )) {
          sections[i]['num'] += 1;
          num--;
        }
      }
    }
    /*
    for (var i = 1; i <= total; i++) {
      if (i === 1) {
        sections.push({ 'id': i, 'tiles': Math.ceil(numTiles / 2), 'num': Math.ceil(num / 2)});
      } else {
        var value = Math.floor((num - Math.ceil(num / 2)) / (total - 1));
        var tiles = Math.floor((numTiles - Math.ceil(numTiles / 2)) / (total - 1));
        var numAssigned = sections.map(x => x['num']).reduce( (x, y) => x + y);
        var tilesAssigned = sections.map(x => x['tiles']).reduce( (x, y) => x + y);
        if (i === total && numAssigned + value < num) {
          value += (num - (numAssigned + value));
          console.log('bumping up num ' + num + ' ' + numAssigned + ' ' + value);
        }
        if (i === total && tilesAssigned + tiles < numTiles) {
          tiles += (numTiles - (tilesAssigned + tiles));
          console.log('bumping up tiles ' + numTiles + ' ' + tilesAssigned + ' ' + tiles);
        }
        sections.push({'id': i, 'tiles': tiles, 'num': value});
      }
    }
    */

    if (shouldReserveThreeBomb) {
      const isOneOffFromThree = sections.filter(x => x['num'] > x['tiles'] + 1);
      if (isOneOffFromThree.length > 0) {
        const threeBomb = isOneOffFromThree[this.getRandomInt(isOneOffFromThree.length)];
        const hasExtraToGiveUp = sections.filter(x => x['num'] > x['tiles'] && x['num'] > 1 && x['id'] !== isOneOffFromThree['id']);
        if (hasExtraToGiveUp.length > 0) {
          const oneToRemove = hasExtraToGiveUp[this.getRandomInt(hasExtraToGiveUp.length)];
          oneToRemove['num'] -= 1;
          threeBomb['num'] += 1;
        }
      }
    }
    return sections;
  }

  plotHeat(self) {
    const maxHeatPerTile = 2;
    if (self.numHeat > 0) {
      for (var i = 0; i < self.heatPlots; i++) {
        // self.findContiguousPlot(false, 'heat', self.numHeatTiles, self.numHeat);
      }
    }
  }

  plotSteel(self) {
    const maxSteelPerTile = 2;

    // for (var i = 0; i < this.steelPlots; i++) {
    //   var startNum = this.getRandomInt(61);
    //   var startTile = this.tiles[startNum];
    //   this.placeBonus('steel', maxSteelPerTile, numSteel / this.steelPlots, numSteelTiles / this.steelPlots, {'currentTiles': 0, 'currentNum': 0}, startTile);
    // }
    self.sectionPlots(self.steelPlots, self.numSteel, self.numSteelTiles, 'steel').forEach(numOnPlot => {
      console.log('placing steel ' + numOnPlot['num'] + ' ' + numOnPlot['tiles']);
      self.findContiguousPlot(false, 'steel', numOnPlot['num'], numOnPlot['tiles']);
    });
  }

  plotTitanium(self) {
    const maxTitaniumPerTile = 2;

    self.plotBonus('titanium', self.numTitanium, self.numTitaniumTiles, self.titaniumPlots, maxTitaniumPerTile);
  }

  plotCards(self) {
    const maxCardsPerTile = 2;

    self.plotBonus('card', self.numCards, self.numCardsTiles, self.cardPlots, maxCardsPerTile);
  }

  plotPlants() {
    const maxPlantPerTile = 2;

    var startNum = this.getRandomInt(61);
    var startTile = this.tiles[startNum];
    this.placeBonus('plant', maxPlantPerTile, this.numPlants, this.numPlantTiles, {'currentTiles': 0, 'currentNum': 0}, startTile);
  }

  plotBonus(bonusType, num, numTiles, numPlots, maxPerTile) {
    this.sectionPlots(numPlots, num, numTiles, bonusType).forEach(numOnPlot => {
      var startTile = this.findEmptyTileOrRandom();
      console.log('plotting ' + bonusType + ' ' + num + ', ' + numTiles + ', ' + JSON.stringify(numOnPlot) + ' starting at ' + startTile.positions);
      this.placeBonus(bonusType, maxPerTile, numOnPlot['num'], numOnPlot['tiles'], {'currentTiles': 0, 'currentNum': 0}, startTile);
    });
  }

  placeBonus(bonusType, maxPer, num, numTiles, numObj, tile) {
    // while (num > numObj['currentNum'] && numTiles > numObj['currentTiles']) {
    var neighbors = this.getNeighbors(tile, this.hexesByPosition, bonusType);
    neighbors.forEach(neighbor => {
      if (num > numObj['currentNum'] && numTiles > numObj['currentTiles']) {
        if (maxPer === 3) {
          maxPer = 2;
        }
        // if (bonusType === 'heat') {
        //   console.log('HEAT STUFF ' + num + ' ' + numTiles + ' ' + JSON.stringify(numObj) + ' ' + this.threeHeats);
        // }
        if (((this.numThrees > this.currentThrees &&
            (bonusType === this.threesBonusOne && this.currentThrees === 0 ||
                bonusType === this.threesBonusTwo && this.currentThrees === 1)) &&
            (num - numObj['currentNum']) - (numTiles - numObj['currentTiles']) >= 3) ||
            (bonusType === 'heat' && this.threeHeats === 0 && numTiles * 2 < num)) {
          maxPer = 3;
        }
        if (num - numObj['currentNum'] <= numTiles - numObj['currentTiles'] || num - numObj['currentNum'] < 2 /*|| this.currentTwos >= this.numTwos*/) {
          maxPer = 1;
        }
        if (neighbor.placement.indexOf(bonusType) < 0 && neighbor.placement.length < 2 && (maxPer < 3 ? maxPer + neighbor.placement.length < 3 : true) // this is so we don't have 3's of differing bonus types
            && (neighbor.placement.length + maxPer <= ((this.currentThrees < this.numThrees || (maxPer === 3 && bonusType === 'heat')) ? 3 : 2))
            && (neighbor.placement.length === 0 || (neighbor.placement.length > 0 && this.currentOverlaps < this.numOverlaps))) {
          numObj['currentTiles'] += 1;
          numObj['currentNum'] += maxPer;

          if (neighbor.placement.length > 0) {
            this.currentOverlaps++;
          }
          this.placeX(neighbor, maxPer, bonusType);
          if (neighbor.placement.length === 3 && bonusType !== 'heat') {
            this.currentThrees++;
          } else if (neighbor.placement.length === 3 && bonusType === 'heat') {
            this.threeHeats++;
          }
          if (neighbor.placement.length === 2) {
            this.currentTwos++;
          }
          this.placeBonus(bonusType, maxPer, num, numTiles, numObj, neighbor);
        } else {
          this.placeBonus(bonusType, maxPer, num, numTiles, numObj, neighbor);
        }
      } else {
        return;
      }
    });
    // }
  }

  placeBonusBreadthFirst(bonusType, maxPer, num, numTiles, numObj, tile) {

  }

  placeX(tile, x, bonusType) {
    for (var i = 0; i < x; i++) {
      tile.placement.push(bonusType);
    }
  }
}

export default PlacementBonuses2;
