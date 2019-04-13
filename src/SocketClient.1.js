import { Component } from 'react';

class SocketClient extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var socket = require('socket.io-client')('http://184.75.224.246:6300/');

    const {setRootState} = this.props;
    socket.on('connect', function () {
      setRootState({
        socketId: socket.id
      });

      console.log('connect', socket);
    });

    socket.on('connection update', function (data) {
      setRootState({
        socketIds: data.all
      });

      console.log('connection update:', data.all);
    });

  }

  render() {
    return null;
  }

}

export default SocketClient;
