import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Console from 'react-console-component';
import { getPrivateKey, getPublicKey, getAliceName, getBobName } from '../../Toolbox';

class Attack extends Component {

  constructor(props) {
    super();
    this.state = {
      welcomeMessage: '',
      alice: { private: {}, public: {}, secret: {} },
      bob: { private: {}, public: {}, secret: {} },
      delay: { enable: true, tt: 0, resolve: false },
    };
  }

  componentDidMount() {
    let { appState } = this.props;
    this.loadWelcomeMessages(appState);
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

  loadWelcomeMessages = async (appState) => {
    await this.addDelay(1000);
    this.welcomeAppend(`Welcome Hacker ${appState.name}!\n\n`);
    await this.addDelay(2000);
    this.welcomeAppend(`Waiting to intercept Prime and Generator numbers...\n`);

    if (appState.prime) {
      this.intercept('prime,gen', appState);
    }
  }

  child: {
    console?: Console,
  } = {};

  handleConsoleInput = (text) => {
    this.child.console.log(text);
    this.child.console.return();
  }


  addDelay = async (duration) => {
    console.log('addDelay pre', this.state.delay);
    return (this.state.delay.enable) ? new Promise(resolve => {
      this.setState((state, props) => {
        return {
          delay: { ...state.delay, resolve: resolve },
        };
      });
      let tt = setTimeout(() => {
        resolve(null)
      }, duration);

      this.setState((state, props) => {
        return {
          delay: { ...state.delay, tt: tt },
        };
      });
      console.log('addDelay in', this.state.delay);
    }) : false;
  }

  enableDelay = () => {
    this.setState((state, props) => {
      return {
        delay: { ...state.delay, enable: true },
      };
    });

    console.log('enabled delay', this.state.delay);
  }

  clearDelay = () => {
    if (this.state.delay.resolve) {
      this.state.delay.resolve(null);
    }

    if (this.state.delay.tt) {
      clearTimeout(this.state.delay.tt);
    }

    this.setState((state, props) => {
      return {
        delay: { ...state.delay, resolve: false, tt: 0, enable: false },
      };
    });

    console.log('cleared delay', this.state.delay);
  };

  welcomeAppend = (msg, timeout) => {
    console.log('append: ', msg);
    return this.setState((state, props) => {
      state.welcomeMessage += msg;
      return { welcomeMessage: state.welcomeMessage };
    });
  }

  promptLabel = () => {
    return '$:';
  }

  generateTheirKeys = () => {
    let { prime, generator } = this.props.appState;
    let a_pvk = getPrivateKey();
    let b_pvk = getPrivateKey();

    this.setState((state, props) => {
      return {
        alice: { ...state.alice, private: a_pvk, public: getPublicKey(generator, a_pvk, prime) },
        bob: { ...state.bob, private: b_pvk, public: getPublicKey(generator, b_pvk, prime) },
      };
    });

    console.log('state', this.state);
  }

  intercept = async (what, appState) => {
    if (what === 'prime,gen') {
      await this.addDelay(2000);
      this.welcomeAppend(`Intercepted Prime: ${appState.prime}\n`);
      await this.addDelay(2000);
      this.welcomeAppend(`Intercepted Generator: ${appState.generator}\n\n`);
      await this.addDelay(3000);
      this.welcomeAppend(`Generating False Keys for both parties...\n`);

      if (Object.keys(appState.sessions).length > 2) {
        this.intercept('pp_keys', appState);
      } else {
        await this.addDelay(1000);
        this.welcomeAppend(`Waiting for both parties...\n`);
      }

    } else if (what === 'pp_keys') {
      this.generateTheirKeys();
      await this.addDelay(1000);
      this.welcomeAppend(`${getAliceName(appState)}'s Private Key: ${this.state.alice.private} Public Key: ${this.state.alice.public} \n`);
      await this.addDelay(1000);
      this.welcomeAppend(`${getBobName(appState)}'s Private Key: ${this.state.bob.private} Public Key: ${this.state.bob.public} \n\n`);
      await this.addDelay(1000);
      this.welcomeAppend(`Waiting on public key exchange...\n`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { appState } = this.props;
    if (appState !== prevProps.appState) {
      if (appState.prime !== prevProps.appState.prime) {
        console.log('componentDidUpdate prime');
        this.clearDelay();
        setTimeout(() => {
          this.enableDelay();
          this.intercept('prime,gen', appState);
        }, 1000);

      } else if (Object.keys(appState.sessions).length > 2 && appState.sessions !== prevProps.appState.sessions) {
        console.log('componentDidUpdate sessions');
        this.clearDelay();
        setTimeout(() => {
          this.enableDelay();
          this.intercept('pp_keys,gen', appState);
        }, 2000);

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