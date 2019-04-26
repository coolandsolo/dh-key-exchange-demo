export const getReceiver = (state) => {
  let i = state.mitma ? 2 : (
    1 - state.socketIds.indexOf(state.socketId)
  );
  
  return state.socketIds[i];
};