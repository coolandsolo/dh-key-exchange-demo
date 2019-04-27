import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EncIcon from '@material-ui/icons/EnhancedEncryption';
import DecIcon from '@material-ui/icons/NoEncryption';
import bigInt from 'big-integer';
import CryptoJS from "crypto-js";
const styles = {
  card: {
    width: '80%',
    margin: '20px 0',
  },
  toggle: {
    float: 'right',
  }
};

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encrypted: false,
      content: false,
    }
  }

  toggleEnc = (action) => {
    const { message, encrypted, appState } = this.props;
    if (encrypted && !this.state.content) {
      var bytes = CryptoJS.AES.decrypt(message, bigInt(appState.secretKey).toString(16));
      var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      this.setState({ content: plaintext });
    } else if (!encrypted && !this.state.content) {
      let ciphertext = CryptoJS.AES.encrypt(message, bigInt(appState.secretKey).toString(16)).toString();
      this.setState({ content: ciphertext });
    } else {
      this.setState({ content: false });
    }
  }

  render() {
    const { message, sent, classes } = this.props;
    return (
      <Card raised={true} className={classes.card} align="left">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>{sent ? 'Sent' : 'Received'}:</Typography>
          <Typography component="p">{this.state.content ? this.state.content : message}</Typography>
          <IconButton onClick={this.toggleEnc} className={classes.toggle} size="small" aria-label="Delete">{
            ((!this.state.content && sent) || (this.state.content && !sent)) ? <EncIcon /> : <DecIcon />
          }</IconButton>
        </CardContent>
      </Card>
    );
  }
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);