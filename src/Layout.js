import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ScreenLanding from './ScreenLanding.js';
import ScreenWaiting from './ScreenWaiting.js';
import ScreenSharedNumbers from './ScreenSharedNumbers.js';


class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props.setRootState);
  }

  render() {
    let { appState, setRootState, socket } = this.props;
    let { socketId, name, sessions, mode } = appState;
    let screen = '';
    let minClients = (mode === 'NORMAL' ? 2 : 3);

    if (name && Object.keys(sessions).length >= minClients) {
      screen = <ScreenSharedNumbers socket={socket} appState={appState} setRootState={setRootState} />
    } else if (name) {
      screen = <ScreenWaiting socket={socket} appState={appState} setRootState={setRootState} waitText="Waiting on other parties" />
    } else if (socketId) {
      screen = <ScreenLanding socket={socket} appState={appState} setRootState={setRootState} />
    }

    return (
      <Grid container justify="center" className="container">
        <div>{screen}</div>
      </Grid>
    );
  }
}

export default Layout;
