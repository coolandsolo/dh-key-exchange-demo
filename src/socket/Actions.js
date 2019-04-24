class Actions {
  appState = null;
  setRootState = null;

  constructor(appState, setRootState) {
    this.appState = appState;
    this.setRootState = setRootState;
  }

  setName(msg) {
    return this.setRootState((state, props) => {
      state.sessions[msg.id] = msg.name;
      return { sessions: state.sessions };
    });
  }

  reset(msg) {
    return window.location.reload();
  }

  setMITMA(msg) {
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
    return this.setRootState({ theirPublicKey: msg });
  }

  setReadyToSend(msg) {
    return this.setRootState((state, props) => {
      state.demoSend += 1;
      return { demoSend: state.demoSend };
    });
  }
  
}

export default Actions;