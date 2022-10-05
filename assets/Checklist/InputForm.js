import { useState } from 'react';
import { Dimensions, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

import styles from './ChecklistSceneStyle';
import { useDispatchContext, useModeContext, useNextIDContext, useSetModeContext } from './ChecklistContext';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function InputForm({ inputRef }) {
    const windowWidth = Dimensions.get("window").width;
    const dispatch = useDispatchContext();
    const nextID = useNextIDContext();
    const [input, setInput] = useState("");
    const mode = useModeContext();
    const setMode = useSetModeContext();

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
        nextID.current.categoryID++;
    }

    return(
        <View style={[
            styles.createcategoryinput,
            styles.shadowProp,
            {opacity: mode === "CATEGORY_ADD" ? 1 : 0}
        ]}>
            <TextInput
                ref={inputRef}
                style={{width: windowWidth-115}}
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={onCreate}
                // editable={mode === "CATEGORY_ADD"}
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
    );
}