import React, { useState, useCallback, useRef, useEffect, StyleSheet } from 'react';
import { View, Text, Button, TouchableOpacity, SafeAreaView } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import styles from './../HomeSceneStyle';

export default function CurrencyScene({ navigation }) {
    return (
        <SafeAreaView style={styles.body}>
            <View style={{height:178}}>
                <View style={{ width: 58, height: 60, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={{width: 30, height: 30, alignItems: 'center', justifyContent: "center"}}
                        onPress={() => {navigation.navigate("HomeInterface");}}
                        >
                        <Feather style={{flex:1}} name="chevron-left" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize: 28, color: "black", fontWeight: "900", paddingLeft: 30}}>환율 계산기</Text>
            </View>
            <View style={{backgroundColor:'blue'}}>
                <Text style={{fontSize: 28, color: "black", fontWeight: "500", paddingLeft: 30}}>환율 계산기</Text>
                <View style={{backgroundColor:'red', height:30, width:30}}/>
                <View style={{backgroundColor:'purple', height:30, width:30}}/>
                <View style={{backgroundColor:'pink', height:30, width:30}}/>
            </View>
                <Text style={{fontSize: 26, color: "black", fontWeight: "500"}}>환율: </Text>
        </SafeAreaView>
    );
}

