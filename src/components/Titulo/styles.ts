import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;

    background-color: ${({ theme }) => theme.colors.shape};;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-top-width: 2px;
    border-left-width: 2px;
    border-right-width: 2px;
    border-top-color: white;
    border-left-color: white;
    border-right-color: white;
    border-top-left-radius: 45px;
    border-top-right-radius: 45px;

    box-shadow: ${({ theme }) => theme.colors.shadow} 2px 2px 2px;
`;

export const ColorContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const TituloComponent = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};;
    font-size: 25px;
    color: ${({ theme }) => theme.colors.title};;

    padding-top: 15px;
`;
