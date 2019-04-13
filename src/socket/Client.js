var getSocket = (appState, setRootState) => {
  console.log('SOCKET_SERVER',process.env.REACT_APP_SOCKET_SERVER);
  var socket = require('socket.io-client')('http://' + process.env.REACT_APP_SOCKET_SERVER + '/');

  socket.on('connect', function () {
    setRootState({
      socketId: socket.id
    });

    console.log('connect', socket);
  });

  socket.on('connection update', function (msg) {
    //Remove from session
    if (msg.action === "remove" && appState.sessions[msg.id]) {
      setRootState((state, props) => {
        delete state.sessions[msg.id];
        return { sessions: state.sessions };
      });

      console.log('removed :', msg.id, 'from session');
    }

    setRootState({
      socketIds: msg.all
    });

    console.log('connection update:', msg);
  });

  socket.on('name set', function (msg) {
    setRootState((state, props) => {
      state.sessions[msg.id] = msg.name;
      return { sessions: state.sessions };
    });

    console.log('name set', msg);
  });

  return socket;
}

export default getSocket;
