import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import classNames from 'classnames';

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 16,
    paddingBottom: 16,
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    fontWeight: 100,
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
});


class SettingsDrawer extends React.Component {
  
  closeSettings = () => {
    const { setRootState } = this.props;
    setRootState({
      drawer: false
    });
  }

  render() {
    const { classes, drawerState } = this.props;

    return (
      <div>
        <Drawer open={drawerState} onClose={this.closeSettings}>
          <List disablePadding>
            <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
              Group 6 Demo Application
            </ListItem>
            <ListItem className={classNames(classes.item, classes.itemCategory)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                App Settings
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

SettingsDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsDrawer);