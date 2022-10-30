import styled from 'styled-components/native';
import Constants from 'expo-constants'

export const Container = styled.View`
  width: 100%;
  height: ${Constants.statusBarHeight + 120}px;

  background-color: ${({ theme }) => theme.colors.primary};;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding-top: 25px;
  padding-bottom: 5px;
`;

export const Image = styled.Image`
  width: 72px;
  height: 72px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-size: 36px;
  color: ${({ theme }) => theme.colors.secondary};

  margin-left: 10px;

  text-shadow: ${({ theme }) => theme.colors.shadow} 1px 1px 1px;
`;