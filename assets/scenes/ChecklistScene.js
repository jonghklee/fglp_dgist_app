import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
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
            
            <TouchableHighlight
                underlayColor="gray"
            >
                <View style={{
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: 10 
                }}>
                    <Text>dsfadf</Text>
                </View>
            </TouchableHighlight>
        </>
    );
}