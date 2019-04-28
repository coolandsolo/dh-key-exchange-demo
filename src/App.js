import React, { Component } from 'react';
import './App.css';
import ButtonAppBar from './layout/partials/ButtonAppBar';
import SettingsDrawer from './layout/partials/SettingsDrawer';
import ScreenLoader from './ScreenLoader';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socketId: null,
      socketIds: null,
      name: '',
      sessions: {},
      drawer: false,
      mitma: false, //False is normal mode, True is MITMA mode
      primeSize: 32,
      prime: 0,
      generator: 0,
      currentScreen: '',
      myPrivateKey: 0,
      myPublicKey: 0,
      theirPublicKey: 0,
      mitma_a_puk: 0,
      mitma_b_puk: 0,
      mitma_a_pvk: 0,
      mitma_b_pvk: 0,
      mitma_a_lastReceived: '',
      mitma_b_lastReceived: '',
      secretKey: 0,
      demoSend: 0,
      aes: false,
      lastReceived: '',
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
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item xs={12} align="left">
            <ButtonAppBar socket={this.socket} setRootState={this.setRootState} appState={this.state}></ButtonAppBar>
          </Grid>

          <Grid item xs={6} align="left" style={{ paddingLeft: 20, paddingTop: 20 }}>{this.state.secretKey ? ' Secret Key: ' + this.state.secretKey : ''}</Grid>
          <Grid item xs={6} align="right" style={{ paddingRight: 20, paddingTop: 20 }}>
            {this.state.name ? <Chip avatar={<Avatar><FaceIcon /></Avatar>} label={this.state.name} color="secondary" /> : null}
          </Grid>

          <Grid item xs={12} align="left">
            <ScreenLoader socket={this.socket} appState={this.state} setRootState={this.setRootState} />
          </Grid>

        </Grid>

        <SettingsDrawer socket={this.socket} drawerState={this.state.drawer} setRootState={this.setRootState} mitmaState={this.state.mitma} aesState={this.state.aes}
          primeSize={this.state.primeSize}
        />
      </div>
    );
  }
}

export default App;
