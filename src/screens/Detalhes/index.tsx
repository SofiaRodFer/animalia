import { useRoute } from '@react-navigation/native';
import React from 'react';

import { Header } from '../../components/Header';
import { Foto } from '../../components/Perfil/Foto';

import { PetModel } from '../../models/PetModel';

import {
  Container,
  HeaderContainer,
  InfoContainer,
  Nome,
  GeneroContainer,
  Genero,
  Raca,
  Data,
  Icon,
} from './styles';

interface RouteParams {
  pet: PetModel;
}

export function Detalhes() {
  const route = useRoute()
  const { pet } = route.params as RouteParams

  const iconGenero = pet.genero.toLowerCase() === 'feminino' ? <Icon name="female" /> : <Icon name="male" />

  function pegarAnos(data: string) {
    const arrayData = data.split('/');
    const anoAtual = new Date().getFullYear();

    const idade = anoAtual - parseInt(arrayData[2]);      

    return idade;
  }

  return (
    <Container>
      <HeaderContainer>
        <Header />
        <Foto src={pet.foto} />
      </HeaderContainer>

      <InfoContainer>
        <Nome>{pet.nome}</Nome>
        <GeneroContainer>
          <Genero>{pet.genero.toLowerCase() === 'feminino' ? 'Fêmea' : 'Macho'}</Genero>
          {iconGenero}
        </GeneroContainer>
        <Raca>{pet.raca}</Raca>
        <Data>{`${pet.genero.toLowerCase() === 'feminino' ? 'Nascida' : 'Nascido'} em ${pet.dataNascimento}, há ${pegarAnos(pet.dataNascimento)} ${pegarAnos(pet.dataNascimento) !== 1 ? 'anos' : 'ano'}`}</Data>
        <Data>{`${pet.genero.toLowerCase() === 'feminino' ? 'Adotada' : 'Adotado'} em ${pet.dataAdocao}, há ${pegarAnos(pet.dataAdocao)} ${pegarAnos(pet.dataAdocao) !== 1 ? 'anos' : 'ano'}`}</Data>
      </InfoContainer>
    </Container>
  );
}