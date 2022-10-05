import { useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View, 
         ScrollView, TouchableHighlight, Alert } from 'react-native';

import styles from './ChecklistSceneStyle';
import ChecklistContext, { useModeContext, useStateContext } from './ChecklistContext';
import CreateDeleteForm from './CreateDeleteForm';
import InputForm from './InputForm';
import Category from './Category';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

export default function ChecklistScene({ navigation }) {
    // 스크롤 위치 관리
    const scrollRef = useRef();
    // input focus 관리
    const inputRef = useRef();

    const mode = useModeContext();

    return(
        <SafeAreaView style={styles.body}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <TouchableHighlight
                underlayColor="#FFFFFF"
                onPress={() => {
                    scrollRef.current?.scrollTo({
                        y: 0,
                        animated: true,
                    });
                }}
            >
                <Text style={styles.maintext}>체크리스트</Text>
            </TouchableHighlight>
            <ChecklistContext>
                <CreateDeleteForm
                    inputRef={inputRef}
                    scrollRef={scrollRef}
                    navigation={navigation}
                />
                <ScrollForm
                    scrollRef={scrollRef}
                    inputRef={inputRef}
                />
            </ChecklistContext>
            {mode === "CATEGORY_DELETE" &&
                <View
                    style={[styles.bottomtaskbar, styles.shadowProp]}
                />
            }
        </SafeAreaView>
    );
}

function ScrollForm({ scrollRef, inputRef }) {
    const state = useStateContext();
    const [contentheight, setContentheight] = useState(2000);

    return(
        <ScrollView
            bounces
            ref={scrollRef}
            style={{marginBottom: 60}}
            showsVerticalScrollIndicator={true}
        >
            {state.map((category, index) =>
                <Category
                    index={index}
                    key={category.categoryID}
                    categoryID={category.categoryID}
                />
            )}
            <InputForm
                inputRef={inputRef}
            />
        </ScrollView>
    )
}