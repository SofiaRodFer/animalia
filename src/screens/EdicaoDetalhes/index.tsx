import React, { useEffect, useState } from 'react';
import { Alert, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Control, FieldValues, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from 'styled-components';
import dayjs from 'dayjs';

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
    TextRegisterButton,
    GenderPickerContainer,
    GenderPicker,
    GenderPickerItem
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

    const [foto, setFoto] = useState('')

    const [datePickerNascimento, setDatePickerNascimento] = useState(false);
    const [dateNascimento, setDateNascimento] = useState(new Date());

    const [datePickerAdocao, setDatePickerAdocao] = useState(false);
    const [dateAdocao, setDateAdocao] = useState(new Date());

    const [genero, setGenero] = useState('');

    const navigation = useNavigation()
    const theme = useTheme()

    const schema = Yup.object().shape({
        nome: Yup
            .string()
            .required('Insira um nome!'),
        raca: Yup
            .string()
            .required('Insira uma raça!')
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

        const { uri } = result as ImagePicker.ImageInfo

        if(result.cancelled) {
            return
        }

        if (!result.cancelled) {
          setFoto(uri);
        }
    } 

    async function handleEditar(form: FormData) {
        const petEditado = {
            id: pet.id,
            nome: form.nome ? form.nome.trim() : pet.nome,
            raca: form.raca ? form.raca.trim() : pet.raca,
            dataNascimento: dayjs(dateNascimento).format('DD/MM/YYYY').toString(),
            dataAdocao: dayjs(dateAdocao).format('DD/MM/YYYY').toString(),
            genero,
            foto: foto ? foto : pet.foto
        }

        try {
            await schema.validate(petEditado)

            const banco = new PetService()

            await banco.Atualizar(petEditado)

            reset()
            setFoto('')
            setDateNascimento(new Date(pet.dataNascimento))
            setDateAdocao(new Date(pet.dataAdocao))
    
            navigation.navigate('Editar')
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                Alert.alert('Opa!', error.message)
            }
            Alert.alert('Opa!', 'Não foi possível editar')
        }
    }

    function showDatePickerNascimento() {
        setDatePickerNascimento(true);
    };
    
    function onDateSelectedNascimento(event, value) {
        setDateNascimento(value);
        setDatePickerNascimento(false);
    };

    function showDatePickerAdocao() {
        setDatePickerAdocao(true);
    };
    
    function onDateSelectedAdocao(event, value) {
        setDateAdocao(value);
        setDatePickerAdocao(false);
    };

  return (
    <KeyboardAvoidingView  behavior="position" enabled style={{ backgroundColor: theme.colors.shape}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

                        {datePickerNascimento && (
                          <RNDateTimePicker
                            value={dateNascimento}
                            mode={'date'}
                            display="default"
                            is24Hour={true}
                            onChange={onDateSelectedNascimento}
                          />
                        )}

                        <ImageInput onPress={showDatePickerNascimento}>
                            <ImageInputText>
                                {
                                    dateNascimento.getDate() === new Date().getDate() 
                                    ? pet.dataNascimento
                                    : dayjs(String(dateNascimento)).format('DD/MM/YYYY') 
                                }
                            </ImageInputText>
                        </ImageInput>

                        {datePickerAdocao && (
                          <RNDateTimePicker
                            value={dateAdocao}
                            mode={'date'}
                            display="default"
                            is24Hour={true}
                            onChange={onDateSelectedAdocao}
                          />
                        )}

                        <ImageInput onPress={showDatePickerAdocao}>
                            <ImageInputText>
                                {
                                    dateAdocao.getDate() === new Date().getDate() 
                                    ? pet.dataAdocao 
                                    : dayjs(String(dateAdocao)).format('DD/MM/YYYY') 
                                }
                            </ImageInputText>
                        </ImageInput>

                        <GenderPickerContainer>
                            <GenderPicker
                                selectedValue={genero === '' ? pet.genero : genero}
                                onValueChange={(itemValue, itemIndex) => {
                                    setGenero(itemValue)
                                }}
                            >
                                <GenderPickerItem label="Feminino" value="feminino" />
                                <GenderPickerItem label="Masculino" value="masculino" />
                            </GenderPicker>
                        </GenderPickerContainer>

                        <ImageInput onPress={escolherImagem}>
                            <ImageInputText isNotFilled={pet.foto === null && foto === ''}>
                                {pet.foto === null && foto === '' ? 'Selecione uma imagem...' : 'Imagem selecionada!'}
                            </ImageInputText>
                        </ImageInput>
                    </Fields>
                    <RegisterButton onPress={handleSubmit(handleEditar)}>
                        <TextRegisterButton>editar</TextRegisterButton>
                    </RegisterButton>
                </Form>
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}