import React, { useCallback, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import DatabaseInit from './src/database/DatabaseInit';

import { PetRoutes } from './src/routes/petRoutes.routes';

import { ThemeProvider } from 'styled-components';

import * as SplashScreen from 'expo-splash-screen';

import theme from './src/styles/theme';
import { useFonts } from 'expo-font';
import {
  VarelaRound_400Regular
} from '@expo-google-fonts/varela-round'
import { Detalhes } from './src/screens/Detalhes';

SplashScreen.preventAutoHideAsync();

const showScreen = async () => await SplashScreen.hideAsync();

const db = new DatabaseInit()

export default function App() {
  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
    'Aloja-Light': require('./src/assets/fonts/Aloja-Light.ttf')
  })

  useEffect(() => {
    showScreen()
  }, [fontsLoaded])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <PetRoutes onLayout={onLayoutRootView} />
      </NavigationContainer>
    </ThemeProvider>
  );


}

