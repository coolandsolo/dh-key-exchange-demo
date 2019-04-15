import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SharedNumbers extends Component {

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

    socket.emit('name set', { id: socket.id, name: this.state.Name });
  };

  render() {
    // let { socketId, socketIds, name } = this.props.appState;

    return (
      <div>
        Agreed upon shared numbers<br />
        Prime: <strong>0</strong><br />
        Generator: <strong>0</strong>
        <br /><br />
        <Button variant="contained" color="primary" className="next">Next</Button>
      </div>
    );
  }
}

export default SharedNumbers;
