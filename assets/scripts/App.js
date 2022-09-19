import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogoScene from '../scenes/LogoScene';
import HomeScene from '../scenes/HomeScene';
import TimetableScene from '../scenes/TimetableScene';
import ChecklistScene from '../scenes/ChecklistScene';
import TipScene from '../scenes/TipScene';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogoScene"
          component={LogoScene}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
            header: () => null
          }}
        />
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
            header: () => null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainApp = () => {
  return (
    <Tab.Navigator
      /* screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === 'MainScene') {
            iconName = 'home-outline';
            size = focused ? 25 : 20;
          } else if (route.name === 'TimetableScene') {
            iconName = '';
            size = focused ? 25 : 20;
          }
          else if (route.name === 'TimetableScene') {
            iconName = '';
            size = focused ? 25 : 20;
          }
          else if (route.name === 'TimetableScene') {
            iconName = '';
            size = focused ? 25 : 20;
          }
          return <Ionicons name={iconName} size={size} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })} */
    >
      <Tab.Screen
        name="HomeScene"
        component={HomeScene}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          header: () => null
        }}
      />
      <Tab.Screen
        name="TimetableScene"
        component={TimetableScene}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          header: () => null
        }}
      />
      <Tab.Screen
        name="ChecklistScene"
        component={ChecklistScene}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          header: () => null
        }}
      />
      <Tab.Screen
        name="TipScene"
        component={TipScene}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          header: () => null
        }}
      />
    </Tab.Navigator>
  );
}

const config = {
  animation: 'spring',
  config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
  },
};

export default App;