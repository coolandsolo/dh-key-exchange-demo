import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Landing from './layout/screens/Landing.js';
import Waiting from './layout/screens/Waiting.js';
import SharedNumbers from './layout/screens/SharedNumbers.js';
import PrivateNumber from './layout/screens/PrivateNumber.js';
import SharedSecret from './layout/screens/SharedSecret.js';
import SendEncrypt from './layout/screens/SendEncrypt.js';
import Attack from './layout/screens/Attack.js';
import { isEve } from './Toolbox';

class ScreenLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { appState, setRootState, socket } = this.props;
    let { socketId, name, sessions, mitma, socketIds, currentScreen, myPublicKey, theirPublicKey, demoSend } = appState;
    let screen = null;
    let minClients = mitma ? 3 : 2;
    
    if (socketIds && socketIds.length > minClients) {
      screen = 'Maximum numer of ' + minClients + ' Session exceeded in ' + (mitma ? 'MITMA' : 'Normal') + ' mode';
    } else if (mitma && isEve(appState) && name) {
      screen = <Attack socket={socket} appState={appState} setRootState={setRootState} />
    } else if (demoSend > 1) {
      screen = <SendEncrypt socket={socket} appState={appState} setRootState={setRootState} />
    } else if (myPublicKey && theirPublicKey) {
      screen = <SharedSecret socket={socket} appState={appState} setRootState={setRootState} />
    } else if (currentScreen === 'PrivateNumber') {
      screen = <PrivateNumber socket={socket} appState={appState} setRootState={setRootState} />
    } else if (name && Object.keys(sessions).length >= minClients) {
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
