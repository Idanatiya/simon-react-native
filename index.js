/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';
import ThemeProvider from './src/app/ThemeProvider';

const SimonApp = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

AppRegistry.registerComponent(appName, () => SimonApp);
