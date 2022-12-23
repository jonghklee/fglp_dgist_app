import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feather from 'react-native-vector-icons/Feather';

import HomeInterface from './HomeInterface';
import MyAccountScene from './MyAccount/MyAccountScene';
import BruincardScene from './Bruincard/BruincardScene';
import CurrencyScene from './Currency/CurrencyScene';
import { TouchableOpacity, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function HomeScene({ navigation }) {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="HomeInterface"
                component={HomeInterface}
                options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    header: () => null
                }}
            />
            <Stack.Screen
                name="MyAccountScene"
                component={MyAccountScene}
                options={{
                    animation: 'fade_from_bottom',
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    header: () => (customHeader(navigation))
                }}
            />
            <Stack.Screen
                name="BruincardScene"
                component={BruincardScene}
                options={{
                    animation: 'fade_from_bottom',
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    header: () => (customHeader(navigation))
                }}
            />
            <Stack.Screen
                name="CurrencyScene"
                component={CurrencyScene}
                options={{
                    animation: 'fade_from_bottom',
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    header: () => (customHeader(navigation))
                }}
            />
        </Stack.Navigator>
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

const customHeader = (navigation) => {
    return(
        <View style={{ width: '100%', height: 60, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'white'}}>
            <TouchableOpacity
                style={{width: 30, height: 30, alignItems: 'center', justifyContent: "center", left: 18}}
                onPress={() => {navigation.navigate("HomeInterface");}}
            >
                <Feather style={{flex:1}} name="chevron-left" size={28} color="black" />
            </TouchableOpacity>
        </View>
    );
}