import * as React from 'react';
import Router from 'router/Router';
import Toast from 'react-native-toast-message';
import {ErrorBoundary} from 'react-error-boundary';
import {navigate} from 'router/root-navigation';
import {RouteEndpoins} from 'router/route';
import FallBackCmp from './FallbackCmp';

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={FallBackCmp}
      onReset={() => navigate(RouteEndpoins.Menu as never)}>
      <Router />
      <Toast topOffset={100} />
    </ErrorBoundary>
  );
};

export default App;
