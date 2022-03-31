import * as React from 'react';
import theme from 'styles/theme';
import {ThemeProvider as StyledComponentsProvider} from 'styled-components';

const ThemeProvider: React.FC = ({children}) => {
  return (
    <StyledComponentsProvider theme={theme}>
      {children}
    </StyledComponentsProvider>
  );
};

export default ThemeProvider;
