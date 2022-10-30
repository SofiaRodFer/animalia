import React from 'react';

import { Container, Image, Text } from './styles'

export function Header() {
    return (
        <Container>
            <Image source={require('../../assets/logo.png')} />
            <Text>Animalia</Text>
        </Container>
    );
}
