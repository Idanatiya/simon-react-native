import {ShadowStyleIOS} from 'react-native';
interface Shadow extends ShadowStyleIOS {
  elevation?: number;
}
export const getRandColor = <T>(arr: T[]) => {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};

export const delay = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const shadow = ({
  shadowColor = '#000',
  shadowOffset = {width: 0, height: 2},
  shadowOpacity = 0.25,
  shadowRadius = 2.65,
  elevation = 3,
}: Shadow = {}): object => ({
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
  elevation,
});

export {shadow};
