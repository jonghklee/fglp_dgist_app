import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Animated, ToastAndroid, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { ScrollView, RefreshControl, View, Text, TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Shadow } from 'react-native-neomorph-shadows';

import PercentageScrollView from '../scripts/CustomComponents/PercentageScrollView';
import { getTimeLeft, getCurrTime } from '../scripts/CustomModules/GetTime';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeScene({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [scrollPct, setScrollPct] = useState(55);     // scroll Percentage in scrollView
    const [progress, setProgress] = useState(0);        // 귀국까지 진행 정도
    const [fill, setFill] = useState(0);                // progress bar 채워진 정도
    const [mealcount, setMealcount] = useState(14);
    
    useEffect(() => {
        getCurrTime();
        setTimeout(() => setFill(50), 500);
    }, []);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setFill(0);
        setTimeout(() => setFill(50), 500);
        wait(2000).then(() => setRefreshing(false));
        getCurrTime();
    }, []);

    const changeMealcount = (diff) => {
        if(mealcount + diff > 14)
            ToastAndroid.show("밀 플랜의 개수가 14개보다 많을 수 없습니다!", ToastAndroid.SHORT);
        else if(mealcount + diff < 0)
            ToastAndroid.show("밀 플랜의 개수가 0개보다 적을 수 없습니다!", ToastAndroid.SHORT);
        else setMealcount(mealcount + diff);
    }
    

    const OpacityCalc = useCallback((focuspct) => {
        const fadeConst = 1.4;
        const opacity = (100 - Math.abs(focuspct - scrollPct) * fadeConst) / 100;
        return opacity;
    }, [scrollPct]);

    return(
        <View style={styles.body}>
            {/* <View style={[styles.topbar]}> */}
            <LinearGradient colors={['#FFFFFF', '#FFFFFF', '#FFFFFFBB', '#FFFFFF00']} style={styles.topbar}>
                <View>
                    <Text style={{fontSize: 12, color: 'black', fontWeight: '700'}}>UID</Text>
                    <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>0123456789</Text>
                </View>
                <View style={styles.profileform}>
                    <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>김현우님 어서오세요</Text>
                    <View style={styles.profileicon} />
                </View>
            </LinearGradient>
            <PercentageScrollView
                contentContainerStyle={styles.scrollform}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onReadPercentageChanged={(readPercentage)=>{
                    setScrollPct(readPercentage);
                    // console.log(readPercentage);
                }}
            >
                <View style={[styles.dateform, styles.shadowProp]}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <AnimatedCircularProgress
                            size={120}
                            width={15}
                            fill={fill}
                            tintColor="#0068FE"
                            backgroundColor="#FFFFFF"
                            style={{zIndex: 2, transform: [{rotate: '-90deg'}]}}
                        >
                        </AnimatedCircularProgress>
                        <Text style={{zIndex: 2, position: 'absolute', color: 'black', fontSize: 28, fontWeight: '300'}}>
                            {fill}
                            <Text style={{fontSize: 20}}>%</Text>
                        </Text>
                        <View style={{zIndex: 1, position: 'absolute', borderRadius: 100, width: 120, height: 120, ...styles.shadowProp}} />
                        <Shadow inner useArt
                            style={{
                                ...styles.shadowProp,
                                position: 'absolute',
                                backgroundColor: 'white',
                                width: 90,
                                height: 90,
                                borderRadius: 100,
                                // ...include most of View/Layout styles
                            }}
                        />
                    </View>
                    <View style={styles.ddayform}>
                        <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>마감까지</Text>
                        <Text style={{fontSize: 40, color: 'black', fontWeight: '700'}}>D-42</Text>
                    </View>
                </View>
                <View style={{height: 165, marginTop: 20, width: '90%', flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.currencyform, styles.shadowProp]}>
                        <View style={{justifyContent: 'space-between', flex: 1}}>
                            <View>
                                <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>현재환율(보낼때)</Text>
                                <Text style={{fontSize: 26, color: 'black', fontWeight: '500'}}>1337.4</Text>
                            </View>
                            <Text style={{fontSize: 10, color: 'black', fontWeight: '400'}}>미국시기준 9월 14일(수){'\n'}오후 5:23 업데이트 됨</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.brcardform, styles.shadowProp]}>
                        <View style={{justifyContent: 'space-between', flex: 1}}>
                            <View>
                                <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>Bruincard</Text>
                                <Text style={{fontSize: 26, color: 'black', fontWeight: '500'}}>$15.40</Text>
                            </View>
                            <Text style={{fontSize: 10, color: 'black', fontWeight: '400'}}>지금 업데이트 됨</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.mealform}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>학식  </Text>
                            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>남은횟수: {mealcount}</Text>
                        </View>
                        <View style={styles.menuiconform}>
                            <TouchableOpacity
                                onPress={() => changeMealcount(-1)}
                                >
                                <Feather name="minus" size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => changeMealcount(+1)}
                                >
                                <Feather name="plus" size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                            >
                                <Feather name="menu" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{fontSize: 10, color: 'black', fontWeight: '400'}}>미국시기준 9월14일(수) 오후 5:23 업데이트 됨</Text>
                    <View style={[styles.menuform]}>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>Bruin Café</Text>
                        <View style={styles.menu}>
                            <Feather name="x" size={30} color="#808080" />
                            <Text style={{fontSize: 12, color: '#808080', fontWeight: '400', marginTop: 8}}>정보가 없습니다</Text>
                        </View>
                    </View>
                    <View style={[styles.menuform]}>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>De Neve Plaza</Text>
                        <View style={styles.menu}>
                            <Feather name="x" size={30} color="#808080" />
                            <Text style={{fontSize: 12, color: '#808080', fontWeight: '400', marginTop: 8}}>정보가 없습니다</Text>
                        </View>
                    </View>
                    <View style={[styles.menuform]}>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>Rieber Hall</Text>
                        <View style={styles.menu}>
                            <Feather name="x" size={30} color="#808080" />
                            <Text style={{fontSize: 12, color: '#808080', fontWeight: '400', marginTop: 8}}>정보가 없습니다</Text>
                        </View>
                    </View>
                </View>
            </PercentageScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor: "#000",
        elevation: 4,
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollform: {
        alignItems: 'center',
    },
    topbar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 90,
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        zIndex: 5,
        // backgroundColor: 'white',
    },
    profileform: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileicon: {
        marginLeft: 7,
        width: 38,
        height: 38,
        backgroundColor: 'black',
        borderRadius: 50,
    },
    dateform: {
        marginTop: 80,
        paddingLeft: 15,
        paddingRight: 25,
        width: '90%',
        height: 150,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
    },
    flightform: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ddayform: {
        height: 90,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    currencyform: {
        paddingTop: 18,
        paddingLeft: 20,
        paddingBottom: 18,
        borderRadius: 30,
        flex: 1,
        backgroundColor: 'white',
    },
    brcardform: {
        marginLeft: 20,
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 20,
        borderRadius: 30,
        flex: 1,
        backgroundColor: 'white',
    },
    mealform: {
        marginTop: 10,
        padding: 20,
        width: '100%',
        marginBottom: 30,
        backgroundColor: 'white',
    },
    menuiconform: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 70,
        alignItems: 'center',
    },
    menuform: {
        backgroundColor: '#DFECFF',
        height: 500,
        marginTop: 18,
        padding: 10,
        borderRadius: 10,
    },
    menu: {
        marginTop: 6,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});