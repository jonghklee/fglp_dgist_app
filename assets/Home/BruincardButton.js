import { useRef, useEffect } from "react";
import { View, Text, TouchableHighlight, Animated } from "react-native";

import styles from "./HomeSceneStyle";

export default function BruincardButton({ BruincardRefresh, isShrinked, gotoBruincardScene }) {
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
                        $15.40
                    </Text>
                </View>
                <Animated.Text style={{fontSize: 10, color: 'black', fontWeight: '400', opacity: textfade}}>
                    지금 업데이트 됨
                </Animated.Text>
            </View>
        </TouchableHighlight>
    );
}