import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import getInfo from './BruincardGetInfo';
import addMoney from './BruincardAddMoney';
import testWebView from './BruincardTestWebview';

const Stack = createNativeStackNavigator();

export default function BruincardScene({ navigation }) {
    // 부모 TabBarNavigation에서 Tabbar 없애기
    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: undefined
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