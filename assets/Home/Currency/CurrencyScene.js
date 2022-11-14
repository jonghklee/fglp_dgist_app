import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import styles from './../HomeSceneStyle';

export default function CurrencyScene({ navigation }) {
    const [isLeft, setIsLeft] = useState(true);
    const [button1Style, setButton1Style] = useState(button_styles.Button_active);
    const [button1TextStyle, setButton1TextStyle] = useState(button_styles.Button_active_text);
    const [button2Style, setButton2Style] = useState(button_styles.Button_nonactive);
    const [button2TextStyle, setButton2TextStyle] = useState(button_styles.Button_nonactive_text);

    const [currencyNum, setCurrencyNum] = useState();

    AsyncStorage.getItem('currency', (e,r)=>{setCurrencyNum(r)});

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

    return (
        <SafeAreaView style={[styles.body, {justifyContent:'space-between'}]}>
            <View>
                <View style={{height:178}}>
                    <View style={{ width: 48, height: 60, alignItems: 'flex-end', justifyContent: 'center'}}>
                        <TouchableOpacity
                            style={{width: 30, height: 30, alignItems: 'center', justifyContent: "center"}}
                            onPress={() => {navigation.navigate("HomeInterface");}}
                            >
                            <Feather style={{flex:1}} name="chevron-left" size={28} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 28, color: "black", fontWeight: "900", paddingLeft: 20}}>환율 계산기</Text>
                </View>

                <View style={{paddingLeft:20, paddingRight:20}}>

                    <View style={{flexDirection:'row', height:120}}>
                        <TouchableWithoutFeedback onPress={()=>{}} >
                            <View style={[button1Style, styles.shadowProp]} >
                                <Text style={button1TextStyle}>보낼 때</Text>
                                <Text style={[button1TextStyle, {paddingTop: 26}]}>{currencyNum}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{flex:3, backgroundColor:'rgba(0,0,0,0)'}}/>
                        <TouchableWithoutFeedback onPress={()=>{}} >
                            <View style={[button2Style, styles.shadowProp]} >
                                <Text style={button2TextStyle}>받을 때</Text>
                                <Text style={[button2TextStyle, {paddingTop: 26}]}>{currencyNum}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{paddingTop:6}}>
                        <Text style={{fontSize:12, color:'#BBBBBB'}}>미국시기준 9월14일(수) 오후 5:23 업데이트 됨</Text>
                    </View>
                    <View style={{paddingTop:34}}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={button_styles.other_text}>계산할 금액</Text>
                            <View>
                                <Text style={button_styles.other_text}>달러</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop:24}}>
                            <Text style={button_styles.other_text}>계산된 금액</Text>
                            <View>
                                <Text style={button_styles.other_text}>원</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{justifyContent:'flex-end'}}>
                <TouchableOpacity style={{alignItems:'center', paddingBottom:63}}>
                    <View style={[button_styles.button, {}]}>
                        <Text style={button_styles.button_text}>확인</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const button_styles = StyleSheet.create({
    Button_active: {
        flex: 16,
        backgroundColor: '#0068FE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    Button_nonactive: {
        flex: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    Button_active_text: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,
    },
    Button_nonactive_text: {
        color: 'black',
        fontWeight: '900',
        fontSize: 16,
    },
    other_text: {
        fontSize: 20,
        color: 'black',
        fontWeight: '900',
    },
    button: {
        backgroundColor: '#0068FE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        height:41,
        width:330,
    },
    button_text: {
        color: 'white',
        fontSize: 17
    }

})
