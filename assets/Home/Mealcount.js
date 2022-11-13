import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Feather from 'react-native-vector-icons/Feather';

import styles from './HomeSceneStyle';

export default function Mealcount({ MealcountRefresh }) {
    /* 학식 카운트 관련 */
    const [mealcount, setMealcount] = useState(0);

    useEffect(() => {
        MealcountRefresh.current = RefreshMealcount;
    }, []);

    const RefreshMealcount = async () => {
        const count = await AsyncStorage.getItem('mealcount');
        if(count == null) {
            setMealcount(14);
            await AsyncStorage.setItem('mealcount', "14");
        }
        else setMealcount(parseInt(count, 10));
    }

    const changeMealcount = async (diff) => {
        if(mealcount + diff > 14)
            ToastAndroid.show("밀 플랜의 개수가 14개보다 많을 수 없습니다!", ToastAndroid.SHORT);
        else if(mealcount + diff < 0)
            ToastAndroid.show("밀 플랜의 개수가 0개보다 적을 수 없습니다!", ToastAndroid.SHORT);
        else {
            setMealcount(mealcount + diff);
            console.log((mealcount + diff).toString(10));
            await AsyncStorage.setItem('mealcount', (mealcount + diff).toString(10));
        }
    }

    return(
        <View style={styles.mealform}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>학식  </Text>
                    <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>남은횟수: {mealcount}</Text>
                </View>
                <View style={styles.menuiconform}>
                    <TouchableOpacity
                        style={{width: 30, height: 30, alignItems: 'center', justifyContent: "center"}}
                        onPress={() => changeMealcount(-1)}
                        >
                        <Feather name="minus" size={25} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width: 30, height: 30, alignItems: 'center', justifyContent: "center"}}
                        onPress={() => changeMealcount(+1)}
                    >
                        <Feather name="plus" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}>
                <Text style={{fontSize: 10, color: 'black', fontWeight: '400'}}>미국시기준 9월14일(수) 오후 5:23 업데이트 됨</Text>
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            width: 60, paddingLeft: 10, left: 5
                    }}
                >
                    <Text style={{fontSize: 12, color: "black", fontWeight: "400"}}>로그</Text>
                    <Feather name="chevron-right" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}