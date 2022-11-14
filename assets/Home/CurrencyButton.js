import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableHighlight, Animated } from "react-native";

import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import styles from "./HomeSceneStyle";

export default function CurrencyButton({ CurrencyRefresh, isShrinked, gotoCurrencyScene }) {
    const webViewRef = useRef();
    const [currencyNum, setCurrencyNum] = useState('loading...');
    const [isRefreshed, setIsRefreshed] = useState("true");
    const currencyUrl = 'https://finance.daum.net/exchanges';
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
                    exchangeRate = document.querySelector('#boxContents > div.tableB > div.box_contents > div > table > tbody > tr.first > td:nth-child(5) > span').innerHTML;
                    window.ReactNativeWebView.postMessage( exchangeRate );
                    notFinished = false;
                } catch (err) {
                    await timer(100);
                    fail_num += 1;
                    if(fail_num > lmt) {
                        window.ReactNativeWebView.postMessage( "0" );
                    }
                }
            }
        }
        getEx();
    }, 100);
    `

    const w2n = async (e) => {
        if(isRefreshed == "true") {
            setIsRefreshed("doing");
            await AsyncStorage.setItem('currency', e.nativeEvent.data);
            await AsyncStorage.getItem('currency', (e,r)=>{setCurrencyNum(r);});
            setIsRefreshed("done");
        }
    };

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
        setIsRefreshed("true");
        setCurrencyNum("loading...");
        webViewRef.current && webViewRef.current.reload();
    }

    const gotoCurrencyScene1 = () => {
        if (isRefreshed == "done" || true) { gotoCurrencyScene() }
    }

    return(
        <TouchableHighlight
            style={[styles.currencyform, styles.shadowProp]}
            activeOpacity={0.6}
            underlayColor="#F8F8F8"
            onPress={gotoCurrencyScene1}
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
                      ref={w=>{webViewRef.current = w}}
                      injectedJavaScript={jsCode_getExchangeRate}
                      source={{uri: currencyUrl}}
                      onMessage={w2n}
                      style={{flex:0}}
                      userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
                    />
                </View>
                <Animated.Text style={{fontSize: 10, color: 'black', fontWeight: '400', opacity: textfade}}>
                    미국시기준 9월 14일(수){'\n'}오후 5:23 업데이트 됨
                </Animated.Text>
            </View>
        </TouchableHighlight>
    );
}