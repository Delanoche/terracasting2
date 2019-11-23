import React from 'react';
import './City.css';
import Oxygen from './Oxygen.js'
import './Oxygometer.css'

class Oxygometer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentOxygen: props.currentOxygen,
    };
  }

  render() {
    const oxygens = [];
    for (var i = 0; i <= 14; i++) {
      const current = this.state.currentOxygen === i;
      oxygens.push(<Oxygen oxygen={i} current={current} />);
    }

    return (
        <div className="holder">
          {oxygens}
        </div>
    );
  }
}

export default Oxygometer;
