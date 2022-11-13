import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';

import styles from './ChecklistSceneStyle';
import { useStateContext, useDellistContext, useModeContext, useSetModeContext, useDispatchContext, useNextIDContext } from './ChecklistContext';
import Todo from './Todo';

import Feather from 'react-native-vector-icons/Feather';

export default function Category({ categoryID, index }) {
    const state = useStateContext();
    const dispatch = useDispatchContext();
    const nextID = useNextIDContext();
    const [category] = state.filter(category => category.categoryID === categoryID);

    const mode = useModeContext();
    const setMode = useSetModeContext();
    const dellist = useDellistContext();
    const [isSelected, setIsSelected] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        setIsSelected(false);
        if(mode !== "CATEGORY_EDIT") setIsEditMode(false);
    }, [mode]);

    const onSelectCategory = () => {
        if(mode == "CATEGORY_DELETE") {
            if(!isSelected) {
                setIsSelected(true);
                dellist.current.push(category.categoryID);
            }
            else {
                setIsSelected(false);
                dellist.current = dellist.current.filter(
                    categoryID => categoryID !== category.categoryID
                );
            }
        }
    }

    const onEditMode = () => {
        if(mode === "CATEGORY_EDIT") return;
        setIsEditMode(true);
        setMode("CATEGORY_EDIT");
    }

    const onAddTodo = () => {
        onEditMode();
        for(let i=0; i<nextID.current.inside.length; i++) {
            if(nextID.current.inside[i].category == categoryID) {
                const ID = nextID.current.inside[i].ID++;
                dispatch({
                    type: 'TODO_ADD',
                    categoryID,
                    ID,
                    todoname: "새 할 일"
                });
                return;
            }
        }
    }

    return(
        <TouchableHighlight
            style={[styles.categoryform, styles.shadowProp, {
                marginTop: index === 0 ? 4 : 0,
                marginBottom: 24,
                backgroundColor: isSelected ? '#ffd4d4' : (isEditMode ? '#dbdbdb' : 'white')
            }]}
            activeOpacity={0.6}
            underlayColor={isSelected ? "#fcc5c5" : (isEditMode ? '#cfcfcf' : "#F8F8F8")}
            onPress={onSelectCategory}
            onLongPress={onEditMode}
        >
            <>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
                    <Text style={[styles.categorytext]}>{category.categoryname}</Text>
                    <TouchableOpacity
                        style={{
                            width: 40, height: 40, left: 5,
                            justifyContent: 'center', alignItems: 'center'
                        }}
                        onPress={onAddTodo}
                    >
                        <Feather name="plus" size={25} color="black" />
                    </TouchableOpacity>
                </View>
                {
                    category.todos.length ?
                    category.todos.map(todo =>
                        <Todo
                            key={todo.ID}
                            categoryID={categoryID}
                            ID={todo.ID}
                            isEditMode={isEditMode}
                        />
                    )
                    : <Text style={{marginBottom: 5}}>할 일이 없습니다.</Text>
                }
            </>
        </TouchableHighlight>
    );
}