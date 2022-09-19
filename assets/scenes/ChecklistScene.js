import { StyleSheet, View, Text } from 'react-native';
import { Bar, Pie, Circle, CircleSnail } from 'react-native-progress';

export default function TipScene() {
    const widthAndHeight = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
    return(
        <>
            <Bar progress={0.3} width={400} height={20} />
            <Pie progress={0.4} size={50} />
            <Circle size={30} indeterminate={true} />
            {/* <CircleSnail progress={0.3}/> */}
        </>
    );
}