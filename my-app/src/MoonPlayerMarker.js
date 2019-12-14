import React from 'react';
import city from './city2 2.png';
import './MoonPlayerMarker.css';

class MoonPlayerMarker extends React.Component {

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
        <div className="MoonPlayerMarker" style={divStyle}>
        </div>
    );
  }
}

export default MoonPlayerMarker;
