import * as React from 'react';
import styled, {css} from 'styled-components/native';
import {TouchableOpacityProps} from 'react-native';
import {Color} from 'types/common';
import {shadow} from 'utils/util';
import useSound from 'react-native-use-sound';
import theme from 'styles/theme';

interface Props extends TouchableOpacityProps {
  color: string;
  isOn: boolean;
  url: string;
}

const CardColor = ({color, isOn, url, ...props}: Props) => {
  const [play] = useSound(url);
  React.useEffect(() => {
    if (isOn) {
      play();
    }
  }, [isOn, play]);
  return <BaseButton style={shadow()} color={color} isOn={isOn} {...props} />;
};

const BaseButton = styled.TouchableOpacity<{isOn: boolean; color: string}>`
  width: 150px;
  height: 150px;
  border: ${({isOn}) => (isOn ? '4px solid white' : 'none')}
    ${({color, isOn}) =>
      color &&
      {
        [Color.Blue]: css`
          background: ${isOn ? theme.colors.blueCard : 'blue'};
          border-top-left-radius: 15px;
        `,
        [Color.Green]: css`
          background: ${isOn ? theme.colors.greenCard : 'green'};
          border-top-right-radius: 15px;
        `,
        [Color.Red]: css`
          background: ${isOn ? theme.colors.redCard : 'red'};
          border-bottom-left-radius: 15px;
        `,
        [Color.Yellow]: css`
        background: ${isOn ? theme.colors.yellowCard : 'yellow'}
        border-bottom-right-radius: 15px;
      `,
      }[color]};
`;

export default CardColor;
