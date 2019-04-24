import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  head: {
    fontWeight: 200,
  },
};

class SharedNumbers extends Component {
  toPrivateNumber = () => {
    let { setRootState, socket } = this.props;
    setRootState({currentScreen: 'PrivateNumber'});

    socket.emit('execute', {
      action: 'setCurrentScreen', body: 'PrivateNumber'
    });
  }

  render() {
    const { classes, appState } = this.props;
    const { prime, generator } = appState;
    return (
      <div>
        <Typography className={classes.head} variant="h3">Both parties have agreed on shared numbers</Typography><br /><br />
        Prime: <strong>{prime}</strong><br />
        Generator: <strong>{generator}</strong>
        <br /><br />
        <Button variant="contained" color="primary" className="next" onClick={this.toPrivateNumber}>Generate a Private Key</Button>
      </div>
    );
  }
}

SharedNumbers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SharedNumbers);