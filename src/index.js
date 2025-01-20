import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'
import {persistor, store} from "./stores/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {createTheme, ThemeProvider} from "@mui/material";
import MainRouter from "./routes";
import {BrowserRouter} from "react-router-dom";


const theme = createTheme({
    typography: {
        h5: {
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '26px !important',
        },
        h4: {
            fontSize: '22px',
            fontWeight: '500',
            lineHeight: '26px !important',
        },
        palette: {
            type: 'light',
            primary: {
              main: '#3f51b5',
            },
            secondary: {
              main: '#f50057',
            },
          },
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <MainRouter />
                    </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);


reportWebVitals();
