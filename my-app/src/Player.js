import React from 'react';
import './Player.css';

class Player extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: props,
    };
  }

  render() {
    const temps = [];
    for (var i = 8; i >= -30; i -= 2) {
      // const current = this.state.currentTemperature === i;
      // temps.push(<Temperature temp={i} current={current} />);
    }

    return (
        <div className="player-grid">
          <div className="player-TR">20</div>
          <div className="player-dongs">20 (20)</div>
          <div className="player-steel">4 (2)</div>
          <div className="player-titanium">0 (2)</div>
          <div className="player-plants">0 (0)</div>
          <div className="player-energy">6 (6)</div>
          <div className="player-heat">8 (2)</div>
        </div>
    );
  }
}

export default Player;
