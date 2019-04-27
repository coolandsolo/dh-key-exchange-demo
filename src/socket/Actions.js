import { isEve } from '../Toolbox';

class Actions {
  appState = null;
  setRootState = null;

  constructor(appState, setRootState) {
    this.appState = appState;
    this.setRootState = setRootState;
  }

  setName(msg) {
    return this.setRootState((state, props) => {
      return { sessions: { ...state.sessions, [msg.id]: msg.name } };
    });
  }

  reset(msg) {
    return window.location.reload();
  }

  setMITMA(msg) {
    console.log('setMITMA', msg);
    return this.setRootState({ mitma: msg });
  }

  setPrimeSize(msg) {
    return this.setRootState({ primeSize: msg });
  }

  setPrimeGenerator(msg) {
    return this.setRootState({ prime: msg.prime, generator: msg.generator });
  }

  setCurrentScreen(msg) {
    return this.setRootState({ currentScreen: msg });
  }

  setTheirPublicKey(msg) {
    return this.setRootState((state, props) => {
      if (state.mitma && isEve(state)) {
        if (state.socketIds[0] === msg.sender) {
          return { mitma_a_puk: msg.publicKey };
        } else if (state.socketIds[1] === msg.sender) {
          return { mitma_b_puk: msg.publicKey };
        }
      } else {
        return { theirPublicKey: msg.publicKey };
      }
    });
  }

  setReadyToSend(msg) {
    return this.setRootState((state, props) => {
      return { demoSend: state.demoSend + 1 };
    });
  }

}

export default Actions;