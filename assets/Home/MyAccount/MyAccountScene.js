import { useEffect } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function MyAccountScene({ navigation }) {
    // Parent TabBarNavigation Control
    useEffect(() => {
        // Delete Parent Bottom Tab Bar
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        // Show Parent Bottom Tab Bar
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'flex',
                height: 60,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: 'white',
                position: 'absolute',
            }
        });
    }, [navigation]);

    return(
        <View style={styles.body}>
            <ScrollView
                style={styles.scrollform}
                contentContainerStyle={{alignItems: 'center'}}
            >
                <Text style={styles.titletext}>
                    내 정보
                </Text>
                <Image source={require('../../Images/profileimg.png')} />
                <Text style={styles.engnametext}>
                    Hong, Gildong
                </Text>
                <Text style={styles.kornametext}>
                    홍길동
                </Text>
                <Text style={styles.uidtext}>
                    UID: 1234567890
                </Text>
                <Text style={styles.ddaytext}>
                    D-42
                </Text>
                <Image style={styles.globeimg} source={require('../../Images/globe.png')} />
                <Text style={styles.titletext}>
                    이용안내
                </Text>
                <TouchableOpacity
                    style={[styles.button, styles.shadowProp]}
                    activeOpacity={0.6}
                >
                    <Text style={styles.buttontext}>
                        서비스 이용약관
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.shadowProp]}
                    activeOpacity={0.6}
                >
                    <Text style={styles.buttontext}>
                        개인정보 처리방침
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={[styles.button, styles.shadowProp, {marginBottom: 20}]}
                >
                    <Text style={styles.buttontext}>
                        오픈소스 라이선스
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowColor: "#000",
        elevation: 3,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    scrollform: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    titletext: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        alignSelf: 'flex-start',
        marginLeft: 25,
    },
    engnametext: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
    },
    kornametext: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        marginTop: 5,
    },
    uidtext: {
        fontSize: 16,
        fontWeight: '300',
        color: 'black',
        marginTop: 10,
    },
    ddaytext: {
        fontSize: 28,
        fontWeight: '700',
        color: 'black',
        marginTop: 25,
        marginBottom: 5,
    },
    globeimg: {
        marginTop: 5,
        marginBottom: 20,
    },
    button: {
        height: 40,
        width: windowWidth-40,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 10,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    buttontext: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black',
        marginTop: 0,
    },
});