import * as React from 'react';
import {TouchableOpacityProps, TextStyle} from 'react-native';
import styled, {css} from 'styled-components/native';

interface Props extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  textStyles?: TextStyle;
}

const Button = ({
  text,
  isLoading = false,
  disabled = false,
  textStyles,
  ...buttonProps
}: Props) => {
  return (
    <BaseButton disabled={disabled} {...buttonProps}>
      <ButtonText style={textStyles}>
        {isLoading ? 'Loading...' : text}
      </ButtonText>
    </BaseButton>
  );
};

const BaseButton = styled.TouchableOpacity<{disabled: boolean}>`
  padding: 10px;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  background: black;
  width: 100%;
  border-radius: 4px;
  ${({disabled}) =>
    disabled &&
    css`
      background: #b1b6b6;
    `}
`;

const ButtonText = styled.Text`
  font-size: ${({theme}) => theme.textSizes.l}px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

export default Button;
