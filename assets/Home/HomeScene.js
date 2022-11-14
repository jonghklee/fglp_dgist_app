import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeInterface from './HomeInterface';
import BruincardScene from './Bruincard/BruincardScene';
import CurrencyScene from './Currency/CurrencyScene';

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
                name="BruincardScene"
                component={BruincardScene}
                options={{
                    animation: 'fade_from_bottom',
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    header: () => null
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
                    header: () => null
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