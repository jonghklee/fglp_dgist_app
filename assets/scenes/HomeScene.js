import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { ScrollView, RefreshControl, View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import PercentageScrollView from '../scripts/CustomModules/PercentageScrollView';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Shadow } from 'react-native-neomorph-shadows';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeScene({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [scrollPct, setScrollPct] = useState(55);
    const [fill, setFill] = useState(30);
    const [mealcount, setMealcount] = useState(14);

    const focuspct = [55, 72, 90];

    const getTime = () => {
        const curr = new Date();   // 1. 현재 시간(Locale)
        const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);   // 2. UTC 시간 계산
        const LA_TIME_DIFF = -7 * 60 * 60 * 1000;   // UTC -7
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;    // UTC +9
        const la_curr = new Date(utc + (LA_TIME_DIFF));
        const kr_curr = new Date(utc + (KR_TIME_DIFF));
        
        setCurrtime({
            la_time: {
                date: la_curr.getDate(),         //To get the Current Date
                month: la_curr.getMonth() + 1,   //To get the Current Month
                year: la_curr.getFullYear(),     //To get the Current Year
                hours: la_curr.getHours(),       //To get the Current Hours
                min: la_curr.getMinutes(),       //To get the Current Minutes
                sec: la_curr.getSeconds(),       //To get the Current Seconds
            },
            kr_time: {
                date: kr_curr.getDate(),         //To get the Current Date
                month: kr_curr.getMonth() + 1,   //To get the Current Month
                year: kr_curr.getFullYear(),     //To get the Current Year
                hours: kr_curr.getHours(),       //To get the Current Hours
                min: kr_curr.getMinutes(),       //To get the Current Minutes
                sec: kr_curr.getSeconds(),       //To get the Current Seconds
            }
        });
    };
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const OpacityCalc = useCallback((focuspct) => {
        const fadeConst = 1.4;
        const opacity = (100 - Math.abs(focuspct - scrollPct) * fadeConst) / 100;
        return opacity;
    }, [scrollPct]);

    return(
        <View style={styles.body}>
            {/* <LinearGradient colors={['#FFFFFF', '#FFFFFF', '#FFFFFFBB', '#FFFFFF00']} style={styles.topbar}> */}
            <View style={[styles.topbar]}>
                <View>
                    <Text style={{fontSize: 12, color: 'black', fontWeight: '700'}}>UID</Text>
                    <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>0123456789</Text>
                </View>
                <View style={styles.profileform}>
                    <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>김현우님 어서오세요</Text>
                    <View style={styles.profileicon} />
                </View>
            </View>
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
                        <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>출국까지</Text>
                        <Text style={{fontSize: 40, color: 'black', fontWeight: '700'}}>D-42</Text>
                    </View>
                </View>
                <View style={{height: 165, marginTop: 20, width: '85%', flexDirection: 'row'}}>
                    <View style={[styles.currencyform, styles.shadowProp]}>
                        <View>
                            <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>현재환율(보낼때)</Text>
                            <Text style={{fontSize: 26, color: 'black', fontWeight: '500'}}>1337.4</Text>
                        </View>
                        <Text style={{fontSize: 10, color: 'black', fontWeight: '400'}}>미국시기준 9월 14일(수){'\n'}오후 5:23 업데이트 됨</Text>
                    </View>
                    <View style={[styles.brcardform, styles.shadowProp]}>
                        <View>
                            <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>Bruincard</Text>
                            <Text style={{fontSize: 26, color: 'black', fontWeight: '500'}}>$15.40</Text>
                        </View>
                        <Text style={{fontSize: 10, color: 'black', fontWeight: '400'}}>지금 업데이트 됨</Text>
                    </View>
                </View>
                <View style={styles.mealform}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>학식  </Text>
                            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>남은횟수: 12</Text>
                        </View>
                        <View style={styles.menuiconform}>
                            <Feather name="minus" size={20} color="black" />
                            <Feather name="plus" size={20} color="black" />
                            <Feather name="menu" size={20} color="black" />
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
        height: 60,
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        zIndex: 5,
        backgroundColor: 'white',
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
        width: '85%',
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
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'white',
    },
    brcardform: {
        marginLeft: 20,
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 20,
        borderRadius: 30,
        justifyContent: 'space-between',
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
    },
    menuform: {
        backgroundColor: 'white',
        height: 200,
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