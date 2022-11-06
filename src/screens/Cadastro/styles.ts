import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

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

export const ImageInputText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 15px;
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
