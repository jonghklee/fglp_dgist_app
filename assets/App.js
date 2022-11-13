import { Image, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LogoScene from './Login/LogoScene';
import HomeScene from './Home/HomeScene';
import TimetableScene from './Timetable/TimetableScene';
import ChecklistScene from './Checklist/ChecklistScene';
import TipScene from './Tip/TipScene';

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

const TabButton = (props) => {
  const {route, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;

  const getIcon = () => {
    if (route.name === 'HomeScene') {
      return (
        <>
          {focused ?
          <Image source={require('./Images/home2.png')} />
          : <Image source={require('./Images/home.png')} />}
          <Text style={{fontSize: 12, fontWeight: '400', marginBottom: 5}}>
            홈
          </Text>
        </>
      );
    }
    else if (route.name === 'TimetableScene') {
      return (
        <>
          {focused ?
          <Image source={require('./Images/timetable2.png')} />
          : <Image source={require('./Images/timetable.png')} />}
          <Text style={{fontSize: 12, fontWeight: '400', marginBottom: 5}}>
            시간표
          </Text>
        </>
      );
    }
    else if (route.name === 'ChecklistScene') {
      return (
        <>
          {focused ?
          <Image source={require('./Images/checklist2.png')} />
          : <Image source={require('./Images/checklist.png')} />}
          <Text style={{fontSize: 12, fontWeight: '400', marginBottom: 5}}>
            체크리스트
          </Text>
        </>
      );
    }
    else if (route.name === 'TipScene') {
      return (
        <>
          {focused ?
          <Image source={require('./Images/honey2.png')} />
          : <Image source={require('./Images/honey.png')} />}
          <Text style={{fontSize: 12, fontWeight: '400', marginBottom: 5}}>
            꿀팁
          </Text>
        </>
      );
    }
  } 

  return(
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
    >
      <>
        {getIcon()}
        
      </>
    </TouchableOpacity>
  );
}

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        tabBarActiveTintColor: 'black',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: 'flex',
          height: 60,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
        },
        tabBarButton: (props) => <TabButton {...props} route={route} />
      })}
    >
      <Tab.Screen
        key={0}
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
        key={1}
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
        key={2}
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
        key={3}
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