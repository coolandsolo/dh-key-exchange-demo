import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton';
import bigInt from 'big-integer';

const styles = {
  head: {
    fontWeight: 200,
  },
};

class PrivateNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateKey: 0,
      publicKey: 0,
    }
  }

  componentWillMount() {
    this.refreshKey();
  }

  refreshKey = () => {
    let { prime, generator } = this.props.appState;
    let pvk = bigInt.randBetween(30, 100), puk = bigInt(generator).modPow(pvk, bigInt(prime));
    this.setState({ privateKey: pvk.toString(10), publicKey: puk.toString(10) });
  }

  toSharedSecret = () => {
    let { setRootState, socket } = this.props;

    setRootState({ myPrivateKey: this.state.privateKey, myPublicKey: this.state.publicKey });

    socket.emit('execute', {
      action: 'setTheirPublicKey', body: this.state.publicKey, mode: 'broadcast'
    });
  }

  render() {
    const { classes, appState } = this.props;
    const { myPublicKey } = appState;
    return (
      <div>
        <Typography className={classes.head} variant="h3">Your randomly generated private key number is {this.state.privateKey}
          <IconButton color="secondary" onClick={this.refreshKey} aria-label="Regenerate private key">
            <AutorenewIcon />
          </IconButton>
        </Typography>

        <br /><br /> Based on that private key, Your public key [(G ^ PRK) MOD P] is: <strong>{this.state.publicKey}</strong>
        <br /><br />
        <Button variant="contained" color="primary" className="next" onClick={this.toSharedSecret} disabled={Boolean(myPublicKey)} >
          {myPublicKey ? 'Waiting on theirs...' : 'Exchange Public Keys'}
        </Button>
      </div>
    );
  }
}

PrivateNumber.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivateNumber);