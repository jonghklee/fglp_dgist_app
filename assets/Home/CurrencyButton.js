import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableHighlight, Animated } from "react-native";

import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import styles from "./HomeSceneStyle";

export default function CurrencyButton({ CurrencyRefresh, isShrinked, gotoCurrencyScene }) {
    const [currencyNum, setCurrencyNum] = useState('데이터를 가져오는 중...')
    const currencyUrl = 'https://spib.wooribank.com/pib/Dream?withyou=CMCOM0184';
    const jsCode_getExchangeRate = `
    setTimeout(() => {
        const timer = ms => new Promise(res=>setTimeout(res,ms));
        async function getEx() {
            let notFinished = true;
            let exchangeRate = "";
            let fail_num = 0;
            let lmt = 50;
            while (notFinished) {
                try {
                    exchangeRate = document.querySelector('#fxprint > table > tbody > tr:nth-child(1) > td:nth-child(3)').innerHTML;
                    window.ReactNativeWebView.postMessage( exchangeRate );
                    notFinished = false;
                } catch (err) {
                    await timer(100);
                    fail_num += 1;
                    if(fail_num > lmt) {
                        window.ReactNativeWebView.postMessage( "NONE" );
                    }
                }
            }
        }
        getEx();
    }, 100);
    `
    const textfade = useRef(new Animated.Value(1)).current;
    
    useEffect(() => {
        CurrencyRefresh.current = RefreshCurrency;
    }, []);

    useEffect(() => {
        if (isShrinked) {
            Animated.timing(textfade, {toValue: 0, duration: 200, useNativeDriver: false}).start();
        }
        else {
            Animated.timing(textfade, {toValue: 1, duration: 300, useNativeDriver: false}).start();
        }
    }, [isShrinked]);

    const RefreshCurrency = () => {

    }

    const w2n = async (e) => {
        await AsyncStorage.setItem('currency', e.nativeEvent.data);
        setCurrencyNum(e.nativeEvent.data);
        //setCurrencyNum(AsyncStorage.getItem('currency'));
    };

    return(
        <TouchableHighlight
            style={[styles.currencyform, styles.shadowProp]}
            activeOpacity={0.6}
            underlayColor="#F8F8F8"
            onPress={gotoCurrencyScene}
        >
            <View style={{justifyContent: 'space-between', flex: 1}}>
                <View>
                    <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                        현재환율(보낼때)
                    </Text>
                    <Text style={{fontSize: 26, color: 'black', fontWeight: '500'}}>
                        {currencyNum}
                    </Text>
                </View>
            <View style={{height:1}}>
                <WebView
                  javaScriptEnabled={true}
                  injectedJavaScript={jsCode_getExchangeRate}
                  source={{uri: currencyUrl}}
                  onMessage={w2n}
                  style={{flex:0}}
                />
            </View>
                <Animated.Text style={{fontSize: 10, color: 'black', fontWeight: '400', opacity: textfade}}>
                    미국시기준 9월 14일(수){'\n'}오후 5:23 업데이트 됨
                </Animated.Text>
            </View>
        </TouchableHighlight>
    );
}