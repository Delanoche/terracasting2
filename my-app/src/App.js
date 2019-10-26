import React from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import City from './City.js';
import './App.css';
import PlayerMarker from "./PlayerMarker";
import Greenery from "./Greenery";
import Oceanable from "./Oceanable";
import Ocean from "./Ocean";
import Placements from "./Placements";
import mars from "./mars.png"

class App extends React.Component {

  constructor() {
    super();

    var oceansToPlace = 12;
    const oceanables = [];
    const hexes = [];
    for (var i = 0; i < 61; i++) {
      const hex = {
        positions: this.nToCoords(i),
        placement: this.randomPlacement(),
        oceanable: false,
      };
      hexes.push(hex);
    }

    for (var i = 0; i < oceansToPlace; i++) {
      var num = this.getRandomInt(61);
      if (!oceanables.includes(num)) {
        hexes[num].oceanable = true;
        oceanables.push(num);
      } else {
        while(oceanables.includes(num)) {
          var newNum = this.getRandomInt(61);
          if (!oceanables.includes(newNum)) {
            hexes[newNum].oceanable = true;
            oceanables.push(newNum);
            break;
          } else {
            num = newNum;
          }
        }
      }
    }


    this.state = {
      hexes: hexes
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  shouldReRollOcean(oceanables, hexes, proposed) {
    if (oceanables.length < 4) {
      return false;
    }

    // if (proposed)
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
      return [-1 + n - 5, -3, 4 - n - 5]
    } else if (n < 18) {
      return [-2 + n - 11, -2, 4 - n - 11];
    } else if (n < 26) {
      return [-3 + n - 18, -1, 4 - n - 18];
    } else if (n < 35) {
      return [-4 + n - 26, 0, 4 - n - 26];
    } else if (n < 43) {
      return [-4 + n - 35, 1, 3 - n - 35];
    } else if (n < 50) {
      return [-4 + n - 43, 2, 2 - n - 43];
    } else if (n < 56) {
      return [-4 + n - 50, 3, 1 - n - 50];
    } else {
      return [-4 + n - 56, 4, 0 - n - 56];
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
