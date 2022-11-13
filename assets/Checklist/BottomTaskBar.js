import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDellistContext, useDispatchContext, useModeContext, useSetModeContext } from "./ChecklistContext";

export default function BottomTaskbarForm({ navigation }) {
    const mode = useModeContext();
    const setMode = useSetModeContext();
    const dellist = useDellistContext();
    const dispatch = useDispatchContext();

    const showTabbar = () => {
        navigation.setOptions({
            tabBarStyle: {
                display: 'flex',
                height: 60,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: 'white',
                position: 'absolute',
            }
        });
    }

    const hideTabbar = () => {
        navigation.setOptions({
            tabBarStyle: {
                display: 'none',
            }
        });
    }

    const ConfirmDeletion = () => {
        setMode("IDLE");
        dispatch({
            type: "CATEGORY_DELETE",
            categoryIDList: dellist.current,
        });
        dellist.current = [];
    }
    
    const CancelDeletion = () => {
        setMode("IDLE");
        dellist.current = [];
    }
    
    const ConfirmEditing = () => {
        setMode("CONFIRMED");
    }
    
    const CancelEditing = () => {
        setMode("CANCELED");
    }

    useEffect(() => {
        if(mode === "CATEGORY_DELETE" || mode === "CATEGORY_EDIT")
            hideTabbar();
        else showTabbar();
    }, [mode]);

    return(
        <>
            { (mode === "CATEGORY_DELETE" || mode === "CATEGORY_EDIT") &&
                <View
                    style={[styles.bottomtaskbar, styles.shadowProp]}
                >
                    <TouchableOpacity
                        style={{
                            height: 50, width: 50, justifyContent: 'center', alignItems: 'center',
                        }}
                        onPress={() => {
                            if(mode === "CATEGORY_DELETE") ConfirmDeletion();
                            else if(mode === "CATEGORY_EDIT") ConfirmEditing();
                        }}
                        >
                        <Text style={{color: '#CCCCCC', fontSize: 16, fontWeight: '500'}}>완료</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 50, width: 50, justifyContent: 'center', alignItems: 'center'
                        }}
                        onPress={() => {
                            if(mode === "CATEGORY_DELETE") CancelDeletion();
                            else if(mode === "CATEGORY_EDIT") CancelEditing();
                        }}
                    >
                        <Text style={{color: '#FF4B4B', fontSize: 16, fontWeight: '500'}}>취소</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
}