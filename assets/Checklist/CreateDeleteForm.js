import { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";

import styles from './ChecklistSceneStyle';
import { useDellistContext, useModeContext, useSetModeContext, useStateContext } from "./ChecklistContext";

import Feather from 'react-native-vector-icons/Feather';

export default function CreateDeleteForm({ scrollRef, CreateCategory }) {
    const state = useStateContext();
    const dellist = useDellistContext();
    const mode = useModeContext();
    const setMode = useSetModeContext();

    useEffect(() => {
        CreateCategory.current = onCreateCategory;
    }, []);

    const onCreateCategory = () => {
        if(mode === "CATEGORY_ADD") {
            setMode("IDLE");
        }
        else if(mode === "CATEGORY_DELETE") {
            onDeleteCategory();
            setMode("CATEGORY_ADD");
            scrollRef.current.scrollToEnd({animated: true});
        }
        else {
            setMode("CATEGORY_ADD");
            scrollRef.current.scrollToEnd({animated: true});
        }
    }

    const onDeleteCategory = () => {
        if(mode === "CATEGORY_DELETE") {
            setMode("IDLE");
            dellist.current = [];
        }
        else {
            setMode("CATEGORY_DELETE");
        }
    }

    return(
        (state.length || mode === "CATEGORY_ADD") &&
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
                style={[styles.deletebutton, {backgroundColor: mode === "CATEGORY_DELETE" ? '#FF4B4B' : 'white'}]}
                underlayColor={mode === "CATEGORY_DELETE" ? '#fc2d2d' : '#F9F9F9'}
                onPress={onDeleteCategory}
            >
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <Feather name="minus-square" size={25} color={mode === "CATEGORY_DELETE" ? "white" : "#CCCCCC"} />
                    <Text style={{
                        fontWeight: '400', fontSize: 16, font: 19, marginLeft: 6,
                        color: mode === "CATEGORY_DELETE" ? "white" : '#CCCCCC'
                    }}>
                        카테고리 삭제
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}