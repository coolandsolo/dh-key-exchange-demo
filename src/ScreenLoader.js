import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Landing from './layout/screens/Landing.js';
import Waiting from './layout/screens/Waiting.js';
import SharedNumbers from './layout/screens/SharedNumbers.js';

class ScreenLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { appState, setRootState, socket } = this.props;
    let { socketId, name, sessions, mode } = appState;
    let screen = '';
    let minClients = (mode === 'NORMAL' ? 2 : 3);

    if (name && Object.keys(sessions).length >= minClients) {
      screen = <SharedNumbers socket={socket} appState={appState} setRootState={setRootState} />
    } else if (name) {
      screen = <Waiting socket={socket} appState={appState} setRootState={setRootState} waitText="Waiting on other parties" />
    } else if (socketId) {
      screen = <Landing socket={socket} appState={appState} setRootState={setRootState} />
    }

    return (
      <Grid container justify="center" className="container">
        <div>{screen}</div>
      </Grid>
    );
  }
}

export default ScreenLoader;
