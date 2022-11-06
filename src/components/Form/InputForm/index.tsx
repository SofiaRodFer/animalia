import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Container, Input } from './styles';

interface InputProps extends TextInputProps {
    control: Control;
    name: string;
    error?: string;
}

export function InputForm({ control, name, ...rest }: InputProps) {
  return (
    <Container>
        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
                <Input
                    onChangeText={onChange}
                    value={value}
                    {...rest}
                />
            )}
            name={name}
        />
    </Container>
  );
}