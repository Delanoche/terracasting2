import React from 'react';
import './ConfigView.css';

class ConfigView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      config: props.config,
      configChanged: props.configChanged
    };
  }

  onChange(v, key) {
    var value = parseInt(v.target.value);
    console.log(value);
    console.log(key);
    this.state.config[key] = value;
    var config = {...this.state.config};
    console.log(config[key]);
    config[key] = value;
    console.log(config);
    this.setState({ config: config });
    this.state.configChanged(config);
  }

  render () {
    const configs = Object.keys(this.state.config).map((key) =>
    <div key={key}>
        <div>{key} {this.state.config[key]}</div>
        <input type="number" defaultValue={this.state.config[key]} onChange={(e) => this.onChange(e, key)}/>
    </div>);

    return (
      <div className="configs">
          {configs}
      </div>
    );
  }
}

export default ConfigView;
