import { useEffect } from "react";
import { StatusBar, Dimensions, View, Text, TouchableOpacity } from "react-native";

import Feather from 'react-native-vector-icons/Feather';

import styles from "./HomeSceneStyle";

export default function DiningForm({ DiningRefresh }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const otherelementheight = 353.42857142857144;      // fixed val, other component height sum
    const menuformheight =                              // tabbarheight = 60 일때
        windowHeight - otherelementheight;

    const menucontent = [
        {
            restaurant: "Bruin Café",
            content: null,
        },
        {
            restaurant: "De Neve Plaza",
            content: null,
        },
        {
            restaurant: "Rieber Hall",
            content: null,
        },
    ]

    useEffect(() => {
        DiningRefresh.current = RefreshDining;
    }, []);

    const RefreshDining = () => {

    }

    return(
        <>
            {menucontent.map(({restaurant, content}, index) => (
                <View
                    key={index}
                    style={[
                        styles.menuform, {
                            width: windowWidth-40,
                            marginLeft: index === 0 ? 20 : 8,
                            marginRight: index === menucontent.length-1 ? 20 : 0,
                        }
                    ]}
                >
                    <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>{restaurant}</Text>
                    <View style={[styles.menu, {height: menuformheight}]}>
                        {content ? content :
                            <>
                                <Feather name="x" size={30} color="#808080" />
                                <Text style={{fontSize: 12, color: '#808080', fontWeight: '400', marginTop: 8}}>
                                    정보가 없습니다
                                </Text>
                            </>
                        }
                    </View>
                </View>
            ))}
        </>
    );
}