import React from 'react';
import city from './city2 2.png';
import './PlayerMarker.css';

class PlayerMarker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
    };
  }


  render() {
    const divStyle = {
      background: this.state.color
    };
    return (
          <div className="PlayerMarker" style={divStyle}>
          </div>
    );
  }
}

export default PlayerMarker;
