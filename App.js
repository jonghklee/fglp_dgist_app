import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Home';
import TimeTable from './src/TimeTable';
import CheckList from './src/CheckList';
import Tips from './src/Tips';
import Login from './src/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
       tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
         iconName = focused
           ? 'ios-information-circle'
           : 'ios-information-circle-outline';
        } else if (route.name === 'Settings') {
         iconName = focused ? 'ios-list-box' : 'ios-list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
       },
       tabBarActiveTintColor: 'tomato',
       tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='TimeTable' component={TimeTable}/>
      <Tab.Screen name='CheckList' component={CheckList}/>
      <Tab.Screen name='Tips' component={Tips}/>
    </Tab.Navigator>
  </NavigationContainer>
}

const App = () => {
  const [isSigned, setIsSigned] = useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSigned ? (
          <Stack.Screen name="Home" component={TabNavigation}/>
        ) : (
          <Stack.Screen name="Login" component={Login}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;