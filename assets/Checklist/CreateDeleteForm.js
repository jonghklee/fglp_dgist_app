import { View, Text, TouchableHighlight } from "react-native";

import styles from './ChecklistSceneStyle';
import { useDispatchContext, useDellistContext, useModeContext, useSetModeContext } from "./ChecklistContext";

import Feather from 'react-native-vector-icons/Feather';

export default function CreateDeleteForm({ scrollRef, inputRef, navigation }) {
    const dispatch = useDispatchContext();
    const dellist = useDellistContext();
    const mode = useModeContext();
    const setMode = useSetModeContext();

    const onCreateCategory = () => {
        if(mode === "CATEGORY_ADD") {
            setMode("IDLE");
        }
        else if(mode === "IDLE") {
            setMode("CATEGORY_ADD");
            scrollRef.current.scrollToEnd({animated: true});
            inputRef.current.focus();
        }
        else {
            Alert.alert(
                "CREATE ERROR",
                "My Alert Msg",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { 
                        text: "OK", onPress: () => console.log("OK Pressed")
                    }
                ]
            );
        }
    }

    const onDeleteCategory = () => {
        if(mode === "CATEGORY_DELETE") {
            setMode("IDLE");
            dispatch({
                type: "CATEGORY_DELETE",
                categoryIDList: dellist,
            });
            navigation.setOptions({tabBarStyle: {
                display: 'flex',
                height: 60,
                paddingBottom: 5,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: 'white',
                position: 'absolute',
            }});
        }
        else if(mode === "IDLE") {
            setMode("CATEGORY_DELETE");
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }
        else {
            Alert.alert(
                "DELETE ERROR",
                "My Alert Msg",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { 
                        text: "OK", onPress: () => console.log("OK Pressed")
                    }
                ]
            );
        }
    }

    return(
        <View style={styles.createdeleteform}>
            <TouchableHighlight
                style={[styles.createbutton]}
                underlayColor='#0059D9'
                onPress={onCreateCategory}
            >
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <Feather name="plus-square" size={25} color="#FFFFFF" />
                    <Text style={{fontWeight: '400', fontSize: 16, font: 19, color: '#FFFFFF', marginLeft: 6}}>
                        카테고리 생성
                    </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                style={[styles.deletebutton]}
                underlayColor='#F9F9F9'
                onPress={onDeleteCategory}
            >
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <Feather name="minus-square" size={25} color="#CCCCCC" />
                    <Text style={{fontWeight: '400', fontSize: 16, font: 19, color: '#CCCCCC', marginLeft: 6}}>
                        카테고리 삭제
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}