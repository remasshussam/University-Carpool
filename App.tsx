import './src/global.css';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DialogHost } from '@/components/AppDialog';
import { mockSignOut } from '@/features/auth/authApi';
import AppNavigator from '@/navigation/AppNavigator';
import { navigationRef } from '@/navigation/navigationRef';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const previousRoute = useRef<string | undefined>(undefined);

  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={() => {
          const name = navigationRef.getCurrentRoute()?.name;
          if (name === 'Login' && previousRoute.current && previousRoute.current !== 'Login') {
            mockSignOut();
          }
          previousRoute.current = name;
        }}>
        <AppNavigator />
      </NavigationContainer>
      <DialogHost />
    </SafeAreaProvider>
  );
}
