import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Forge from 'node-forge';
import bigInt from 'big-integer';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = { Name: '' };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  genPrime = () => {
    let { primeSize } = this.props.appState;

    return new Promise(resolve => {
      Forge.prime.generateProbablePrime(primeSize, function (err, num) {
        resolve(num.toString(10));
      });
    });
  };

  genGenerator = (primex) => {
    var prime = bigInt(primex);

    function primeFactorization(number, f_result) {
      var result = (f_result || {}), root = Math.sqrt(number), x = 2;
      if (number % x) {
        x = 3;
        while ((number % x) && ((x = (x + 2)) < root)) { }
      }
      x = (x <= root) ? x : number;
      result[x + ''] = 1;
      return (x === number) ? result : primeFactorization((number / x), result);
    }

    let pm1 = prime.minus(1), factors = Object.keys(primeFactorization(pm1.toString(10))),
      possible = [2, 3, 5, 6, 7, 10, 13, 15, 17, 19, 21], candidates = [];

    for (var i = 0; i < possible.length; i++) {
      console.log(possible[i], '-------------')
      for (var j = 0; j < factors.length; j++) {
        var diviFactor = pm1.divide(factors[j]);
        var result = bigInt(possible[i]).modPow(diviFactor, prime);

        console.log('diviFactor, prime, result', diviFactor.toString(10), ' | ', prime.toString(10), ' | ', result.toString(10));

        if (result.toString(10) === '1') break;
        if (j === factors.length - 1) candidates.push(possible[i]);
      }
    }

    console.log('candidates', candidates);
    if (!candidates.length) candidates = possible;

    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  getPrime = async () => {
    let { socket } = this.props;
    let prime = await this.genPrime();
    let generator = this.genGenerator(prime);
    console.log('prime, generator', prime, generator);
    let data = { prime: prime, generator: generator };
    socket.emit('execute', {
      action: 'setPrimeGenerator', body: data
    });
  };

  setName = () => {
    let { setRootState, socket, appState } = this.props;
    setRootState({
      name: this.state.Name
    });

    socket.emit('execute', {
      action: 'setName', body: { id: socket.id, name: this.state.Name }
    });

    if (!(appState.prime && appState.generator)) {
      this.getPrime();
    }
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.appState !== prevProps.appState) {
      this.setState({ Name: this.getDefaultName(this.props.appState) });
    }
  }

  getDefaultName = (appState) => {
    let { socketId, socketIds } = appState;
    let i = socketIds ? socketIds.indexOf(socketId) : 0;
    let labels = ['Alice', 'Bob', 'Eve'];
    return labels[i];
  }

  render() {
    let d_name = this.getDefaultName(this.props.appState);

    return (
      <div>
        <TextField id="Name" value={this.state.Name} label="Name" helperText={'Enter a name for "' + d_name + '"'} margin="normal"
          onChange={this.handleChange('Name')} />
        <br /><br /><br />
        <Button variant="contained" color="primary" className="next" onClick={this.setName}>Agree on Two Numbers</Button>
      </div>
    );
  }
}

export default Landing;
