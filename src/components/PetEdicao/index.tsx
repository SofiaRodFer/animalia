import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import PetService from '../../database/DatabaseService';
import { PetModel } from '../../models/PetModel';

import { 
    ContainerFoto,
    Image,
    ContainerTexto,
    ContainerInfo,
    Nome,
    Icon,
    Botoes,
    Botao,
    Trash,
    Pencil,
} from './styles';

interface PetProps {
    pet: PetModel;
}

export function PetEdicao({ pet }: PetProps) {
    const [foiDeletado, setFoiDeletado] = useState(false)
    const iconGenero = pet.genero.toLowerCase() === 'feminino' ? <Icon name="female" /> : <Icon name="male" />

    const { navigate } = useNavigation()

    function handleRemover(id: number) {        
        const banco = new PetService()
        banco.Deletar(id);

        setFoiDeletado(true)
    }

    function tirarVisibilidade() {
        if (foiDeletado) {
            return {visibility: 'hidden', opacity: 0, position: 'absolute', zIndex: 0};
        }
    }

  return (
    <View style={[styles.container, tirarVisibilidade()]}>
        <ContainerFoto>
            <Image
                source={pet.foto === undefined || pet.foto === null ? require('../../assets/padrao.png') : {uri: pet.foto}}
            />
        </ContainerFoto>
        <ContainerTexto style={{
            shadowColor: 'black',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 60,
            elevation: 4,
        }}>
            <ContainerInfo>
                <Nome numberOfLines={1}>
                    {pet.nome} {iconGenero}
                </Nome>
                <Botoes>
                    <Botao onPress={() => handleRemover(Number(pet.id))}>
                        <Trash name="md-trash" size={35} />
                    </Botao>
                    <Botao onPress={() => {
                        navigate('EdicaoDetalhes', { pet });
                    }}>
                        <Pencil name="pencil" size={35} />
                    </Botao>
                </Botoes>
            </ContainerInfo>
        </ContainerTexto>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    
        marginTop: 20,
    }
})