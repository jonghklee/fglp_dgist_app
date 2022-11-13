import { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

import styles from './ChecklistSceneStyle';
import { useDispatchContext, useModeContext, useStateContext } from './ChecklistContext';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';

export default function Todo({ categoryID, ID, isEditMode }) {
    const state = useStateContext();
    const dispatch = useDispatchContext();
    const mode = useModeContext();

    const [todoname, setTodoname] = useState("");
    const [done, setDone] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const onToggle = () => {
        setDone(!done);
        dispatch({
            type: 'TODO_TOGGLE',
            categoryID,
            ID,
        });
    }
    
    const onDelete = () => {
        setDeleted(!deleted);
    }

    const onChange = (val) => {
        setTodoname(val);
    }

    const getData = () => {
        state.forEach(category => {
            if(category.categoryID === categoryID) {
                category.todos.forEach(todo => {
                    if(todo.ID === ID) {
                        setTodoname(todo.todoname);
                        setDone(todo.done);
                    }
                })
            }
        });
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if(mode === "CONFIRMED") {
            dispatch({
                type: 'TODO_EDIT',
                categoryID,
                ID,
                todoname,
            });
            if(deleted) {
                dispatch({
                    type: 'TODO_DELETE',
                    categoryID,
                    ID,
                });
            }
        }
        else {
            getData();
        }
    }, [mode]);

    return(
        <View style={styles.todoform}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableHighlight
                    onPress={onToggle}
                    underlayColor="rgba(0, 0, 0, 0.07)"
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
                <View style={styles.todotext}>
                    {
                        !isEditMode &&
                        <Text style={{fontWeight: '400', fontSize: 14, color: 'black',}}>
                            {todoname}
                        </Text>
                    }
                    {
                        isEditMode &&
                        <TextInput
                            style={styles.todoinput}
                            onChangeText={onChange}
                            value={todoname}
                            activeUnderlineColor="#4f4f4f"
                        />
                    }
                </View>
            </View>
            { isEditMode &&
                <TouchableOpacity
                    style={{
                        width: 30, height: 30,
                        justifyContent: 'center', alignItems: 'center',
                    }}
                    activeOpacity={0.6}
                    onPress={onDelete}
                >
                    <MaterialIcons name="delete" size={22} color={deleted ? "black" : "#919191"} />
                </TouchableOpacity>
            }
        </View>
    );
}