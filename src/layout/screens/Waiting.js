import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

class Waiting extends Component {

  render() {
    const { waitText } = this.props;

    return (
      <div>
        <Typography variant="body1" gutterBottom>
          {waitText} <br /><br />
        </Typography>
        <LinearProgress />
      </div>
    );
  }
}

export default Waiting;
