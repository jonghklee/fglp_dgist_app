import { View, Text, TouchableHighlight } from 'react-native';

import styles from './ChecklistSceneStyle';
import { useDispatchContext, useModeContext } from './ChecklistContext';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Todo({ categoryID, ID, text, done, isdeletemode, deletelist }) {
    const dispatch = useDispatchContext();
    const mode = useModeContext();

    const onToggle = () => {
        dispatch({
            type: 'TODO_TOGGLE',
            categoryID,
            ID,
        });
    };

    return(
        <View style={styles.todoform}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableHighlight
                    onPress={onToggle}
                    activeOpacity={0.6}
                    underlayColor="#F8F8F8"
                    style={{
                        width: 30, height: 30, left: -5, borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center',
                    }}
                    disabled={mode === "CATEGORY_DELETE"}
                >
                    <View style={[styles.checkbox, { backgroundColor: done ? "black" : "rgba(255,255,255,0)" }]}>
                        { done && <Feather name="check" size={16} color="white" /> }
                    </View>
                </TouchableHighlight>
                <Text style={styles.todotext}>{text}</Text>
            </View>
            { isdeletemode &&
                <TouchableHighlight
                    style={{
                        width: 30, height: 30,
                        justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <MaterialIcons name="delete" size={22} color="black" />
                </TouchableHighlight>
            }
        </View>
    );
}