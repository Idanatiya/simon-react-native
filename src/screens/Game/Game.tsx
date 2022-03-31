import * as React from 'react';
import styled from 'styled-components/native';
import {useToggle} from 'hooks/useToggle';
import {delay, getRandColor} from 'utils/util';
import {Color, AlertType, GameState} from 'types/common';
import {CARDS, COLORS} from 'constants/constants';
import {RouteEndpoins} from 'router/route';
import GameOverModal from './GameOverModal';
import {useNavigation} from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import CardColor from './CardColor';
import Button from 'components/Button';
import {TouchableOpacity} from 'react-native';

const initPlay = {
  userColors: [],
  isDisplayOn: false,
  colorSequence: [],
  level: 1,
};

const Game = () => {
  const {navigate} = useNavigation();
  const [isOpen, toggleModal] = useToggle();
  const [isGameOn, setIsGameOn] = React.useState(false);
  const [flashColor, setFlashColor] = React.useState('');
  const [gameState, setGameState] = React.useState<GameState>(initPlay);

  const initGame = () => {
    setIsGameOn(true);
    setGameState({
      ...gameState,
      isDisplayOn: true,
      colorSequence: [getRandColor(COLORS)],
      level: 1,
    });
    Toast.show({
      type: AlertType.Info,
      text1: '🦄 Game Has Started!',
    });
  };

  const restartGame = () => {
    toggleModal();
    setGameState(initPlay);
    Toast.show({
      type: AlertType.Info,
      text1: '🦄 Game Has Restarted!',
    });
  };

  React.useEffect(() => {
    const displayColors = async () => {
      const {colorSequence} = gameState;
      const colorsCopy = [...colorSequence];
      for (let i = 0; i < colorSequence.length; i++) {
        const currColor = colorSequence[i];
        await delay(700);
        setFlashColor(currColor);
        await delay(700);
        setFlashColor('');
        if (colorSequence.length - 1 === i) {
          setGameState({
            ...gameState,
            isDisplayOn: false,
            userColors: colorsCopy.reverse(),
          });
          Toast.show({
            type: AlertType.Info,
            text1: 'Your turn!',
            visibilityTime: 1000,
          });
        }
      }
    };
    if (isGameOn && gameState.isDisplayOn && gameState.colorSequence.length) {
      displayColors();
      Toast.show({
        type: AlertType.Info,
        text1: 'Computer displaying...',
        visibilityTime: 1000,
      });
    }
  }, [gameState, isGameOn]);

  const onPressCard = (color: Color) => {
    if (!gameState.isDisplayOn) {
      const userColorsCopy = [...gameState.userColors];
      const lastColor = userColorsCopy.pop();
      if (color !== lastColor) {
        setIsGameOn(false);
        return toggleModal();
      }
      if (userColorsCopy.length) {
        setGameState({...gameState, userColors: userColorsCopy});
      } else {
        setGameState({
          ...gameState,
          isDisplayOn: true,
          userColors: [],
          colorSequence: [...gameState.colorSequence, getRandColor(COLORS)],
          level: gameState.level + 1,
        });
      }
    }
  };
  return (
    <Root>
      <TouchableOpacity
        disabled={isGameOn}
        onPress={() => navigate(RouteEndpoins.Menu as never)}>
        <GoBackTxt>Go back to menu</GoBackTxt>
      </TouchableOpacity>
      {isGameOn && (
        <GameStats>
          <BastText>Level: {gameState.level}</BastText>
          <TurnTxt>{gameState.isDisplayOn ? '🖥️ turn' : 'Your turn!'}</TurnTxt>
        </GameStats>
      )}
      <ContainerRow>
        {CARDS.map(card => (
          <CardColor
            key={card.color}
            color={card.color}
            isOn={flashColor === card.color}
            disabled={!isGameOn || gameState.isDisplayOn}
            url={card.audio}
            onPress={() => onPressCard(card.color)}
          />
        ))}
      </ContainerRow>
      {!isGameOn && <StartGame text="Start" onPress={initGame} />}
      <GameOverModal
        level={gameState.level}
        isVisible={isOpen}
        toggleModal={toggleModal}
        onRestart={restartGame}
        onBackButtonPress={restartGame}
      />
    </Root>
  );
};
export default Game;

const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContainerRow = styled.View`
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StartGame = styled(Button)`
  margin-top: ${({theme}) => theme.spacing.m}px;
  background: ${({theme}) => theme.colors.blue};
  width: 50%;
`;

const BastText = styled.Text`
  font-size: ${({theme}) => theme.textSizes.xxl}px;
  color: ${({theme}) => theme.colors.darkBlue};
  font-weight: bold;
`;

const TurnTxt = styled(BastText)``;

const GameStats = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

const GoBackTxt = styled.Text`
  text-align: left;
  font-size: ${({theme}) => theme.textSizes.xl}px;
  margin: ${({theme}) => theme.spacing.l}px;
`;
