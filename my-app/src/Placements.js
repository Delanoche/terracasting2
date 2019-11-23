import React from 'react';
import plant from './plant.png';
import titanium from './titanium.png';
import steel from './steel.png';
import card from './card.png';
import heat from './heat.png';
import './Placements.css';
import PlayerMarker from './PlayerMarker.js'

class Placements extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bonuses: props.bonuses,
    };
  }

  getImage(bonus) {
    if (bonus === 'plant') {
      return plant;
    } else if (bonus === 'titanium') {
      return titanium;
    } else if (bonus === 'steel') {
      return steel;
    } else if (bonus === 'card') {
      return card;
    } else if (bonus === 'heat') {
      return heat;
    }
  }

  render() {
    const listItems = this.state.bonuses && this.state.bonuses.map((bonus, index) =>
          <div className={"placement-holder"}>
            <img src={this.getImage(bonus)} className="placement-icon" alt="logo" />
          </div>
    );
    return (
        <foreignObject x={-7} y={-8}>
          <div className="placement-holder-parent">
            {listItems}
          </div>
        </foreignObject>
    );
  }
}

export default Placements;
