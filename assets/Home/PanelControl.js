import { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

import HomeSceneStyle from './HomeSceneStyle';
import CurrencyButton from './CurrencyButton';
import BruincardButton from './BruincardButton';

export default function PanelControl({ isShrinked, CurrencyRefresh, BruincardRefresh, gotoBruincardScene, gotoCurrencyScene }) {
    const heightchange = useRef(new Animated.Value(165)).current;

    useEffect(() => {
        if (isShrinked) {
            Animated.timing(heightchange, {toValue: 90, duration: 200, useNativeDriver: false}).start();
        }
        else {
            Animated.timing(heightchange, {toValue: 165, duration: 300, useNativeDriver: false}).start();
        }
    }, [isShrinked]);

    return(
        <Animated.View style={{
            height: heightchange, marginTop: 20, width: '90%', flexDirection: 'row', alignItems: 'flex-end'
        }}>
            <CurrencyButton CurrencyRefresh={CurrencyRefresh} isShrinked={isShrinked} gotoCurrencyScene={gotoCurrencyScene} />
            <BruincardButton BruincardRefresh={BruincardRefresh} isShrinked={isShrinked} gotoBruincardScene={gotoBruincardScene} />
        </Animated.View>
    );
}