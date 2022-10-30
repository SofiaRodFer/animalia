import React from 'react';

import { Header } from '../../components/Header';
import { ListaVazia } from '../../components/ListaVazia';
import { Pet } from '../../components/Pet';
import { Titulo } from '../../components/Titulo';

import { PetModel } from '../../models/PetModel';

import { Container, Lista } from './styles';

export function HomeScreen() {
  const petObj = [
    {
      id: 'abc',
      nome: 'pet',
      raca: 'pet',
      dataNascimento: '13/10/2015',
      dataAdocao: '14/10/2016',
      genero: 'feminino',
      foto: undefined,
    },
    {
      id: 'asd',
      nome: 'pet',
      raca: 'pet',
      dataNascimento: '13/10/2015',
      dataAdocao: '14/10/2016',
      genero: 'masculino',
      foto: undefined,
    },
    {
      id: 'sdf',
      nome: 'pet',
      raca: 'pet',
      dataNascimento: '13/10/2015',
      dataAdocao: '14/10/2016',
      genero: 'masculino',
      foto: undefined,
    },
    {
      id: 'hjm',
      nome: 'pet',
      raca: 'pet',
      dataNascimento: '13/10/2015',
      dataAdocao: '14/10/2016',
      genero: 'masculino',
      foto: undefined,
    },
    {
      id: 'ver',
      nome: 'pet',
      raca: 'pet',
      dataNascimento: '13/10/2015',
      dataAdocao: '14/10/2016',
      genero: 'masculino',
      foto: undefined,
    },
  ]

  return (
    <Container>
      <Header />
      <Titulo tituloProp="Seus pets" />

      {petObj.length === 0
        ? <ListaVazia />
        : <Lista 
            data={petObj}
            keyExtractor={(item: PetModel) => item.id}
            renderItem={({ item }) => (
              <Pet pet={item} />
            )}
          />
      }

    </Container>
  );
}