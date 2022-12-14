import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import getInfo from './BruincardGetInfo';
import addMoney from './BruincardAddMoney';
import testWebView from './BruincardTestWebview';

const Stack = createNativeStackNavigator();

export default function BruincardScene({ navigation }) {
    // Parent TabBarNavigation Control
    useEffect(() => {
        // Delete Parent Bottom Tab Bar
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        // Show Parent Bottom Tab Bar
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'flex',
                height: 60,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: 'white',
                position: 'absolute',
            }
        });
    }, [navigation]);

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="getInfo"
                component={getInfo}
                options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    header: () => null
                }}
            />
            <Stack.Screen
                name="addMoney"
                component={addMoney}
                options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    header: () => null
                }}
            />
            <Stack.Screen
                name="testWebView"
                component={testWebView}
                options={{
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