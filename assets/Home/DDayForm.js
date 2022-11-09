import { useState, useRef, useEffect } from "react";
import { Dimensions, View, Text, TouchableWithoutFeedback, Animated } from "react-native";

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Shadow } from 'react-native-neomorph-shadows';

import styles from "./HomeSceneStyle";
import { getTimeDiff } from './GetTime';

export default function DDayForm({ DDayRefresh, isShrinked }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    /* progressbar 관련 */
    const staticprogressPct = useRef(0);                    // 애니메이션 구애받지 않는 실질 progress %
    const [fill, setFill] = useState(0);                    // progress circle 채워진 정도
    const [progress, setProgress] = useState(0);            // progress 숫자 애니메이션
    const progresstime = useRef(0);                         // progress 숫자 애니메이션 경과시간

    /* DDay 관련 */
    const [ddayinfo, setDDayinfo] = useState({ startdate: "2022-09-28", enddate: "2022-11-20", dayleft: null });

    /* Shrink & Expand Animation 관련 변수 */
    const shrinkpanel = useRef(new Animated.Value(150)).current;
    const fadepanel = useRef(new Animated.Value(1)).current;
    
    const pctmodestd = 50;      // 진행률 숫자 progressbar 왼쪽, 오른쪽 배치 모드 전환 기준이 되는 값
    const shrinkPctText = useRef(new Animated.Value(28)).current;
    const shrinkPctSymbol = shrinkPctText.interpolate({
        inputRange: [16, 28], outputRange: [16, 20],
    });
    const pcttextColorchange = shrinkPctText.interpolate({
        inputRange: [16, 28],
        outputRange: [staticprogressPct.current > pctmodestd ? 'white' : 'black', 'black'],
    });

    const progressbarfill = useRef(new Animated.Value(0)).current;
    const progressbarmove = progressbarfill.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, (staticprogressPct.current-100) / 100 * (windowWidth-40)],
    });
    const progressbarwidth = progressbarfill.interpolate({
        inputRange: [0, 1],
        outputRange: [0, windowWidth-40],
    });

    const progressbarfade = useRef(new Animated.Value(0)).current;
    const pcttextPoschange = progressbarfade.interpolate({
        inputRange: [0, 1],
        outputRange: [0, staticprogressPct.current / 100 * windowWidth * 0.9
            +(staticprogressPct.current > pctmodestd ? -100 : -52)
        ],
    });
    const progressbarColorchange = progressbarfade.interpolate({
        inputRange: [0, 1],
        outputRange: ['#0068FE00', '#0068FEFF'],
    });
    
    /* Shrinking Animation Triggering */
    useEffect(() => {
        if (isShrinked) {
            Animated.timing(fadepanel, {toValue: 0, duration: 150, useNativeDriver: false}).start();
            Animated.timing(shrinkpanel, {toValue: 22, duration: 300, useNativeDriver: false}).start();
            Animated.timing(shrinkPctText, {toValue: 16, delay: 300, duration: 300, useNativeDriver: false}).start();
            Animated.timing(progressbarfill, {toValue: 1, delay: 150, duration: 300, useNativeDriver: false}).start();
            Animated.timing(progressbarfade, {toValue: 1, duration: 300, useNativeDriver: false}).start();
        }
        else {
            Animated.timing(fadepanel, {toValue: 1, delay: 300, duration: 300, useNativeDriver: false}).start();
            Animated.timing(shrinkpanel, {toValue: 150, duration: 300, useNativeDriver: false}).start();
            Animated.timing(shrinkPctText, {toValue: 28, duration: 300, useNativeDriver: false}).start();
            Animated.timing(progressbarfill, {toValue: 0, duration: 10, useNativeDriver: false}).start();
            Animated.timing(progressbarfade, {toValue: 0, duration: 10, useNativeDriver: false}).start();
            RefreshDDay();
        }
    }, [isShrinked]);
    
    /* 컴포넌트 등장 최초 한번만 실행 */
    useEffect(() => {
        DDayRefresh.current = RefreshDDay;
        RefreshDDay();
    }, []);
    
    const RefreshDDay = () => {
        const daypassed = getTimeDiff(ddayinfo.startdate, "now").diffDay;
        const entiredays = getTimeDiff(ddayinfo.startdate, ddayinfo.enddate).diffDay;
        setDDayinfo({...ddayinfo, dayleft: entiredays - daypassed});
        const progresspct = Math.floor(daypassed/entiredays*100);
        if(progresspct < 0) {
            staticprogressPct.current = 0;
        }
        else if(progresspct > 100) {
            staticprogressPct.current = 100;
        }
        else {
            staticprogressPct.current = progresspct;
        }
        setFill(0);
        setProgress(0);
        progresstime.current = 0;
        setTimeout(() => setFill(staticprogressPct.current), 500);
    };

    /* 숫자 오르는 애니메이션 */
    setTimeout(() => {
        if(progress < fill) {
            progresstime.current += 10;
            const velocity = Math.floor(progressvelocity(progresstime.current));
            if(progress + velocity > fill) setProgress(fill);
            else setProgress(progress + velocity);
        }
    }, 10);
    
    /* progress 오르는 속도 함수 */
    const progressvelocity = (time) => {
        return 5-5*(time-600)*(time-600)/(1200*1200);
    }
    
    return(
        <TouchableWithoutFeedback onPress={()=>{}}>
            <View style={{marginTop: 70, height: 150, width: windowWidth-40, justifyContent: 'flex-end'}}>
                <Animated.View
                    style={[styles.dateform, styles.shadowProp, 
                        {alignItems: 'center', height: shrinkpanel}
                    ]}
                >
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Animated.View style={{
                            width: 120, height: 120, position: !isShrinked ? 'absolute' : 'relative',
                            alignItems: 'center', justifyContent: 'center', opacity: fadepanel
                        }}>
                            <AnimatedCircularProgress
                                size={120}
                                width={15}
                                fill={fill}
                                tintColor="#0068FE"
                                backgroundColor="#FFFFFF"
                                style={{
                                    position: 'absolute', zIndex: 2, transform: [{rotate: '-90deg'}]
                                }}
                            />
                            <Shadow
                                style={{
                                    ...styles.shadowProp,
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    width: 120,
                                    height: 120,
                                    borderRadius: 100,
                                    zIndex: 1,
                                }}
                            />
                            <Shadow inner
                                style={{
                                    ...styles.shadowProp,
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    width: 90,
                                    height: 90,
                                    borderRadius: 100,
                                    zIndex:1,
                                }}
                            />
                        </Animated.View>
                        <Animated.Text style={{
                            zIndex: 2, color: pcttextColorchange, fontSize: shrinkPctText, fontWeight: '300',
                            width: 120, textAlign: 'center',
                            position: isShrinked ? 'absolute' : 'relative',
                            left: pcttextPoschange,
                        }}>
                            {progress}
                            <Animated.Text style={{fontSize: shrinkPctSymbol}}>%</Animated.Text>
                        </Animated.Text>
                    </View>
                    <Animated.View style={[styles.ddayform, {opacity: fadepanel}]}>
                        <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                            마감까지
                        </Text>
                        <Text style={{fontSize: 40, color: 'black', fontWeight: '700'}}>
                            D-{ddayinfo.dayleft}
                        </Text>
                    </Animated.View>
                    <Animated.View
                        width={progressbarwidth}
                        style={[styles.progressbar, {
                            backgroundColor: progressbarColorchange,
                            left: progressbarmove,
                        }]}
                    />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}