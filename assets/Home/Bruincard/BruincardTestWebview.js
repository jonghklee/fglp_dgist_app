import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';

import { WebView } from 'react-native-webview';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import styles from './../HomeSceneStyle';

export default function BruincardScene({ navigation }) {
    const webViewRef = useRef(null);
    const bruinUrl = 'https://secure.bruincard.ucla.edu/bcw/app/webdeposit/TransactionRequest.aspx';
    
    const jscode = `
    try{
        document.querySelector('#logon').value = '';
        document.querySelector('#pass').value = '';
        notFinished = false;
        document.querySelector('#sso > form > div > table > tbody > tr > td:nth-child(1) > button').click();
    } catch (e) {

    }
    const func = async () => {
        document.querySelector('#ctl00_MainContent_txtFirstName').value = 'Jonghyeok'
        document.querySelector('#ctl00_MainContent_txtLastName').value = 'Lee'
        document.querySelector('#ctl00_MainContent_txtUID').value = '906093475'
        document.querySelector('#ctl00_MainContent_txtDepositAmount').value = '10'

        window.ReactNativeWebView.postMessage( "1" );
        document.querySelector('#ctl00_MainContent_btnSubmit').click();
    }

    func();

    `
    const jscode2 = `
        document.querySelector('#txtCCNo').value = '1001001001001000';
        document.querySelector('#ddExpMonth').value = '04';
        document.querySelector('#ddExpYear').value = '2023';
        document.querySelector('#txtCardholderName').value = 'jongheok';
        document.querySelector('#txtAddress').value = 'jongheok';
        document.querySelector('#txtCity').value = 'jongheok';
        document.querySelector('#txtState').value = 'jongheok';
        document.querySelector('#txtZip').value = 'jongheok';
        document.querySelector('#ddCountry').value = 'Korea, Republic of';
        document.querySelector('#txtCID').value = 'Korea, Republic of';
        document.querySelector('#txtEmailAddr').value = 'jonghklee@dgist.ac.kr';
    `
    useEffect(()=>{})

    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms))
    };

    const w2n = async (e) => {
        await sleep(10000);
        console.log("hihi");
        this.webview.injectJavaScript(jscode2);
    };

    return(
        <WebView
          ref={w=>{this.webview = w}}
          pullToRefreshEnabled
          scrollEnabled
          javaScriptEnabled={true}
          injectedJavaScript={jscode}
          source={{uri: bruinUrl}}
          style={{flex:1}}
          onMessage={w2n}
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
        />
    );
}
