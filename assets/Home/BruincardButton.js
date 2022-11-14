import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableHighlight, Animated } from "react-native";

import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import styles from "./HomeSceneStyle";

export default function BruincardButton({ BruincardRefresh, isShrinked, gotoBruincardScene }) {

    const webViewRef = useRef();
    const [bruinMoneyNum, setBruinMoneyNum] = useState("loading...");
    const [isRefreshed, setIsRefreshed] = useState("true");
    const bruinUrl = 'https://eacct-ucla-sp.transactcampus.com/eAccounts/AccountSummary.aspx';
    
    const jscode = `
    try{
        document.querySelector('#logon').value = 'jonghklee';
        document.querySelector('#pass').value = 'emc^2ua4';
        notFinished = false;
        document.querySelector('#sso > form > div > table > tbody > tr > td:nth-child(1) > button').click();
    } catch (e) {

    }
    const val = document.querySelector('#MainContent_AccountSummaryPanel > div:nth-child(1) > a > p.accountBalance > span').innerHTML
    window.ReactNativeWebView.postMessage( val );
    `

    const w2n = async (e) => {
        if(isRefreshed == "true") {
            setIsRefreshed("doing");
            const val = '$' + e.nativeEvent.data.slice(0,-4);
            await AsyncStorage.setItem('bruinMoney', val);
            await AsyncStorage.getItem('bruinMoney', (e,r)=>{setBruinMoneyNum(r);});
            setIsRefreshed("done");
        }
    };

    const textfade = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        BruincardRefresh.current = RefreshBruincard;
    }, []);

    useEffect(() => {
        if (isShrinked) {
            Animated.timing(textfade, {toValue: 0, duration: 200, useNativeDriver: false}).start();
        }
        else {
            Animated.timing(textfade, {toValue: 1, duration: 300, useNativeDriver: false}).start();
        }
    }, [isShrinked]);

    const RefreshBruincard = () => {
        setIsRefreshed("true");
        setBruinMoneyNum("loading...");
        webViewRef.current && webViewRef.current.reload();
    }
    
    return(
        <TouchableHighlight
            style={[styles.brcardform, styles.shadowProp]}
            activeOpacity={0.6}
            underlayColor="#F8F8F8"
            onPress={gotoBruincardScene}
        >
            <View style={{justifyContent: 'space-between', flex: 1}}>
                <View>
                    <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                        Bruincard
                    </Text>
                    <Text style={{fontSize: 26, color: 'black', fontWeight: '500'}}>
                        {bruinMoneyNum}
                    </Text>
                </View>
                <View style={{height:1}}>
                    <WebView
                      ref={w=>{webViewRef.current = w}}
                      pullToRefreshEnabled
                      scrollEnabled
                      javaScriptEnabled={true}
                      injectedJavaScript={jscode}
                      source={{uri: bruinUrl}}
                      style={{flex:0}}
                      onMessage={w2n}
                      userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
                    />
                </View>
                <Animated.Text style={{fontSize: 10, color: 'black', fontWeight: '400', opacity: textfade}}>
                    지금 업데이트 됨
                </Animated.Text>
            </View>
        </TouchableHighlight>
    );
}