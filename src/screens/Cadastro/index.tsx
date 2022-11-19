import React, { useEffect, useState } from 'react';
import { Alert, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useNavigation } from '@react-navigation/native';
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
    GenderPicker,
    GenderPickerContainer,
    GenderPickerItem
} from './styles';

interface FormData {
    nome: string;
    raca: string;
    dataNascimento: string;
    dataAdocao: string;
    genero: string;
    foto?: string;
}

export function Cadastro() {
    const [foto, setFoto] = useState('')

    const [datePickerNascimento, setDatePickerNascimento] = useState(false);
    const [dateNascimento, setDateNascimento] = useState(new Date());

    const [datePickerAdocao, setDatePickerAdocao] = useState(false);
    const [dateAdocao, setDateAdocao] = useState(new Date());

    const [genero, setGenero] = useState('');
    const [generoFoiSelecionado, setGeneroFoiSelecionado] = useState(false)

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

    async function handleCadastro(form: FormData) {
        const newPet = {
            nome: form.nome.trim(),
            raca: form.raca.trim(),
            dataNascimento: dayjs(dateNascimento).format('DD/MM/YYYY').toString(),
            dataAdocao: dayjs(dateAdocao).format('DD/MM/YYYY').toString(),
            genero,
            foto: foto ? foto : undefined
        }

        try {
            await schema.validate(newPet)

            const banco = new PetService()

            await banco.Inserir(newPet)

            reset()
            setFoto('')
            setDateNascimento(new Date())
            setDateAdocao(new Date())

            navigation.navigate('Home')
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                Alert.alert('Opa!', error.message)
            }
            Alert.alert('Opa!', 'Não foi possível salvar')
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
    <KeyboardAvoidingView behavior="position" enabled style={{ backgroundColor: theme.colors.shape}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            <ImageInputText isFilled={dateNascimento.getDate() !== new Date().getDate()}>
                                {
                                    dateNascimento.getDate() === new Date().getDate() 
                                    ? 'Data de nascimento...' 
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
                            <ImageInputText isFilled={dateAdocao.getDate() !== new Date().getDate()} >
                                {
                                    dateAdocao.getDate() === new Date().getDate() 
                                    ? 'Data de adoção...' 
                                    : dayjs(String(dateAdocao)).format('DD/MM/YYYY') 
                                }
                            </ImageInputText>
                        </ImageInput>

                        <GenderPickerContainer>
                            <GenderPicker
                                selectedValue={genero}
                                onValueChange={(itemValue, itemIndex) => {
                                    setGenero(itemValue)
                                    setGeneroFoiSelecionado(true)
                                }}
                                generoFoiSelecionado={generoFoiSelecionado}
                            >
                                <GenderPickerItem label="Gênero..." enabled={false} />
                                <GenderPickerItem label="Fêmea" value="feminino" />
                                <GenderPickerItem label="Macho" value="masculino" />
                            </GenderPicker>
                        </GenderPickerContainer>

                        <ImageInput onPress={escolherImagem}>
                            <ImageInputText isFilled={!!foto}>
                                {
                                    foto ? 'Imagem selecionada!' : 'Selecione uma imagem...'
                                }
                            </ImageInputText>
                        </ImageInput>
                    </Fields>
                    <RegisterButton onPress={handleSubmit(handleCadastro)}>
                        <TextRegisterButton>cadastrar</TextRegisterButton>
                    </RegisterButton>
                </Form>
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}
