import * as React from 'react';
import {FallbackProps} from 'react-error-boundary';
import styled from 'styled-components/native';
import Button from 'components/Button';

const FallBackCmp = ({error: _e, resetErrorBoundary}: FallbackProps) => (
  <Container>
    <Label>Something went wrong 😅</Label>
    <Button text="Go back to menu" onPress={resetErrorBoundary} />
  </Container>
);

export default FallBackCmp;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Label = styled.Text`
  color: ${({theme}) => theme.colors.darkBlue};
  font-size: ${({theme}) => theme.textSizes.xl}px;
  margin: ${({theme}) => theme.spacing.m}px;
`;
