import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import styled from 'styled-components/native';

interface ImageInputTextProps {
    isNotFilled: boolean;
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

    color: ${({ theme, isNotFilled }) => isNotFilled ?theme.colors.input  : theme.colors.title}
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

export const GenderPicker = styled(Picker)`
    width: 340px;
    height: 10px;

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 15px;

    background-color: ${({ theme }) => theme.colors.primary};

    padding: 10px;
`;

export const GenderPickerItem = styled(Picker.Item)``;

