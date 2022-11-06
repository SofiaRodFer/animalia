import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Control, FieldValues, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import PetService from '../../database/DatabaseService';

import { Header } from '../../components/Header';
import { Titulo } from '../../components/Titulo';
import { InputForm } from '../../components/Form/InputForm';

import {
    Container,
    Form,
    Fields,
    ImageInput,
    ImageInputText,
    RegisterButton,
    TextRegisterButton
} from './styles';
import { PetModel } from '../../models/PetModel';

interface FormData {
    nome: string;
    raca: string;
    dataNascimento: string;
    dataAdocao: string;
    genero: string;
    foto?: string;
}

interface RouteParams {
    pet: PetModel;
}

export function EdicaoDetalhes() {
    const route = useRoute()
    const { pet } = route.params as RouteParams

    const [foto, setFoto] = useState(pet.foto)


    const navigation = useNavigation()

    const schema = Yup.object().shape({
        nome: Yup
            .string(),
        raca: Yup
            .string(),
        dataNascimento: Yup
            .string(),
        dataAdocao: Yup
            .string(),
        genero: Yup
            .string(),
    })

    useFocusEffect(useCallback(() => {
        reset()
        setFoto('')
    }, []))

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema)
    })

    const formControl = control as unknown as Control<FieldValues, any>

    async function pegarPermissoes() {
        if(Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if(status !== 'granted') {
                alert('Permissões de acesso à biblioteca são necessárias!')
            }
        }
    }

    useEffect(() => {
        pegarPermissoes()
    }, [])

    async function escolherImagem() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
          setFoto(result.uri);
        }
    } 

    async function handleEditar(form: FormData) {
        const petEditado = {
            id: pet.id,
            nome: form.nome ? form.nome.trim() : pet.nome,
            raca: form.raca ? form.raca.trim() : pet.raca,
            dataNascimento: form.dataNascimento ? form.dataNascimento.trim() : pet.dataNascimento,
            dataAdocao: form.dataAdocao ? form.dataAdocao.trim() : pet.dataAdocao,
            genero: form.genero ? form.genero.trim() : pet.genero,
            foto: foto ? foto : pet.foto
        }

        try {
            const banco = new PetService()

            console.log('acima', petEditado)

            await banco.Atualizar(petEditado)

            reset()
            setFoto('')
    
            navigation.navigate('Editar')
        } catch (error) {
            Alert.alert('Não foi possível editar')
        }
    }

  return (
    <Container>
        <Header />
        <Titulo tituloProp="Editar pet" />

        <Form>
            <Fields>
                <InputForm 
                    placeholder='Nome...'
                    control={formControl}
                    name="nome"
                    autoCapitalize='words'
                    autoCorrect={false}
                    defaultValue={pet.nome}
                />

                <InputForm 
                    placeholder='Raça...'
                    control={formControl}
                    name="raca"
                    autoCapitalize='words'
                    autoCorrect={true}
                    defaultValue={pet.raca}
                />

                <InputForm 
                    placeholder='Data de nascimento...'
                    control={formControl}
                    name="dataNascimento"
                    defaultValue={pet.dataNascimento}
                />

                <InputForm 
                    placeholder='Data de adoção...'
                    control={formControl}
                    name="dataAdocao"
                    defaultValue={pet.dataAdocao}
                />

                <InputForm 
                    placeholder='Gênero...'
                    control={formControl}
                    name="genero"
                    autoCapitalize='words'
                    autoCorrect={true}
                    defaultValue={pet.genero}
                />

                <ImageInput onPress={escolherImagem}>
                    <ImageInputText>{foto ? 'Imagem selecionada!' : 'Selecione uma imagem...'}</ImageInputText>
                </ImageInput>
            </Fields>
            <RegisterButton onPress={handleSubmit(handleEditar)}>
                <TextRegisterButton>editar</TextRegisterButton>
            </RegisterButton>
        </Form>
    </Container>
  );
}