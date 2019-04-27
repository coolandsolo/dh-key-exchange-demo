import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { calculateKey } from '../../Toolbox';

const styles = {
  head: {
    fontWeight: 200,
  },
};

class SharedSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: 0,
      demo: false,
    }
  }

  componentWillMount() {
    this.calculateSecret();
  }

  calculateSecret = () => {
    let { setRootState, appState } = this.props;
    let { prime, theirPublicKey, myPrivateKey } = appState;
    // let secret = bigInt(theirPublicKey).modPow(bigInt(myPrivateKey), bigInt(prime));
    let secret = calculateKey(theirPublicKey, myPrivateKey, prime);
    this.setState({ secret: secret });
    setRootState({ secretKey: secret });
  }

  toSendEncrypt = () => {
    let { setRootState, socket, appState } = this.props;
    console.log(appState, setRootState, socket);

    this.setState({ demo: true });

    socket.emit('execute', {
      action: 'setReadyToSend', body: 1
    });
  }

  render() {
    const { classes, appState } = this.props;
    return (
      <div>
        <Typography className={classes.head} variant="h3">Congratulations! Your Shared Secret is: {this.state.secret}</Typography>
        <br /><br />Derived using the formula <strong>[(PUK ^ PRK) MOD P]</strong>
        <br /> <br />
        { appState.aes ? <Button variant="contained" color="primary" className="next" onClick={this.toSendEncrypt} disabled={Boolean(this.state.demo)} >
          {this.state.demo ? 'Waiting on them...' : 'Send Encrypted Messages'}
        </Button> : null }
      </div >
    );
  }
}

SharedSecret.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SharedSecret);