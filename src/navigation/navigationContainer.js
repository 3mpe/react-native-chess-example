/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { Platform, Text, View } from 'react-native';
import {
  createStackNavigator,
  NavigationContainer,
  createBottomTabNavigator,
  TransitionPresets,
} from './../utils';
import { navigationRef } from './navigationHelper';
import routes from './routes';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function CustomTabBarLabel({ title }) {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: 'red',
          marginTop: Platform.select({ ios: 0, android: -60 }),
        }}
      >
        {title}
      </Text>
    </View>
  );
}

const NavigationContainerWrapper = () => {
  const initialRouteName =
    routes.find(item => item.initialRouteName).name || 'Home';

  const bottomTabs = tabs => () =>
    (
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { height: 60 },
          tabBarIcon: ({ focused, color, size }) => {
            return null;
            // return <Text>{route.name}</Text>;
            // // ikonlar oluşlturulunca burası düzenlenecek
            // return (
            //   <Image source={route.name} style={{width: size, height: size}} />
            // );
          },
          tabBarLabel: ({ focused }) => {
            let label;
            if (route.name === 'Home') {
              label = 'Home';
            } else if (route.name === 'Settings') {
              label = 'Settings';
            }

            return <CustomTabBarLabel title={label} />;
          },
        })}
      >
        {tabs.map((tab, index) => (
          <BottomTab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
          />
        ))}
      </BottomTab.Navigator>
    );

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      >
        {routes.map((route, index) => (
          <Stack.Screen
            key={index}
            name={route.name}
            component={
              route.bottomTabs ? bottomTabs(route.bottomTabs) : route.component
            }
            options={route.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerWrapper;
