import styled from 'styled-components/native';

import { TextInput } from 'react-native';

export const Container = styled.View`
    width: 100%;
`;

export const Input = styled(TextInput)`
    width: 340px;
    height: 40px;

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 15px;

    background-color: ${({ theme }) => theme.colors.primary};

    margin-top: 15px;
    padding-left: 20px;

    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;