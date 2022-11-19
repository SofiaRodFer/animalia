import React from 'react';

import { ColorContainer, Container, Imagem, ImagemContainer } from './styles';

interface FotoProps {
  src: string;
}

export function Foto({ src }: FotoProps) {
  return (
    <ColorContainer>
      <Container>
        <ImagemContainer>
          <Imagem source={src === undefined || src === null ? require('../../../assets/padrao.png') : {uri: src}} />
        </ImagemContainer>
      </Container>
    </ColorContainer>

  );
}