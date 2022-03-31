import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Game from 'screens/Game/Game';
import {RouteEndpoins, AppStackRoutes} from './route';
import {navigationRef} from './root-navigation';
import LeaderBoard from 'screens/LeaderBoard/LeaderBoard';
import Menu from 'screens/Menu/Menu';

const AppStack = createNativeStackNavigator<AppStackRoutes>();

const Router = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={RouteEndpoins.Menu}>
        <AppStack.Screen name={RouteEndpoins.Menu} component={Menu} />
        <AppStack.Screen name={RouteEndpoins.GAME} component={Game} />
        <AppStack.Screen
          options={{headerShown: true}}
          name={RouteEndpoins.LEADER_BOARD}
          component={LeaderBoard}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
