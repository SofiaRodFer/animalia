import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import { PetModel } from '../../models/PetModel';

import {
    Container,
    ImageContainer,
    Image,
    TextContainer,
    InfoContainer,
    Nome,
    Info
} from './styles';

interface PetProps {
    pet: PetModel;
}

export function Pet({ pet }: PetProps) {
    const navigation = useNavigation()

    function pegarAnos(data: string) {
        const arrayData = data.split('/');
        const anoAtual = new Date().getFullYear();

        const idade = anoAtual - parseInt(arrayData[2]);      

        return idade;
    }

    function handlePress() {
        navigation.navigate('Detalhes', { pet })
    }

    return (
        <Container onPress={handlePress}>
            <ImageContainer>
                <Image
                    source={pet.foto === undefined || pet.foto === null ? require('../../assets/padrao.png') : {uri: pet.foto}}
                />
            </ImageContainer>
            <TextContainer style={{
                shadowColor: 'black',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 60,
                elevation: 4,
            }}>
                <InfoContainer>
                    <Nome numberOfLines={1}>
                        {pet.nome}
                    </Nome>
                    <Info numberOfLines={1}>
                        {pet.raca}
                        { pet.genero.toLowerCase() === 'feminino' 
                            ? <MaterialCommunityIcons name="gender-female" size={14} />
                            : <MaterialCommunityIcons name="gender-male" size={14} />
                        }
                    </Info>
                    <Info>
                        {`${pegarAnos(pet.dataNascimento)} ${pegarAnos(pet.dataNascimento) !== 1 ? 'anos' : 'ano'}`}
                    </Info>
                    <Info>
                        {`${pet.genero.toLowerCase() === 'feminino' ? 'Adotada' : 'Adotado'} há ${pegarAnos(pet.dataAdocao)} ${pegarAnos(pet.dataAdocao) !== 1 ? 'anos' : 'ano'}`}
                    </Info>
                </InfoContainer>
            </TextContainer>
        </Container>
    );
}