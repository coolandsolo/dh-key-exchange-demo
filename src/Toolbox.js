import bigInt from 'big-integer';

export const getReceiver = (state) => {
  let i = state.mitma ? 2 : (
    1 - state.socketIds.indexOf(state.socketId)
  );
  
  return state.socketIds[i];
};

export const isEve = (state) => {
  return state.socketIds && state.socketIds[2] === state.socketId;
};

export const getPrivateKey = (state) => {
  let pvk = bigInt.randBetween(30, 100);
  return pvk.toString(10);
};

export const getPublicKey = (generator, pvk, prime) => {
  let puk = bigInt(generator).modPow(bigInt(pvk), bigInt(prime));
  return puk.toString(10)
};

export const getAliceName = (state) => {
  return state.sessions[state.socketIds[0]];
};

export const getBobName = (state) => {
  return state.sessions[state.socketIds[1]];
};
