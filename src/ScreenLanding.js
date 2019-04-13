import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ScreenLanding extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  setName = () => {
    let { setRootState, socket } = this.props;
    setRootState({
      name: this.state.Name
    });

    socket.emit('name set', {id: socket.id, name: this.state.Name});
  };

  render() {
    let { socketId, socketIds, name } = this.props.appState;
    let i = socketIds ? socketIds.indexOf(socketId) : 0;
    let labels = ['Bob', 'Alice', 'Eve'];

    return (
      <div>
        <TextField id="Name" label="Name" helperText={'Enter a name for "' + labels[i]+'"'} margin="normal"
          onChange={this.handleChange('Name')} />

        <Button variant="contained" color="primary" className="next" onClick={this.setName}>Next</Button>
      </div>
    );
  }
}

export default ScreenLanding;
