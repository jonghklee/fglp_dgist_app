import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';

import { WebView } from 'react-native-webview';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import styles from './../HomeSceneStyle';

export default function BruincardScene({ navigation }) {
    return(
        <SafeAreaView style={[styles.body, {justifyContent:'space-between'}]}>
            <ScrollView>
                <View style={{height:149}}>
                    <View style={{height: 60, justifyContent: 'center', paddingLeft: 20}}>
                        <TouchableOpacity
                            style={{width: 30, height: 30, alignItems: 'center', justifyContent: "center"}}
                            onPress={() => {navigation.navigate("HomeInterface");}}
                            >
                            <Feather style={{flex:1}} name="chevron-left" size={28} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingLeft: 20}}>
                        <Text style={{fontSize: 28, color: "black", fontWeight: "900"}}>Bruincard</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize: 12, color: "red", fontWeight: "900"}}>네트워크 오류</Text>
                            <MaterialCommunityIcons style={{flex:1, padding:0}} name="alert-circle-outline" size={14} color="red" />
                        </View>
                    </View>
                </View>
                <View style={{height:343, paddingLeft:20, paddingRight:20, justifyContent:'space-between'}}>
                    <View style={{height:82, justifyContent:'space-between'}}>
                        <View>
                            <View style={{alignItems:'flex-end'}}>
                                <Text style={{fontWeight:'900', fontSize:12, }}>최소 $10</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={button_styles.h_text}>충전 금액</Text>
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                    <TextInput placeholder='직접입력' style={{padding:0, fontSize:20, textAlign:'right'}} />
                                    <Text style={button_styles.h_text}> 달러</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={button_styles.button0}>
                                <Text style={button_styles.button0_text}>$10</Text>
                            </View>
                            <View style={button_styles.button0}>
                                <Text style={button_styles.button0_text}>$15</Text>
                            </View>
                            <View style={button_styles.button0}>
                                <Text style={button_styles.button0_text}>$20</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{height:123, justifyContent:'space-between'}}>
                        <View>
                            <Text style={button_styles.h_text}>현재 환율</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:16}}>
                                <Text style={button_styles.p_text}>보낼때</Text>
                                <Text style={button_styles.p_text}>1333</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:15}}>
                                <Text style={button_styles.p_text}>보낼때</Text>
                                <Text style={button_styles.p_text}>1333</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{color:'#BBBBBB', fontSize:12}}>미국시기준 9월14일(수) 오후 5:23 업데이트 됨</Text>
                        </View>
                    </View>
                    <View style={{height:40, justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:15}}>
                            <Text style={button_styles.h_text}>예상 금액</Text>
                            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={[button_styles.h_text, {color:'#D9D9D9'}]}>00,000</Text>
                                <Text style={button_styles.h_text}> 원</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{color:'#BBBBBB', fontSize:10}}>*현재환율을 바탕으로 계산한 결과로 환전수수료 등 부가세가 포함되지 않음</Text>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                    <TouchableOpacity
                        style={{alignItems:'center', paddingTop:49, paddingBottom:42}}
                        activeOpacity={0.6}
                        onPress={() => {navigation.navigate("addMoney");}}
                    >
                        <View style={[button_styles.button, {}]}>
                            <Text style={button_styles.button_text}>충전</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const button_styles = StyleSheet.create({
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
    },
    button0: {
        backgroundColor: '#0068FE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        height:24,
        flex: 0.32
    },
    button0_text: {
        color: 'white',
        fontSize: 12
    },
    h_text: {
        fontSize: 20,
        fontWeight: '900',
        color: 'black',
    }, 
    p_text: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
    }, 
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
    },
    text_input: {
        height:22,
        width:212,
        backgroundColor: 'rgba(0,0,0,0)',
        borderBottomWidth:1,
        borderBottomColor:'black',
        padding:0,
    }

})
