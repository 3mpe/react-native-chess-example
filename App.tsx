/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationContainerWrapper from './src/navigation/navigationContainer';
import { GameProvider } from './src/context/GameProvider';
import 'react-native-gesture-handler';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GameProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainerWrapper />
      </SafeAreaProvider>
    </GameProvider>
  );
}

export default App;
