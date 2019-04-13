import React, { Component } from 'react';
import './App.css';
import ButtonAppBar from './ButtonAppBar.js';
import Layout from './Layout.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socketId: null,
      socketIds: null,
      name: '',
      sessions: [],
      mode: 'NORMAL' //NORMAL|MITMA
    };

    this.socket = null;
  }

  componentWillMount(a) {
    const { getSocket } = this.props;
    this.socket = getSocket(this.state, this.setRootState);
  }

  setRootState = (p, f) => {
    return this.setState(p, f);
  }

  render() {
    return (
      <div className="App">
        <ButtonAppBar></ButtonAppBar>
        <Layout socket={this.socket} appState={this.state} setRootState={this.setRootState} />
      </div>
    );
  }
}

export default App;
