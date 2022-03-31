import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const getCurrentRoute = navigationRef.getCurrentRoute;

export const navigate = (name: never, props?: never) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, props as never);
  }
};
