import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {Name: ''};
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  setName = () => {
    let { setRootState, socket } = this.props;
    setRootState({
      name: this.state.Name
    });

    socket.emit('name set', { id: socket.id, name: this.state.Name });
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
