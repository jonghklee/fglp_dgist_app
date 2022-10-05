import { useEffect, useRef } from "react";
import { View, Text, TouchableHighlight, Animated } from "react-native";

import styles from "./HomeSceneStyle";

export default function CurrencyButton({ CurrencyRefresh, isShrinked }) {
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

    return(
        <TouchableHighlight
            style={[styles.currencyform, styles.shadowProp]}
            activeOpacity={0.6}
            underlayColor="#F8F8F8"
            onPress={()=>{}}
        >
            <View style={{justifyContent: 'space-between', flex: 1}}>
                <View>
                    <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                        현재환율(보낼때)
                    </Text>
                    <Text style={{fontSize: 26, color: 'black', fontWeight: '500'}}>
                        1337.4
                    </Text>
                </View>
                <Animated.Text style={{fontSize: 10, color: 'black', fontWeight: '400', opacity: textfade}}>
                    미국시기준 9월 14일(수){'\n'}오후 5:23 업데이트 됨
                </Animated.Text>
            </View>
        </TouchableHighlight>
    );
}