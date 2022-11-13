import { useEffect, useState } from 'react';
import { Dimensions, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

import styles from './ChecklistSceneStyle';
import { useDispatchContext, useModeContext, useNextIDContext, useSetModeContext } from './ChecklistContext';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function InputForm() {
    const dispatch = useDispatchContext();
    const nextID = useNextIDContext();
    const mode = useModeContext();
    const setMode = useSetModeContext();

    const windowWidth = Dimensions.get("window").width;
    const [input, setInput] = useState("");
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setEditable(mode === "CATEGORY_ADD");
    }, [mode]);

    const onCreate = () => {
        setInput("");
        setMode("IDLE");
        if(!input.trim()) {
            ToastAndroid.show("카테고리 제목 내용이 없습니다!",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            return;
        }
        dispatch({
            type: "CATEGORY_ADD",
            categoryID: nextID.current.categoryID,
            categoryname: input,
        });
        nextID.current.inside.push({
            category: nextID.current.categoryID++,
            ID: 0, 
        });
    }

    return(
        mode === "CATEGORY_ADD"
        &&
        <>
            <View style={[
                styles.createcategoryinput,
                styles.shadowProp,
            ]}>
                <TextInput
                    style={{width: windowWidth-115}}
                    value={input}
                    onChangeText={text => setInput(text)}
                    onSubmitEditing={onCreate}
                    editable={editable}
                />
                <TouchableOpacity
                    onPress={onCreate}
                    style={{
                        width: 50, height: 50, justifyContent: 'center', alignItems: 'center', right: 4
                    }}
                    disabled={!mode === "CATEGORY_ADD"}
                >
                    <MaterialIcons name="check" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </>
    );
}