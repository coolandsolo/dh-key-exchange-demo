import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  chip: {
    height: 60,
    paddingRight: '30px',
  },
  grow: {
    flexGrow: 1,
    fontWeight: 300,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { socket, classes, setRootState, appState } = props;

  let refreshPage = () => {
    socket.emit('execute', { action: 'reset', body: true });
  }

  let toggleSettings = () => {
    setRootState({
      drawer: true
    });
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleSettings}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" align="left" className={classes.grow}>
            Diffie-Hellman Key Exchange Demo Application
          </Typography>
          <Button color="inherit" onClick={refreshPage}>Reload</Button>
        </Toolbar>
      </AppBar>

      <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.chip}>
        <Grid item>
          {appState && appState.name ?
            <Chip
              avatar={<Avatar><FaceIcon /></Avatar>}
              label={appState.name}
              color="secondary"
            /> : null}
        </Grid>
      </Grid>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);