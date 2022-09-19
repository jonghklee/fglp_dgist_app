import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { ScrollView, RefreshControl, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import PercentageScrollView from '../scripts/CustomModules/PercentageScrollView';
import LinearGradient from 'react-native-linear-gradient';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeScene({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [scrollPct, setScrollPct] = useState(55);

    const focuspct = [55, 72, 90];

    /* const getTime = () => {
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
    }; */
    
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
            <View style={[styles.topbar, scrollPct > 55 ? styles.shadowProp : null]}>
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
                <View style={[styles.dateform, {backgroundColor: `rgba(0, 104, 254, ${OpacityCalc(focuspct[0])})`}]}>
                    <View style={styles.flightform}>
                        <MaterialIcons style={{marginLeft: '2%'}} name="flight-takeoff" size={40} color="white" />
                        <View style={styles.ddayform}>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: '500'}}>출국까지  </Text>
                            <Text style={{fontSize: 40, color: 'white', fontWeight: '700'}}>D-42</Text>
                        </View>
                    </View>
                    <View style={styles.timeform}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: '700'}}>미국</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: '700'}}>한국</Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 170, marginTop: 20, width: '85%', flexDirection: 'row'}}>
                    <View style={[styles.currencyform, {backgroundColor: `rgba(0, 104, 254, ${OpacityCalc(focuspct[1])})`}]}>
                        <View>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: '500'}}>현재환율(보낼때)</Text>
                            <Text style={{fontSize: 26, color: 'white', fontWeight: '500'}}>1337.4</Text>
                        </View>
                        <Text style={{fontSize: 10, color: 'white', fontWeight: '400'}}>미국시기준 9월 14일(수){'\n'}오후 5:23 업데이트 됨</Text>
                    </View>
                    <View style={[styles.brcardform, {backgroundColor: `rgba(0, 104, 254, ${OpacityCalc(focuspct[1])})`}]}>
                        <View>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: '500'}}>Bruincard</Text>
                            <Text style={{fontSize: 26, color: 'white', fontWeight: '500'}}>$15.40</Text>
                        </View>
                        <Text style={{fontSize: 10, color: 'white', fontWeight: '400'}}>지금 업데이트 됨</Text>
                    </View>
                </View>
                <View style={[styles.mealform, {backgroundColor: `rgba(0, 104, 254, ${OpacityCalc(focuspct[2])})`}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={{fontSize: 20, color: 'white', fontWeight: '700'}}>학식  </Text>
                            <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>남은횟수: 12</Text>
                        </View>
                        <View style={styles.menuiconform}>
                            <Feather name="minus" size={20} color="white" />
                            <Feather name="plus" size={20} color="white" />
                            <Feather name="menu" size={20} color="white" />
                        </View>
                    </View>
                    <Text style={{fontSize: 10, color: 'white', fontWeight: '400'}}>미국시기준 9월14일(수) 오후 5:23 업데이트 됨</Text>
                    <View style={[styles.menuform, {backgroundColor: `rgba(126, 179, 252, ${OpacityCalc(focuspct[2])})`}]}>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: '700'}}>Bruin Café</Text>
                        <View style={styles.menu}>
                            <Feather name="x" size={30} color="#808080" />
                            <Text style={{fontSize: 12, color: '#808080', fontWeight: '400', marginTop: 8}}>정보가 없습니다</Text>
                        </View>
                    </View>
                    <View style={[styles.menuform, {backgroundColor: `rgba(126, 179, 252, ${OpacityCalc(focuspct[2])})`}]}>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: '700'}}>De Neve Plaza</Text>
                        <View style={styles.menu}>
                            <Feather name="x" size={30} color="#808080" />
                            <Text style={{fontSize: 12, color: '#808080', fontWeight: '400', marginTop: 8}}>정보가 없습니다</Text>
                        </View>
                    </View>
                    <View style={[styles.menuform, {backgroundColor: `rgba(126, 179, 252, ${OpacityCalc(focuspct[2])})`}]}>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: '700'}}>Rieber Hall</Text>
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
        elevation: 20,
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
        width: '85%',
        height: 170,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 30,
    },
    flightform: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeform: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ddayform: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    currencyform: {
        paddingTop: 18,
        paddingLeft: 20,
        paddingBottom: 18,
        borderRadius: 30,
        justifyContent: 'space-between',
        flex: 1,
    },
    brcardform: {
        marginLeft: 20,
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 20,
        borderRadius: 30,
        justifyContent: 'space-between',
        flex: 1,
    },
    mealform: {
        marginTop: 20,
        padding: 20,
        width: '85%',
        borderRadius: 30,
        marginBottom: 30,
    },
    menuiconform: {
        flexDirection: 'row',
    },
    menuform: {
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