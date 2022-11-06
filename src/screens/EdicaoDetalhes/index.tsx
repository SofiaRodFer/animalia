import React, { useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

interface FormData {
    nome: string;
    raca: string;
    dataNascimento: string;
    dataAdocao: string;
    genero: string;
    foto?: string;
}

export function EdicaoDetalhes() {
    const [foto, setFoto] = useState('')
    const navigation = useNavigation()

    const schema = Yup.object().shape({
        nome: Yup
            .string()
            .required('Insira um nome!'),
        raca: Yup
            .string()
            .required('Insira uma raça!'),
        dataNascimento: Yup
            .string()
            .required('Insira uma data!'),
        dataAdocao: Yup
            .string()
            .required('Insira uma data!'),
        genero: Yup
            .string()
            .required('Insira um gênero!'),
      })

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

    async function handleCadastro(form: FormData) {
        const newPet = {
            nome: form.nome.trim(),
            raca: form.raca.trim(),
            dataNascimento: form.dataNascimento.trim(),
            dataAdocao: form.dataAdocao.trim(),
            genero: form.genero.trim(),
            foto: foto ? foto : undefined
        }

        try {
            const banco = new PetService()

            await banco.Inserir(newPet)

            reset()
            setFoto('')

            navigation.navigate('Home')
        } catch (error) {
            Alert.alert('Não foi possível salvar')
        }
    }

  return (
    <Container>
        <Header />
        <Titulo tituloProp="Cadastrar pets" />

        <Form>
            <Fields>
                <InputForm 
                    placeholder='Nome...'
                    control={formControl}
                    name="nome"
                    autoCapitalize='words'
                    autoCorrect={false}
                />

                <InputForm 
                    placeholder='Raça...'
                    control={formControl}
                    name="raca"
                    autoCapitalize='words'
                    autoCorrect={true}
                />

                <InputForm 
                    placeholder='Data de nascimento...'
                    control={formControl}
                    name="dataNascimento"
                />

                <InputForm 
                    placeholder='Data de adoção...'
                    control={formControl}
                    name="dataAdocao"
                />

                <InputForm 
                    placeholder='Gênero...'
                    control={formControl}
                    name="genero"
                    autoCapitalize='words'
                    autoCorrect={true}
                />

                <ImageInput onPress={escolherImagem}>
                    <ImageInputText>{foto ? 'Imagem selecionada!' : 'Selecione uma imagem...'}</ImageInputText>
                </ImageInput>
            </Fields>
            <RegisterButton onPress={handleSubmit(handleCadastro)}>
                <TextRegisterButton>cadastrar</TextRegisterButton>
            </RegisterButton>
        </Form>
    </Container>
  );
}