import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getSocket from './socket/Client.js';


const socket = getSocket;
// const theme = createMuiTheme({
//     palette: {
//         // type: 'dark',
//     },
//     typography: {
//         useNextVariants: true,
//     },
// });

let theme = createMuiTheme({
    typography: {
      useNextVariants: true,
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
  
  theme = {
    ...theme,
    overrides: {
      MuiDrawer: {
        paper: {
          backgroundColor: '#18202c',
        },
      },
      MuiButton: {
        label: {
          textTransform: 'initial',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
      MuiTabs: {
        root: {
          marginLeft: theme.spacing.unit,
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
      MuiTab: {
        root: {
          textTransform: 'initial',
          margin: '0 16px',
          minWidth: 0,
          [theme.breakpoints.up('md')]: {
            minWidth: 0,
          },
        },
        labelContainer: {
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
          },
        },
      },
      MuiIconButton: {
        root: {
          padding: theme.spacing.unit,
        },
      },
      MuiTooltip: {
        tooltip: {
          borderRadius: 4,
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: '#404854',
        },
      },
      MuiListItemText: {
        primary: {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      MuiListItemIcon: {
        root: {
          color: 'inherit',
          marginRight: 0,
          '& svg': {
            fontSize: 20,
          },
        },
      },
      MuiAvatar: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
    props: {
      MuiTab: {
        disableRipple: true,
      },
    },
    mixins: {
      ...theme.mixins,
      toolbar: {
        minHeight: 48,
      },
    },
  };

function Root() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App getSocket={socket}/>
        </MuiThemeProvider>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
