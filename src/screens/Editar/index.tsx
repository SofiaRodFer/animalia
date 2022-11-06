import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Header } from '../../components/Header';
import { ListaVazia } from '../../components/ListaVazia';
import { PetEdicao } from '../../components/PetEdicao';
import { Titulo } from '../../components/Titulo';
import PetService from '../../database/DatabaseService';

import { PetModel } from '../../models/PetModel';

import { Container, Lista } from './styles';

export function Editar() {
  const [pets, setPets] = useState<PetModel[]>([])
  
  async function listarPets() {
    try {
      const banco = new PetService()

      const petsLista = await banco.Listar()

      setPets(petsLista._array)
    } catch (error) {
      Alert.alert('Não foi possível carregar os pets')
    }
  }
  
  useEffect(() => {
    listarPets()
  }, [])
  
  useFocusEffect(useCallback(() => {
    listarPets()
  }, []))

  return (
    <Container>
      <Header />
      <Titulo tituloProp="Editar pets" />

      {pets.length === 0
        ? <ListaVazia />
        : <Lista
            data={pets}
            keyExtractor={(item: PetModel) => item.id}
            renderItem={({ item }) => (
              <PetEdicao pet={item} />
            )}
          />
      }

    </Container>
  );
}