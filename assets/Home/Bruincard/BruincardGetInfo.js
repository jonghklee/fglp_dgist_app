import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import styles from './../HomeSceneStyle';

export default function BruincardScene({ navigation }) {
    return(
        <SafeAreaView style={[styles.body, {justifyContent:'space-between'}]}>
            <ScrollView>
                <View>
                    <View style={{height:149}}>
                        <View style={{ width: 48, height: 60, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TouchableOpacity
                                style={{width: 30, height: 30, alignItems: 'center', justifyContent: "center"}}
                                onPress={() => {navigation.navigate("HomeInterface");}}
                                >
                                <Feather style={{flex:1}} name="chevron-left" size={28} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft: 20}}>
                            <Text style={{fontSize: 28, color: "black", fontWeight: "900"}}>Bruincard</Text>
                        </View>
                    </View>

                    <View style={{paddingLeft:20, paddingRight:20}}>
                        <View>
                            <Text style={[button_styles.h_text, {paddingBottom:20}]}>카드 정보</Text>
                            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <Text style={button_styles.text}>신용카드 넘버</Text>
                                <View style={{flexDirection:'row'}}>
                                    <TextInput
                                        style={[button_styles.text_input, {width:38}]}
                                        placeholder='0000'
                                        textAlign='center'
                                    />
                                    <View style={{width:20, alignItems:'center'}}>
                                        <Text> - </Text>
                                    </View>
                                    <TextInput
                                        style={[button_styles.text_input, {width:38}]}
                                        placeholder='0000'
                                        textAlign='center'
                                    />
                                    <View style={{width:20, alignItems:'center'}}>
                                        <Text> - </Text>
                                    </View>
                                    <TextInput
                                        style={[button_styles.text_input, {width:38}]}
                                        placeholder='0000'
                                        textAlign='center'
                                    />
                                    <View style={{width:20, alignItems:'center'}}>
                                        <Text> - </Text>
                                    </View>
                                    <TextInput
                                        style={[button_styles.text_input, {width:38}]}
                                        placeholder='0000'
                                        textAlign='center'
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 30}}>
                                <Text style={button_styles.text}>유효기간</Text>
                                <View style={{flexDirection:'row'}}>
                                    <TextInput style={[button_styles.text_input, {width:25}]} textAlign='center' placeholder='MM' />
                                    <View style={{width:15, alignItems:'center'}}>
                                        <Text style={{fontWeight:'900'}}>/</Text>
                                    </View>
                                    <TextInput style={[button_styles.text_input, {width:25}]} textAlign='center' placeholder='DD' />
                                    <View style={{width:60, alignItems:'center'}}>
                                        <Text style={{fontWeight:'900', color: 'black'}}>CVC</Text>
                                    </View>
                                    <TextInput style={[button_styles.text_input, {width:86}]} textAlign='center' placeholder='000' />
                                </View>
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 30}}>
                                <Text style={button_styles.text}>이름</Text>
                                <View>
                                    <TextInput style={[button_styles.text_input]} />
                                </View>
                            </View>
                        </View>

                        <View style={{paddingTop:56}}>
                            <Text style={[button_styles.h_text, {paddingBottom:20}]}>주소</Text>
                            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <Text style={button_styles.text}>City</Text>
                                <View>

                                    <TextInput style={[button_styles.text_input]} />
                                </View>
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 30}}>
                                <Text style={[button_styles.text, {fontSize:14}]}>State/Province/Region </Text>
                                <View>

                                    <TextInput style={[button_styles.text_input]} />
                                </View>
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 30}}>
                                <Text style={button_styles.text}>Zip/Postal Code</Text>
                                <View>

                                    <TextInput style={[button_styles.text_input]} />
                                </View>
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 30}}>
                                <Text style={button_styles.text}>Country</Text>
                                <View>

                                    <TextInput style={[button_styles.text_input]} />
                                </View>
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 30}}>
                                <Text style={button_styles.text}>Email Address</Text>
                                <View>
                                    <TextInput style={[button_styles.text_input]} />
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                    <TouchableOpacity
                        style={{alignItems:'center', paddingTop:49, paddingBottom:42}}
                        onPress={() => {navigation.navigate("addMoney");}}
                    >
                        <View style={[button_styles.button, {}]}>
                            <Text style={button_styles.button_text}>확인</Text>
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
    h_text: {
        fontSize: 16,
        fontWeight: '900',
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
