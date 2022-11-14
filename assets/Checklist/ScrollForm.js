import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Keyboard } from "react-native";

import Feather from "react-native-vector-icons/Feather";

import styles from "./ChecklistSceneStyle";
import { useModeContext, useStateContext } from "./ChecklistContext";
import Category from "./Category";
import InputForm from "./InputForm";

export default function ScrollForm({ scrollRef, inputRef, CreateCategory }) {
    const state = useStateContext();
    const mode = useModeContext();
    const [iskeyon, setIskeyon] = useState(false);

    const keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setIskeyon(true);
        }
    );
    const keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setIskeyon(false);
        }
    );
    
    return(
        <ScrollView
            bounces
            style={{marginBottom: iskeyon ? 0 : 60}}
            ref={scrollRef}
            showsVerticalScrollIndicator={true}
        >
            {
                state === 1 ?
                <Text style={{fontWeight: '400', fontSize: 20, color: 'black', alignSelf: 'center', marginTop: 40}}>
                    로딩 중...
                </Text>
                : (!state.length && mode !== "CATEGORY_ADD") &&
                <View style={{
                    marginTop: 80,
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
                        체크리스트를 만들어보세요!
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.tutorialplusbutton}
                        onPress={CreateCategory.current}
                    >
                        <View style={styles.tutorialplusicon}>
                            <Feather name="plus" color="white" size={33} />
                        </View>
                    </TouchableOpacity>
                </View>
            }
            {
                (state !== 1) &&
                state.map((category, index) =>
                    <Category
                        index={index}
                        key={category.categoryID}
                        categoryID={category.categoryID}
                    />
                )
            }
            <InputForm
                inputRef={inputRef}
            />
            <View style={{height: 30}} />
        </ScrollView>
    )
}