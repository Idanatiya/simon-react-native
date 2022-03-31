import * as React from 'react';
import {User} from 'types/common';
import styled from 'styled-components/native';

interface Props {
  user: User;
  isTopScore: boolean;
  isStriped: boolean;
}

const UserItem = ({user, isStriped, isTopScore}: Props) => {
  return (
    <Container isStriped={isStriped} isTopScore={isTopScore}>
      <Username isTopScore={isTopScore}>
        {isTopScore && '🏆'}
        {user.name}
      </Username>
      <Level>{user.level}</Level>
    </Container>
  );
};

const Container = styled.View<{isStriped: boolean; isTopScore: boolean}>`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({isStriped, theme}) =>
    isStriped && `background: ${theme.colors.lightWhite}`}
  ${({isTopScore, theme}) => isTopScore && `background: ${theme.colors.gold}`}
`;

const Username = styled.Text<{isTopScore: boolean}>`
  font-weight: bold;
  color: ${({isTopScore}) => (isTopScore ? 'white' : 'black')};
`;

const Level = styled.Text``;

export default UserItem;
