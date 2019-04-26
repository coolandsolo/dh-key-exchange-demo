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
    if (this.appState.mitma) {
      return this.setRootState({ theirPublicKey: msg.publicKey });
    } else {
      return this.setRootState({ theirPublicKey: msg.publicKey });
    }
  }

  setReadyToSend(msg) {
    return this.setRootState((state, props) => {
      return { demoSend: state.demoSend + 1 };
    });
  }

}

export default Actions;