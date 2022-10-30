import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import { ThemeProvider } from 'styled-components';

import * as SplashScreen from 'expo-splash-screen';

import theme from './src/styles/theme';
import { useFonts } from 'expo-font';
import {
  VarelaRound_400Regular
} from '@expo-google-fonts/varela-round'
import { PetRoutes } from './src/routes/petRoutes.routes';

SplashScreen.preventAutoHideAsync();

const showScreen = async () => await SplashScreen.hideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
    'Aloja-Light': require('./src/assets/fonts/Aloja-Light.ttf')
  })

  if (!fontsLoaded) {
    showScreen()
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
      barStyle='light-content'
      translucent
      backgroundColor="transparent"
      />
      <NavigationContainer>
        <PetRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );


}

