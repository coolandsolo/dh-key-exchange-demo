import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class SharedNumbers extends Component {
  render() {
    return (
      <div>
        Agreed upon shared numbers<br />
        Prime: <strong>0</strong><br />
        Generator: <strong>0</strong>
        <br /><br />
        <Button variant="contained" color="primary" className="next">Next</Button>
      </div>
    );
  }
}

export default SharedNumbers;
