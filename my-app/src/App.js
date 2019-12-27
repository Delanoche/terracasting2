import React from 'react';
import './App.css';
import BoardView from "./BoardView";

class App extends React.Component {

  constructor() {
    super();
  }

  render () {
    return (
        <div>
        <BoardView/>
        </div>
    );
  }
}

export default App;
