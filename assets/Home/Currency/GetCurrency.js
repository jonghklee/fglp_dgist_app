import React, { useState, useRef } from 'react';
import { View } from 'react-native';

import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function GetCurrency({ navigation }) {
    const [currencyNum, setCurrencyNum] = useState('데이터를 가져오는 중...')
    let webRef = useRef<WebView>(null);
    const currencyUrl = 'https://spib.wooribank.com/pib/Dream?withyou=CMCOM0184';
    const jsCode_getExchangeRate = `
    setTimeout(() => {
        const timer = ms => new Promise(res=>setTimeout(res,ms));
        async function getEx() {
            let notFinished = true;
            let exchangeRate = "";
            let fail_num = 0;
            let lmt = 200;
            while (notFinished) {
                try {
                    exchangeRate = document.querySelector('#fxprint > table > tbody > tr:nth-child(1) > td:nth-child(3)').innerHTML;
                    window.ReactNativeWebView.postMessage( exchangeRate );
                    notFinished = false;
                } catch (err) {
                    await timer(100);
                    fail_num += 1;
                    if(fail_num < lmt) {
                        window.ReactNativeWebView.postMessage( "NONE" );
                    }
                }
            }
        }
        getEx();
    }, 100);
    `
    const w2n = (e) => {
        setCurrencyNum(e.nativeEvent.data);
    };

    return (
        <View style={{height:1, width:1}}>
            <WebView
              javaScriptEnabled={true}
              injectedJavaScript={jsCode_getExchangeRate}
              source={{uri: currencyUrl}}
              onMessage={w2n}
            />
        </View>
    );
}