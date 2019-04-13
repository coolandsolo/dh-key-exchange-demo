import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

class Waiting extends Component {

  render() {
    const { waitText } = this.props;
    const { name } = this.props.appState;

    return (
      <div>
        {name} is {waitText} <br /><br />
        <LinearProgress />
      </div>
    );
  }
}

export default Waiting;
