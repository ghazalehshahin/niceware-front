import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import getTheme from './styles/getTheme';
import store from './service/store'
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
            <ThemeProvider theme={getTheme()}>
                <App />
            </ThemeProvider>
        </Provider>
    </SnackbarProvider>
, document.getElementById('root'));
