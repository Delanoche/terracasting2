import React from 'react';
import './City.css';
import './Oxygen.css';

class Oxygen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      oxygen: props.oxygen,
      current: props.current,
    };
  }

  render() {
    return (
        <div className="oxygen">
          {this.state.oxygen}
        </div>
    );
  }
}

export default Oxygen;
