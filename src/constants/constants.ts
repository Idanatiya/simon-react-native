import {Color} from 'types/common';
export const COLORS = [Color.Blue, Color.Red, Color.Green, Color.Yellow];
export const USERS_KEY = '@users';

export const CARDS: {color: Color; audio: string}[] = [
  {
    color: Color.Blue,
    audio: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  },
  {
    color: Color.Green,
    audio: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  },
  {
    color: Color.Red,
    audio: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  },
  {
    color: Color.Yellow,
    audio: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
  },
];
