import React from 'react';
import {Hexagon, HexGrid, Layout, Pattern} from 'react-hexgrid';
import './App.css';
import Oceanable from "./Oceanable";
import Placements from "./Placements";
import mars from "./mars.png"

class App extends React.Component {

  constructor() {
    super();

    var oceansToPlace = 12;
    const oceanables = [];
    var potentialOceans = [];
    for (var i = 0; i < 61; i++) {
      potentialOceans[i] = i;
    }
    const hexes = [];
    for (var i = 0; i < 61; i++) {
      const hex = {
        positions: this.nToCoords(i),
        placement: this.randomPlacement(),
        oceanable: false,
      };
      hexes.push(hex);
    }
    console.log(JSON.stringify(hexes));
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
          console.log('pushed');
          hexes[num].oceanable = true;
          oceanables.push(num);
          needsToFindSpot = false;
          potentialOceans = potentialOceans.splice(num, 1);
        }
        num = this.getRandomInt(61);
      }
    }


    this.state = {
      hexes: hexes
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
    if (oceanables.length < 4) {
      return false;
    }

    const neighbors = this.getNeighbors(proposed, hexes);
    var hasOceanableNeighbor = false;
    for(var i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor.oceanable) {
        hasOceanableNeighbor = true;
      }
    }
    // if (hasOceanableNeighbor) {
    //   console.log('found one at ' + proposed.toString());
    // }
    return !hasOceanableNeighbor;
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

    console.log(JSON.stringify(positions));
    console.log(JSON.stringify([northWest, northEast, east, southEast, southWest, west]));

    return [northWest, northEast, east, southEast, southWest, west].map((position) => position.toString()).map((position) => hexesByPosition[position]).filter(x => !!x);
  }

  randomPlacement() {
    const placements = [];
    if (this.getRandomInt(4) === 3) {
      placements.push('plant');
    }
    if (this.getRandomInt(4) === 3) {
      placements.push('titanium')
    }
    if (this.getRandomInt(4) === 3) {
      placements.push('card')
    }
    if (this.getRandomInt(4) === 3) {
      placements.push('steel')
    }
    return placements;
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
      return [-4 + n - 26, 0, (4 - 26) - n];
    } else if (n < 43) {
      return [-4 + n - 35, 1, (4 + 35) -n];
    } else if (n < 50) {
      return [-4 + n - 43, 2, (4 - 43) - n];
    } else if (n < 56) {
      return [-4 + n - 50, 3, (4 + 50) - n];
    } else {
      return [-4 + n - 56, 4, (4 + 56) - n];
    }
  }

  render () {
    const hexBoard = this.state.hexes.map((hex) =>
      <Hexagon q={hex.positions[0]} r={hex.positions[1]} s={hex.positions[2]}>
        { hex.oceanable ? <Oceanable/> : null }
        <Placements bonuses={hex.placement}/>
      </Hexagon>
    );
    return (
        <div className="App grid-container">
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
          </div>
        </div>
    );
  }
}

export default App;
