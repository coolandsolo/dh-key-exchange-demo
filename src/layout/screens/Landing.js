import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const crypto = require('crypto');

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = { Name: '' };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  setName = () => {
    let { setRootState, socket, appState } = this.props;
    setRootState({
      name: this.state.Name
    });

    socket.emit('execute', {
      action: 'setName', body: { id: socket.id, name: this.state.Name }
    });

    if (!(appState.prime && appState.generator)) {
      let hex = crypto.createDiffieHellman(appState.primeSize).getPrime('hex');
      let prime = parseInt(hex, 16);
      let generator = Math.floor(Math.random() * 10) + 4;

      socket.emit('execute', {
        action: 'setPrimeGenerator', body: { prime: prime, generator: generator }
      });
    }
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.appState !== prevProps.appState) {
      this.setState({ Name: this.getDefaultName(this.props.appState) });
    }
  }

  getDefaultName = (appState) => {
    let { socketId, socketIds } = appState;
    let i = socketIds ? socketIds.indexOf(socketId) : 0;
    let labels = ['Alice', 'Bob', 'Eve'];
    return labels[i];
  }

  render() {
    let d_name = this.getDefaultName(this.props.appState);
    
    return (
      <div>
        <TextField id="Name" value={this.state.Name} label="Name" helperText={'Enter a name for "' + d_name + '"'} margin="normal"
          onChange={this.handleChange('Name')} />

        <Button variant="contained" color="primary" className="next" onClick={this.setName}>Next</Button>
      </div>
    );
  }
}

export default Landing;
