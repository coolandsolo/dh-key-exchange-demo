import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Console from 'react-console-component';
import { getPrivateKey, calculateKey, getAliceName, getBobName, encrypt, decrypt } from '../../Toolbox';
import queue from 'async-delay-queue';

class Attack extends Component {

  constructor(props) {
    super();
    this.state = {
      welcomeMessage: '',
      a_puk: '',
      b_puk: '',
      a_pvk: '',
      b_pvk: '',
      b_secret: '',
      a_secret: '',
    };
  }

  componentDidMount() {
    this.loadWelcomeMessages();
  }

  styles = {
    head: {
      fontWeight: 200,
    },
    paper: {
      background: 'green',
      padding: '10',
    }
  };

  child: {
    console?: Console,
  } = {};

  loadWelcomeMessages = async () => {
    let { appState } = this.props;
    this.enque(`Welcome Hacker ${appState.name}!\n\n`, 1000);
    this.enque(`Waiting to intercept Prime and Generator numbers...\n`, 1000);

    if (appState.prime) {
      this.intercept('prime,gen', appState);
    }
  }

  enque = async (msg, delay) => {
    let res = await queue.delay(() => this.welcomeAppend(msg), delay);
    return res
  }

  welcomeAppend = (msg, timeout) => {
    // console.log('append: ', msg);
    return this.setState((state, props) => {
      return { welcomeMessage: state.welcomeMessage + msg };
    });
  }

  handleConsoleInput = (text) => {
    this.child.console.log(text);
    this.child.console.return();
  }

  promptLabel = () => {
    return '$:';
  }

  generateTheirKeys = () => {
    let { prime, generator } = this.props.appState;
    let a_pvk = getPrivateKey();
    let b_pvk = getPrivateKey();
    let a_puk = calculateKey(generator, a_pvk, prime);
    let b_puk = calculateKey(generator, b_pvk, prime);

    this.setState({ a_pvk: a_pvk, b_pvk: b_pvk, a_puk: a_puk, b_puk: b_puk });

    return { a_pvk: a_pvk, b_pvk: b_pvk, a_puk: a_puk, b_puk: b_puk };
  }

  intercept = async (what) => {
    let { appState } = this.props;
    console.log('run intercept for ', what);
    if (what === 'prime,gen') {
      this.enque(`Intercepted Prime: ${appState.prime}\n`, 1000);
      this.enque(`Intercepted Generator: ${appState.generator}\n\n`, 1000);
      this.enque(`Generating False Keys for both parties...\n\n`, 1000);

      if (Object.keys(appState.sessions).length > 2) {
        this.intercept('pp_keys');
      } else {
        // this.enque(`Waiting for both parties...\n\n`, 1000);
      }

    } else if (what === 'pp_keys') {
      let { a_pvk, b_pvk, a_puk, b_puk } = this.generateTheirKeys();
      this.enque(`${getAliceName(appState)}'s False Private Key: ${a_pvk} Public Key: ${a_puk} \n`, 1000);
      this.enque(`${getBobName(appState)}'s False Private Key: ${b_pvk} Public Key: ${b_puk} \n\n`, 1000);
      this.enque(`Waiting on public key exchange...\n\n`);

    } else if (what === 'mitma_a_puk') {
      let a_secret = calculateKey(appState.mitma_a_puk, this.state.a_pvk, appState.prime);
      this.setState({ a_secret: a_secret });
      this.enque(`Intercepted ${getAliceName(appState)}'s Public Key: ${appState.mitma_a_puk}\n`, 1000);
      this.enque(`Replied to ${getAliceName(appState)} with Fake Public Key: ${this.state.a_puk}\n`, 1000);
      this.enque(`Established Shared Secret Key with ${getAliceName(appState)} : ${a_secret}\n\n`, 1000);

    } else if (what === 'mitma_b_puk') {
      let b_secret = calculateKey(appState.mitma_b_puk, this.state.b_pvk, appState.prime);
      this.setState({ b_secret: b_secret });
      this.enque(`Intercepted ${getBobName(appState)}'s Public Key: ${appState.mitma_b_puk}\n`, 1000);
      this.enque(`Replied to ${getBobName(appState)} with Fake Public Key: ${this.state.b_puk}\n`, 1000);
      this.enque(`Established Shared Secret Key with ${getBobName(appState)} : ${b_secret}\n\n`, 1000);

    } else if (what === 'mitma_a_lastReceived') {
      let a_decrypt = decrypt(appState.mitma_a_lastReceived, this.state.a_secret);
      let b_message = encrypt(a_decrypt, this.state.b_secret);
      this.props.socket.emit('execute', { action: 'setMessage', mode: 'direct', receiver: appState.socketIds[1], body: { message: b_message, sender: null } });
      this.enque(`Intercepted ${getAliceName(appState)}'s Ecrypted Message: [${appState.mitma_a_lastReceived}]\n`, 500);
      this.enque(`Decrypted ${getAliceName(appState)}'s Message: [${a_decrypt}]\n`, 500);
      this.enque(`Encrypting ${getAliceName(appState)}'s Message with  ${getBobName(appState)}'s Secret Key: [${b_message}]\n`, 500);
      this.enque(`New Message Sent to ${getBobName(appState)}!\n\n`, 500);

    } else if (what === 'mitma_b_lastReceived') {
      let b_decrypt = decrypt(appState.mitma_b_lastReceived, this.state.b_secret);
      let a_message = encrypt(b_decrypt, this.state.a_secret);
      this.props.socket.emit('execute', { action: 'setMessage', mode: 'direct', receiver: appState.socketIds[0], body: { message: a_message, sender: null } });
      this.enque(`Intercepted ${getBobName(appState)}'s Ecrypted Message: [${appState.mitma_b_lastReceived}]\n`, 500);
      this.enque(`Decrypted ${getBobName(appState)}'s Message: [${b_decrypt}]\n`, 500);
      this.enque(`Encrypting ${getBobName(appState)}'s Message with  ${getAliceName(appState)}'s Secret Key: [${a_message}]\n`, 500);
      this.enque(`New Message Sent to ${getAliceName(appState)}!\n\n`, 500);

    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { appState } = this.props;
    if (appState !== prevProps.appState) {
      if (appState.prime !== prevProps.appState.prime) {
        console.log('componentDidUpdate prime');
        this.intercept('prime,gen', appState);

      } else if (Object.keys(appState.sessions).length > 2 && appState.sessions !== prevProps.appState.sessions) {
        console.log('componentDidUpdate sessions');
        this.intercept('pp_keys', appState);

      } else if (appState.mitma_a_puk !== prevProps.appState.mitma_a_puk) {
        console.log('componentDidUpdate mitma_a_puk');
        this.intercept('mitma_a_puk', appState);
        this.props.socket.emit('execute', {
          action: 'setTheirPublicKey',
          mode: 'direct',
          receiver: appState.socketIds[0],
          body: { publicKey: this.state.a_puk, sender: null }
        });
      } else if (appState.mitma_b_puk !== prevProps.appState.mitma_b_puk) {
        console.log('componentDidUpdate mitma_b_puk');
        this.intercept('mitma_b_puk', appState);
        this.props.socket.emit('execute', {
          action: 'setTheirPublicKey',
          mode: 'direct',
          receiver: appState.socketIds[1],
          body: { publicKey: this.state.b_puk, sender: null }
        });
      } else if (appState.mitma_a_lastReceived !== prevProps.appState.mitma_a_lastReceived) {
        console.log('componentDidUpdate mitma_a_lastReceived');
        this.intercept('mitma_a_lastReceived', appState);

      } else if (appState.mitma_b_lastReceived !== prevProps.appState.mitma_b_lastReceived) {
        console.log('componentDidUpdate mitma_b_lastReceived');
        this.intercept('mitma_b_lastReceived', appState);

      }
    }
  }

  render() {
    return (
      <div>
        <Typography style={this.styles.head} variant="h3">MITM Attack Screen</Typography><br /><br />

        <Paper align="left" square={true} elevation={1}>
          <Console
            ref={ref => this.child.console = ref}
            class={this.styles.paper}
            handler={this.handleConsoleInput}
            autofocus={true}
            promptLabel={this.promptLabel}
            welcomeMessage={this.state.welcomeMessage}
          />
        </Paper>
      </div>
    );
  }
}

Attack.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme()(Attack);