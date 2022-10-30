import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 24px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Button = styled.View`
    width: 60%;
    height: 30px;

    background-color: ${({ theme }) => theme.colors.primary};

    justify-content: center;
    align-items: center;

    margin-top: 8px;

    border-radius: 70px;
`;

export const ButtonText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 20px;
    color: ${({ theme }) => theme.colors.shape};
`;