import { TouchableOpacity } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';

import styled, { css } from 'styled-components/native';

interface ImageInputTextProps {
    isFilled: boolean;
}

interface GenderPickerProps extends PickerProps {
    generoFoiSelecionado: boolean;
}

export const Container = styled.View`
  height: 100%;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const FormContainer = styled.ScrollView.attrs({
    style: {
        width: '100%',
        height: 1000,

        alignItems: 'center',
    
        marginBottom: 40,
    }
})``;

export const Form = styled.View`
    width: 80%;

    align-self: center;
    align-items: center;

    margin-bottom: 40px;
`;

export const Fields = styled.View`

`;

export const ImageInput = styled(TouchableOpacity)`
    width: 340px;
    height: 40px;

    background-color: ${({ theme }) => theme.colors.primary};

    justify-content: center;

    margin-top: 15px;
    padding-left: 20px;

    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;

export const ImageInputText = styled.Text<ImageInputTextProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 15px;

    color: ${({ theme, isFilled }) => isFilled ? theme.colors.title : theme.colors.input}
`;

export const RegisterButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.primary_dark};

    margin-top: 30px;
    padding: 5px 60px;

    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`

export const TextRegisterButton = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 20px;
    color: ${({ theme }) => theme.colors.shape};
`
export const GenderPickerContainer = styled.View`
    margin-top: 15px;

    border-radius: 500px;
    overflow: hidden;

    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;

export const GenderPicker = styled(Picker)<GenderPickerProps>`
    width: 340px;
    height: 10px;

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 15px;

    background-color: ${({ theme }) => theme.colors.primary};

    padding: 10px;

    ${({ generoFoiSelecionado, theme }) => !generoFoiSelecionado && css`
        color: ${theme.colors.input}
    `}
`;

export const GenderPickerItem = styled(Picker.Item)``;

