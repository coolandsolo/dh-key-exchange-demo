import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import bigInt from 'big-integer';
import TextField from '@material-ui/core/TextField';
import Message from "./Message";
import { getReceiver } from '../../Toolbox';
// import CryptoJS from "crypto-js";

var CryptoJS = require("crypto-js");

const styles = {
  head: {
    fontWeight: 200,
  },
  text: {
    width: '100%',
  },
  card: {
    width: '80%',
    margin: '20px 0',
  }
};

class SendEncrypt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: 0,
      demo: false,
      message: '',
      history: [],
    }
  }

  state = {
  };

  handleType = event => {
    this.setState({ message: event.target.value });
  };

  componentDidUpdate(prevProps) {
    let { appState } = this.props;
    // Typical usage (don't forget to compare props):
    if (appState.lastReceived !== prevProps.appState.lastReceived) {
      console.log('appState.lastReceived', appState.lastReceived);
      this.setState({ history: [...this.state.history, { message: appState.lastReceived, encrypted: true, sent: false }] });
    }
  }

  sendEncrypted = () => {
    if (this.state.message) {
      let { socket, appState } = this.props;
      console.log('data appState', appState);
      this.setState({ history: [...this.state.history, { message: this.state.message, encrypted: false, sent: true }] });

      let receiver = getReceiver(appState);
      let ciphertext = CryptoJS.AES.encrypt(this.state.message, bigInt(appState.secretKey).toString(16)).toString();
      console.log('ciphertext', ciphertext, ciphertext.toString());
      socket.emit('execute', {
        action: 'setMessage',
        mode: 'direct',
        receiver: receiver,
        body: { message: ciphertext, sender: appState.socketId }
      });

      this.setState({ message: '' });
    }
  }

  render() {
    const { classes, appState } = this.props;
    var messages = [];
    this.state.history.forEach((message, index) => {
      if (message.message) {
        messages.push(<Message key={index} encrypted={message.encrypted} sent={message.sent} message={message.message} appState={appState} />)
      }
    });

    return (
      <div>
        <Typography className={classes.head} variant="h3">Send Encrypted Messages</Typography>
        <br /> <br />
        <TextField
          label="Type a message to encrypt and send"
          placeholder="Message"
          multiline
          rows="2"
          value={this.state.message}
          onChange={this.handleType}
          className={classes.text}
          margin="normal"
        />
        <br /> <br />
        <Button variant="contained" color="primary" className="next" onClick={this.sendEncrypted} disabled={Boolean(this.state.demo)} >
          {this.state.demo ? 'Waiting on them...' : 'Send'}
        </Button>

        {messages.length ? messages.reverse() : null}

      </div >
    );
  }
}

SendEncrypt.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendEncrypt);