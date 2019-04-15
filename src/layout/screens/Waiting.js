import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

class Waiting extends Component {

  render() {
    const { waitText } = this.props;
    const { name } = this.props.appState;

    return (
      <Typography variant="body1" gutterBottom>
        {name} is {waitText} <br /><br />
        <LinearProgress />
      </Typography>
    );
  }
}

export default Waiting;
