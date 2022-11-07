import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import LogoScene from './Login/LogoScene';
import HomeScene from './Home/HomeScene';
import TimetableScene from './Timetable/TimetableScene';
import ChecklistScene from './Checklist/ChecklistScene';
import TipScene from './Tip/TipScene';

/* import Hometabicon from './Images/checklisttab.svg'
import Timetabletabicon from './Images/timetabletab.svg'
import Checklisttabicon from './Images/checklisttab.svg'
import Honeytabicon from './Images/honeytab.svg' */

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
      screenOptions={({ route }) => ({
        tabBarStyle: {
          display: 'flex',
          height: 60,
          paddingBottom: 5,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'white',
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
        },
        tabBarIcon: ({ focused, size, color }) => {
          // size = focused ? 25 : 20;
/*           if (route.name === 'HomeScene') {
            return <Hometabicon width={120} height={40} fill={"#FFF"} />
          } else if (route.name === 'TimetableScene') {
            return <Timetabletabicon width={120} height={40} fill={"#FFF"} />
          }
          else if (route.name === 'ChecklistScene') {
            return <Checklisttabicon width={120} height={40} fill={"#FFF"} />
          }
          else if (route.name === 'TipScene') {
            return <Honeytabicon width={120} height={40} fill={"#FFF"} />
          } */
        },
      })}
    >
      <Tab.Screen
        key={0}
        name="HomeScene"
        component={HomeScene}
        options={{
          tabBarLabel: "홈",
          transitionSpec: {
            open: config,
            close: config,
          },
          header: () => null
        }}
      />
      <Tab.Screen
        key={1}
        name="TimetableScene"
        component={TimetableScene}
        options={{
          tabBarLabel: "시간표",
          transitionSpec: {
            open: config,
            close: config,
          },
          header: () => null
        }}
      />
      <Tab.Screen
        key={2}
        name="ChecklistScene"
        component={ChecklistScene}
        options={{
          tabBarLabel: "체크리스트",
          transitionSpec: {
            open: config,
            close: config,
          },
          header: () => null
        }}
      />
      <Tab.Screen
        key={3}
        name="TipScene"
        component={TipScene}
        options={{
          tabBarLabel: "꿀팁",
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