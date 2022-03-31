import * as React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import {AlertType} from 'types/common';
import {RouteEndpoins} from 'router/route';
import Button from 'components/Button';
import Toast from 'react-native-toast-message';

const Menu = () => {
  const {navigate} = useNavigation();

  const openLinkedin = async () => {
    try {
      await Linking.openURL(
        'https://www.linkedin.com/in/idan-atiya-0505911b2/',
      );
    } catch (e) {
      Toast.show({
        type: AlertType.Error,
        text1: 'Something went wrong..',
      });
    }
  };
  return (
    <Root>
      <Container>
        <Logo source={require('assets/logo.png')} />
      </Container>
      <Btn
        text="🎮 Start to play"
        onPress={() => navigate(RouteEndpoins.GAME as never)}
      />
      <LeaderBoardBtn
        text="Leaderboard"
        onPress={() => navigate(RouteEndpoins.LEADER_BOARD as never)}
      />
      <Container>
        <TouchableOpacity onPress={openLinkedin}>
          <StyledText>Made by Idan Atiya</StyledText>
        </TouchableOpacity>
      </Container>
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  margin-top: 20px;
`;
const Btn = styled(Button)`
  width: 70%;
  margin: ${({theme}) => theme.spacing.m}px;
  background: ${({theme}) => theme.colors.darkBlue};
`;

const LeaderBoardBtn = styled(Btn)`
  background: ${({theme}) => theme.colors.gold};
`;

const Logo = styled.Image`
  width: 180px;
  height: 180px;
`;

const StyledText = styled.Text`
  font-size: ${({theme}) => theme.textSizes.xl}px;
  font-weight: bold;
`;

export default Menu;
