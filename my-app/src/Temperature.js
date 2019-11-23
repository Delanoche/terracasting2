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
        <div>
          {this.state.temp}
        </div>
    );
  }
}

export default Temperature;
