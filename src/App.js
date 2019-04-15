import React, { Component } from 'react';
import './App.css';
import ButtonAppBar from './layout/partials/ButtonAppBar';
import SettingsDrawer from './layout/partials/SettingsDrawer';
import ScreenLoader from './ScreenLoader';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socketId: null,
      socketIds: null,
      name: '',
      sessions: [],
      drawer: true,
      mitma: false, //False is normal mode, True is MITMA mode
      primeSize: 32,
    };

    this.socket = null;
  }

  componentWillMount() {
    const { getSocket } = this.props;
    this.socket = getSocket(this.state, this.setRootState);
  }

  setRootState = (p, f) => {
    return this.setState(p, f);
  }

  render() {
    return (
      <div className="App">
        <ButtonAppBar setRootState={this.setRootState}></ButtonAppBar>
        
        <SettingsDrawer drawerState={this.state.drawer} setRootState={this.setRootState} mitmaState={this.state.mitma}
          primeSize={this.state.primeSize}
        />

        <ScreenLoader socket={this.socket} appState={this.state} setRootState={this.setRootState} />
      </div>
    );
  }
}

export default App;
