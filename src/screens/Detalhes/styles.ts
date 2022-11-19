import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons'
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const HeaderContainer = styled.View`
  width: 100%;
  height: 450px;;
`;

export const InfoContainer = styled.View`
  padding: 0px 35px;
`;

export const Nome = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 38px;
  color: ${({ theme }) => theme.colors.title};
`;

export const GeneroContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 10px;
`;

export const Genero = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 25px;
  color: ${({ theme }) => theme.colors.text};

  padding-right: 5px;
`;

export const Raca = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 25px;
  color: ${({ theme }) => theme.colors.text};

  margin-top: 10px;
`;

export const Data = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  
  margin-top: 15px;
`;

export const Icon = styled(Ionicons).attrs({
  size: 25,
  color: theme.colors.text
})``;