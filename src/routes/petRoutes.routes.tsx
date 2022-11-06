import React from 'react';
import { Platform } from 'react-native';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator()

import { Home } from '../screens/Home';
import { Cadastro } from '../screens/Cadastro';
import { Editar } from '../screens/Editar';

export function PetRoutes() {
    const theme = useTheme()

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 68,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                },
                tabBarShowLabel: false
            }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: (({ size }) => 
                        <MaterialIcons
                            name="pets"
                            size={size}
                            color={theme.colors.title}
                        />
                    )
                }}
            />

            <Screen
                name="Editar"
                component={Editar}
                options={{
                    tabBarIcon: (({ size }) => 
                        <MaterialIcons
                            name="add-circle"
                            size={size}
                            color={theme.colors.primary}
                        />
                    )
                }}
            />

            <Screen
                name="Cadastro"
                component={Cadastro}
                options={{
                    tabBarIcon: (({ size }) => 
                        <MaterialCommunityIcons
                            name="pencil"
                            size={size}
                            color={theme.colors.primary}
                        />
                    )
                }}
            />

        </Navigator>
    )
}