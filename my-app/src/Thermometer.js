import React from 'react';
import './City.css';
import Temperature from './Temperature.js'

class Thermometer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTemperature: props.currentTemperature,
    };
  }

  render() {
    const temps = [];
    for (var i = 8; i >= -30; i -= 2) {
      const current = this.state.currentTemperature === i;
      temps.push(<Temperature temp={i} current={current} />);
    }

    return (
        <div>
          {temps}
        </div>
    );
  }
}

export default Thermometer;
