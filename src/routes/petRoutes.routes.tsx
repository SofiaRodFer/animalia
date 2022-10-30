import React from 'react';
import { Platform } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator()

import { HomeScreen } from '../screens/HomeScreen';

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
                component={HomeScreen}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <MaterialIcons
                            name="pets"
                            size={size}
                            color={theme.colors.title}
                        />
                    )
                }}
            />
        </Navigator>
    )
}