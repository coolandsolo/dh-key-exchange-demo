import bigInt from 'big-integer';
import CryptoJS from "crypto-js";

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

export const calculateKey = (generator, pvk, prime) => {
  let puk = bigInt(generator).modPow(bigInt(pvk), bigInt(prime));
  return puk.toString(10)
};

export const getAliceName = (state) => {
  return state.sessions[state.socketIds[0]];
};

export const getBobName = (state) => {
  return state.sessions[state.socketIds[1]];
};

export const encrypt = (plainText, secret) => {
  return CryptoJS.AES.encrypt(plainText, bigInt(secret).toString(16)).toString();
};

export const decrypt = (cipherText, secret) => {
  var bytes = CryptoJS.AES.decrypt(cipherText, bigInt(secret).toString(16));
  return bytes.toString(CryptoJS.enc.Utf8);
};
