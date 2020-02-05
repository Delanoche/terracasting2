import React from 'react';
import './City.css';
import './Temperature.css';

class Temperature extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      temp: props.temp,
      current: props.current,
    };
  }

  render() {
    return (
        <div className="temp-holder">
          {this.state.temp}
        </div>
    );
  }
}

export default Temperature;
