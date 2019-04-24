import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import bigInt from 'big-integer';

const styles = {
  head: {
    fontWeight: 200,
  },
};

class SendEncrypt extends Component {
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
    let secret = bigInt(theirPublicKey).modPow(bigInt(myPrivateKey), bigInt(prime));
    this.setState({ secret: secret.toString(10) });
    setRootState({ secretKey: secret.toString(10) });
  }

  toSendEncrypt = () => {
    // let { setRootState, socket, appState } = this.props;
    // console.log(appState, setRootState, socket);

    // this.setState({ demo: true });

    // socket.emit('execute', {
    //   action: 'setReadyToSend', body: 1
    // });

    // setRootState({currentScreen: 'SendEncrypt'});

    // socket.emit('execute', {
    //   action: 'setCurrentScreen', body: 'SendEncrypt'
    // });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.head} variant="h3">Send Encrypted Messages</Typography>
      <br /> <br />
      <Button variant="contained" color="primary" className="next" onClick={this.toSendEncrypt} disabled={Boolean(this.state.demo)} >
        {this.state.demo ? 'Waiting on them...' : 'Send'}
      </Button>
      </div >
    );
  }
}

SendEncrypt.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendEncrypt);