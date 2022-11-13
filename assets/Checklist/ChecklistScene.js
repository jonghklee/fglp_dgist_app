import { useEffect, useRef } from 'react';
import { SafeAreaView, StatusBar, Text, View, 
         TouchableHighlight } from 'react-native';

import styles from './ChecklistSceneStyle';
import ChecklistContext from './ChecklistContext';
import CreateDeleteForm from './CreateDeleteForm';
import ScrollForm from './ScrollForm';
import BottomTaskbarForm from './BottomTaskBar';

export default function ChecklistScene({ navigation }) {
    // 스크롤 위치 관리
    const scrollRef = useRef();
    // CREATE 함수
    const CreateCategory = useRef();

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
                    scrollRef={scrollRef}
                    CreateCategory={CreateCategory}
                />
                <ScrollForm
                    scrollRef={scrollRef}
                    CreateCategory={CreateCategory}
                />
                <BottomTaskbarForm
                    navigation={navigation}
                />
            </ChecklistContext>
        </SafeAreaView>
    );
}