import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import MemoryIcon from '@material-ui/icons/Memory';
import SettingsIcon from '@material-ui/icons/Settings';
import MITMAIcon from '@material-ui/icons/TransferWithinAStation';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class SettingsDrawer extends React.Component {
  toggleMitma = () => {
    const { mitmaState, setRootState } = this.props;
    setRootState({ mitma: !mitmaState });
  }

  ChangePrime = (event) => {
    const { setRootState } = this.props;
    setRootState({ primeSize: event.target.value });
  }

  closeSettings = () => {
    const { setRootState } = this.props;
    setRootState({
      drawer: false
    });
  }

  render() {
    const { drawerState, mitmaState, primeSize } = this.props;

    return (
      <div>
        <Drawer open={drawerState} onClose={this.closeSettings}>
          <List>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Application Settings" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <MITMAIcon />
              </ListItemIcon>
              <ListItemText primary="MITMA Mode" />
              <ListItemSecondaryAction>
                <Switch
                  onChange={this.toggleMitma}
                  checked={mitmaState}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MemoryIcon />
              </ListItemIcon>
              <ListItemText primary="Prime Size" />
              <ListItemSecondaryAction>
                <Select className=""
                  value={primeSize}
                  onChange={this.ChangePrime}
                >
                  <MenuItem value={8}>8 bits</MenuItem>
                  <MenuItem value={16}>16 bits</MenuItem>
                  <MenuItem value={32}>32 bits</MenuItem>
                  <MenuItem value={64}>64 bits</MenuItem>
                  <MenuItem value={128}>128 bits</MenuItem>
                  <MenuItem value={256}>256 bits</MenuItem>
                  <MenuItem value={512}>512 bits</MenuItem>
                </Select>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

        </Drawer>
      </div>
    );
  }
}

export default SettingsDrawer;