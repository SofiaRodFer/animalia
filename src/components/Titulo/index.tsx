import React from 'react';

import { ColorContainer, Container, TituloComponent } from './styles';

interface TituloProps {
  tituloProp: string;
}

export function Titulo({ tituloProp }: TituloProps) {
  return (
    <ColorContainer>
        <Container>
          <TituloComponent>{tituloProp}</TituloComponent>
        </Container>
    </ColorContainer>
  );
}