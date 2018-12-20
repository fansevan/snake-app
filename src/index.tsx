import '@babel/polyfill';
import 'typeface-roboto';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core/styles';
import './index.css';
import store from './store';
import theme from './muiTheme';
import App from './components/App';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root') as HTMLElement
);
