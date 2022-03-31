import * as React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import {RouteEndpoins} from 'router/route';
import {TouchableOpacity} from 'react-native';
import {User, AlertType} from 'types/common';
import UserItem from './UserItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from 'components/Button';
import Toast from 'react-native-toast-message';
import {shadow} from 'utils/util';

const LeaderBoard = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const {navigate} = useNavigation();
  React.useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await AsyncStorage.getItem('@users');
      if (usersData) {
        setUsers(JSON.parse(usersData));
      }
    };
    fetchUsers();
  }, []);

  const sortedUsers = React.useMemo(() => {
    return users?.sort((a, b) => b.level - a.level);
  }, [users]);

  const clearLeaderboard = async () => {
    try {
      await AsyncStorage.clear();
      setUsers([]);
      Toast.show({
        type: AlertType.Success,
        text1: '🦄 Leaderboard has been sucessfully cleaned!',
      });
    } catch (error) {
      Toast.show({
        type: AlertType.Error,
        text1: 'Something went wrong 😔',
      });
    }
  };

  return (
    <Root>
      <Header style={shadow()}>
        <BaseText>🔥 LeaderBoard</BaseText>
        <TouchableOpacity onPress={clearLeaderboard}>
          <BaseText>Clear</BaseText>
        </TouchableOpacity>
      </Header>
      <Body>
        {sortedUsers?.length === 0 && (
          <EmptyContainer>
            <NoFoundText>Leaderboard Is Empty</NoFoundText>
            <GoBackBtn
              text="Start Playing!"
              onPress={() => navigate(RouteEndpoins.GAME as never)}
            />
          </EmptyContainer>
        )}
        {sortedUsers?.map((user, idx) => (
          <UserItem
            isTopScore={idx === 0}
            key={`${user.name}-${idx}`}
            user={user}
            isStriped={idx % 2 === 0}
          />
        ))}
      </Body>
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  background: white;
  padding: 5px;
`;

const Header = styled.View`
  padding: ${({theme}) => theme.spacing.xl}px;
  border-bottom-width: 3px;
  border-bottom-color: #c7c7c7;
  flex-direction: row;
  justify-content: space-between;
`;

const BaseText = styled.Text`
  font-weight: bold;
  font-size: ${({theme}) => theme.textSizes.xl}px;
`;

const Body = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: '#f1f1f1',
    flexGrow: 1,
  },
})``;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const NoFoundText = styled(BaseText)`
  font-size: ${({theme}) => theme.textSizes.xl}px;
  margin-bottom: ${({theme}) => theme.spacing.l}px;
`;

const GoBackBtn = styled(Button).attrs({
  textStyles: {
    color: 'white',
  },
})`
  width: 50%;
  background: ${({theme}) => theme.colors.blue};
`;

export default LeaderBoard;
