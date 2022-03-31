import {ModalProps} from 'react-native-modal';

export enum Color {
  Yellow = 'yellow',
  Blue = 'blue',
  Red = 'red',
  Green = 'green',
}

export type ModalPropsOptional = Partial<ModalProps> &
  Pick<ModalProps, 'isVisible'>;

export interface User {
  level: number;
  name: string;
}

export enum AlertType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export interface GameState {
  userColors: string[];
  isDisplayOn: boolean;
  colorSequence: string[];
  level: number;
}
