/* React Native 기본 모듈 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ScrollView, Dimensions, RefreshControl, StatusBar,
         View, Text, SafeAreaView, TouchableHighlight } from 'react-native';

/* Open Source 모듈 */
import LinearGradient from 'react-native-linear-gradient';

/* 커스텀 모듈 & 컴포넌트 */
import styles from './HomeSceneStyle';
import DDayForm from './DDayForm';
import PanelControl from './PanelControl';
import Mealcount from './Mealcount';
import DiningForm from './DiningForm';

export default function HomeInterface({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    /* 학식메뉴 스크롤 초기위치 설정 기능 */
    const scrollRef = useRef();
    
    /* Refresh 관련 */
    const [refreshing, setRefreshing] = React.useState(false);
    const DDayRefresh = useRef();
    const CurrencyRefresh = useRef();
    const BruincardRefresh = useRef();
    const MealcountRefresh = useRef();
    const DiningRefresh = useRef();

    /* Shrink & Expand */
    const [isShrinked, setIsShrinked] = useState(false);

    const gotoBruincardScene = () => {
        navigation.navigate("BruincardScene");
    };
    
    const gotoCurrencyScene = () => {
        navigation.navigate("CurrencyScene");
    };

    useEffect(() => {
        scrollRef.current?.scrollTo({
            y: windowWidth-32,
            animated: true,
        });
        DDayRefresh.current();
        CurrencyRefresh.current();
        BruincardRefresh.current();
        MealcountRefresh.current();
        DiningRefresh.current();
    }, []);
    
    const onRefresh = useCallback(() => {
        const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        DDayRefresh.current();
        CurrencyRefresh.current();
        BruincardRefresh.current();
        MealcountRefresh.current();
        DiningRefresh.current();
    }, []);

    const onScrollChanged = (scrollamount) => {
        if(scrollamount > 70) {
            setIsShrinked(true);
        }
        else {
            setIsShrinked(false);
        }
    }

    return(
        <SafeAreaView style={styles.body}>
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
            />
            <LinearGradient colors={['#FFFFFF', '#FFFFFF', '#FFFFFF99', '#FFFFFF00']} style={styles.topbar}>
                <View>
                    <Text style={{fontSize: 12, color: 'black', fontWeight: '700'}}>
                        UID
                    </Text>
                    <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>
                        0123456789
                    </Text>
                </View>
                <TouchableHighlight>
                    <View style={styles.profileform}>
                        <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>
                            김현우님 어서오세요
                        </Text>
                        <View style={styles.profileicon} />
                    </View>
                </TouchableHighlight>
            </LinearGradient>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollform}
                snapToInterval={200}
                pagingEnabled
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={({nativeEvent}) => {
                    onScrollChanged(nativeEvent.contentOffset.y);
                }}
                scrollEventThrottle={400}
            >
                <DDayForm DDayRefresh={DDayRefresh} isShrinked={isShrinked} />
                <PanelControl
                    isShrinked={isShrinked}
                    CurrencyRefresh={CurrencyRefresh}
                    BruincardRefresh={BruincardRefresh}
                    gotoBruincardScene={gotoBruincardScene}
                    gotoCurrencyScene={gotoCurrencyScene}
                />
                <Mealcount MealcountRefresh={MealcountRefresh} />
                <ScrollView
                    ref={scrollRef}
                    nestedScrollEnabled
                    pagingEnabled
                    snapToInterval={windowWidth-32}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <DiningForm DiningRefresh={DiningRefresh} />
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}