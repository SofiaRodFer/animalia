import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Title,
    Button,
    ButtonText
} from './styles';

export function ListaVazia() {
    const navigation = useNavigation();

    return (
      <Container>
          <Title>Você atualmente não possui nenhum animal cadastrado!</Title>
          <Button onPress={() => {
              navigation.navigate('Cadastro');
          }}>
              <ButtonText>cadastrar</ButtonText>
          </Button>
      </Container>
    );
}