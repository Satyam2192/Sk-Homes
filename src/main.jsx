import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./Dashboard/context";

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <ThemeProvider>
      <MaterialTailwindControllerProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </MaterialTailwindControllerProvider>
    </ThemeProvider>
  </MantineProvider>,
  document.getElementById('root')
);
