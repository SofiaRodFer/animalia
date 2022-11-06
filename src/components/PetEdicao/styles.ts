import styled from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export const ContainerFoto = styled.View``;

export const Image = styled.Image`
    width: 120px;
    height: 120px;

    border-bottom-left-radius: 23px;
    border-top-left-radius: 23px;
    border-top-right-radius: 13px;
`;

export const ContainerTexto = styled.View`
    height: 90%;

    background-color: ${({ theme }) => theme.colors.shape};
    box-shadow: 10px 10px ${({ theme }) => theme.colors.shadow};

    flex-direction: row;
    align-items: flex-end;

    padding-right: 10px;

    border-top-right-radius: 23px;
    border-bottom-right-radius: 23px;
`;


export const ContainerInfo = styled.View`
    width: 145px;

    margin-left: 15px;
    margin-bottom: 10px;    
`;

export const Nome = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 23px;
    color: ${({ theme }) => theme.colors.title};

    /* margin-bottom: 5px; */

    flex-wrap: wrap;
`;

export const Icon = styled(Ionicons)`
    width: 17px;
    height: 17px;
`;

export const Botoes = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    margin-top: 10px;
`;

export const Botao = styled(TouchableOpacity)``;

export const Trash = styled(Ionicons)`
    opacity: 0.8;
`;

export const Pencil = styled(MaterialCommunityIcons)`
    opacity: 0.8;
`;