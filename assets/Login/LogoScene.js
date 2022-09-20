import { View, Text, StyleSheet } from 'react-native';
/* import {
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold
} from '@expo-google-fonts/dancing-script';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'; */

function LogoScene({ navigation }) {
    /* let [fontsLoaded, error] = useFonts({
        DancingScript_400Regular,
        DancingScript_500Medium,
        DancingScript_600SemiBold,
        DancingScript_700Bold
    });
    if(!fontsLoaded) {
        return <AppLoading />
    } */
    setTimeout(() => navigation.replace('MainApp'), 2000);
    return(
        <View style={styles.body}>
            <Text style={styles.title}>DiamondTree</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    title: {
        // fontFamily: 'DancingScript_400Regular',
        color: 'black',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 40,
    }
});

export default LogoScene;