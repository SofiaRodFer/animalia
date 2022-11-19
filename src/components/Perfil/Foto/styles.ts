import styled from 'styled-components/native';

export const ColorContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const ImagemContainer = styled.View`
  width: 100%;
  height: 280px;
  background-color: ${({ theme }) => theme.colors.primary};

`;

export const Imagem = styled.Image`
  width: 100%;
  height: 280px;

  border-top-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
  border-top-color: white;
  border-left-color: white;
  border-right-color: white;
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
`;

