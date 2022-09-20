import { useCallback, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Bar, Pie, Circle, CircleSnail } from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Shadow } from 'react-native-neomorph-shadows';

export default function TipScene() {
    /* const [fillState, setFillState] = useState(30);
    const widthAndHeight = 250;
    const series = [123, 321, 123, 789, 537];
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800'];
    
    const increment = useCallback((timeout) => {
        return new Promise((resolve, reject) => (
            setTimeout(() => {
                setFillState(fillState + 10);
                resolve();
            }, timeout)
        ));   
    }, [fillState]);
 */
    return(
        <>
            <Bar progress={0.3} width={400} height={20} />
            {/* <AnimatedCircularProgress
                size={200}
                width={20}
                fill={fillState}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {
                    (fill) => (
                        <Text>
                            { fillState }
                        </Text>
                    )
                }
            </AnimatedCircularProgress> */}
            <Shadow
                /* inner */ // <- enable inner shadow
                useArt // <- set this prop to use non-native shadow on ios
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    backgroundColor: 'white',
                    width: 100,
                    height: 200,
                    // ...include most of View/Layout styles
                }}
            >
            </Shadow>
        </>
    );
}