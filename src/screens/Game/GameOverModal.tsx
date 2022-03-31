import * as React from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {RouteEndpoins} from 'router/route';
import {USERS_KEY} from 'constants/constants';
import {ModalPropsOptional, User, AlertType} from 'types/common';
import GenericModal from 'components/GenericModal';
import Toast from 'react-native-toast-message';
import Button from 'components/Button';

interface Props extends ModalPropsOptional {
  toggleModal: () => void;
  isVisible: boolean;
  onRestart: () => void;
  level: number;
}

const GameOverModal = ({
  toggleModal,
  isVisible,
  onRestart,
  level,
  ...modalProps
}: Props) => {
  const inputRef = React.useRef<TextInput>(null);
  const [name, setName] = React.useState('');
  const {navigate} = useNavigation();
  const [maxLevel, setMaxLevel] = React.useState<number>(1);

  console.log({maxLevel, level});

  React.useEffect(() => {
    const getCurrMaxLvl = async () => {
      try {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        if (usersJson) {
          const users = JSON.parse(usersJson) as User[];
          const lvl = users.reduce(
            (a, b) => (a.level > b.level ? a : b),
            {} as User,
          ).level;
          setMaxLevel(lvl ?? 0);
        }
      } catch (error) {}
    };
    getCurrMaxLvl();
  }, [maxLevel]);

  const addUser = async () => {
    const newUser = {name, level};
    try {
      const users = await AsyncStorage.getItem(USERS_KEY);
      if (!users) {
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify([newUser]));
      } else {
        await AsyncStorage.setItem(
          USERS_KEY,
          JSON.stringify([...JSON.parse(users), newUser]),
        );
      }
    } catch (error) {
      Toast.show({
        type: AlertType.Error,
        text1: 'Could not add user',
      });
    }
    navigate(RouteEndpoins.LEADER_BOARD as never);
    toggleModal();
  };

  return (
    <GenericModal
      toggleModal={toggleModal}
      isVisible={isVisible}
      hasBackdrop
      onModalShow={() => inputRef?.current?.focus()}
      onModalHide={() => setName('')}
      {...modalProps}>
      <ModalRoot>
        <InfoContainer>
          <Title>💩 You Lost 💩</Title>
        </InfoContainer>
        {level > maxLevel && (
          <>
            <NewRecord>New Record!</NewRecord>
            <Form>
              <Input
                ref={inputRef}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Type Name..."
              />
              <SubmitBtn text="🎉 Confirm" onPress={addUser} disabled={!name} />
            </Form>
          </>
        )}
        <Footer>
          <OutlineBtn text="Restart Game!" onPress={onRestart} />
          <OutlineBtn
            text="Leaderboard"
            onPress={() => {
              toggleModal();
              navigate(RouteEndpoins.LEADER_BOARD as never);
            }}
          />
        </Footer>
      </ModalRoot>
    </GenericModal>
  );
};

const ModalRoot = styled.View`
  min-height: 60%;
  padding: ${({theme}) => theme.spacing.m}px;
`;

const InfoContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: ${({theme}) => theme.textSizes.xxl}px;
  font-weight: bold;
`;

const Form = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: ${({theme}) => theme.spacing.l}px;
  border: 2px solid black;
`;

const Input = styled.TextInput`
  padding: ${({theme}) => theme.spacing.l}px;
  background: white;
  width: 60%;
`;

const SubmitBtn = styled(Button).attrs({
  textStyles: {
    color: 'white',
  },
})`
  width: 40%;
  border-radius: 0;
`;

const OutlineBtn = styled(Button).attrs({
  textStyles: {
    color: 'black',
  },
})`
  margin-top: ${({theme}) => theme.spacing.l}px;
  background: white;
  border: 1px solid black;
`;

const NewRecord = styled.Text`
  font-weight: bold;
  color: ${({theme}) => theme.colors.darkBlue};
  text-align: center;
`;

const Footer = styled.View``;

export default GameOverModal;
