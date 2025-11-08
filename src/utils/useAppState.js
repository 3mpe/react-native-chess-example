import {useState, useEffect} from 'react';
import {AppState} from 'react-native';

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [isForeground, setIsForeground] = useState(true);
  const [isBackground, setIsBackground] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      setAppState(nextAppState);

      // State değişkenlerini güncelle
      setIsForeground(nextAppState === 'active');
      setIsBackground(nextAppState === 'background');
      setIsInactive(nextAppState === 'inactive');
      setIsActive(nextAppState === 'active');

      setIsInitial(false); // İlk durumdan çıkıldığını belirt
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    /**
     *  active - The app is running in the foreground
     *  background - The app is running in the background. The user is either in another app or on the home screen
     *  inactive [iOS] - This is a transition state that happens when the app launches, is asking for permissions or when a call or SMS message is received.
     *  unknown [iOS] - Initial value until the current app state is determined
     *  extension [iOS] - The app is running as an app extension
     */
    appState,

    isForeground,
    isBackground,
    isInactive,
    isActive,
    isInitial,
  };
};

export default useAppState;
