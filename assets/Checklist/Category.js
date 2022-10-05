import { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';

import styles from './ChecklistSceneStyle';
import { useStateContext, useDellistContext, useModeContext } from './ChecklistContext';
import Todo from './Todo';

import Feather from 'react-native-vector-icons/Feather';

export default function Category({ categoryID, index }) {
    const state = useStateContext();
    const [ category ] = state.filter(category => category.categoryID === categoryID);

    const mode = useModeContext();
    const dellist = useDellistContext();
    const [isSelected, setIsSelected] = useState(false);

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
            console.log(dellist.current);
        }
    }

    return(
        <TouchableHighlight
            style={[styles.categoryform, styles.shadowProp, {
                marginTop: index === 0 ? 4 : 0,
                marginBottom: 24,
                backgroundColor: isSelected ? '#ffd4d4' : 'white'
            }]}
            activeOpacity={0.6}
            underlayColor={isSelected ? "#fcc5c5" : "#F8F8F8"}
            onPress={onSelectCategory}
        >
            <>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
                    <Text style={[styles.categorytext]}>{category.categoryname}</Text>
                    <TouchableOpacity style={{
                        width: 40, height: 40, left: 5,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
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
                            text={todo.todoname}
                            done={todo.done}
                            isdeletemode={true}
                        />
                    )
                    : <Text style={{marginBottom: 5}}>할 일이 없습니다.</Text>
                }
            </>
        </TouchableHighlight>
    );
}