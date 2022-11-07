import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDellistContext, useDispatchContext, useModeContext, useSetModeContext } from "./ChecklistContext";

export default function BottomTaskbarForm({navigation}) {
    const mode = useModeContext();
    const setMode = useSetModeContext();
    const [deletemode, setDeletemode] = useState(false);
    const dellist = useDellistContext();
    const dispatch = useDispatchContext();

    useEffect(() => {
        setDeletemode(mode === "CATEGORY_DELETE");
    }, [mode]);

    const EndDeletion = () => {
        setMode("IDLE");
        dellist.current = [];
        navigation.setOptions({tabBarStyle: {
            display: 'flex',
            height: 60,
            paddingBottom: 5,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
            position: 'absolute',
        }});
    }

    return(
        <>
            { deletemode &&
                <View
                    style={[styles.bottomtaskbar, styles.shadowProp]}
                >
                    <TouchableOpacity
                        style={{
                            height: 50, width: 50, justifyContent: 'center', alignItems: 'center',
                        }}
                        onPress={() => {
                            EndDeletion();
                            dispatch({
                                type: "CATEGORY_DELETE",
                                categoryIDList: dellist,
                            });
                        }}
                    >
                        <Text style={{color: '#CCCCCC', fontSize: 16, fontWeight: '500'}}>완료</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 50, width: 50, justifyContent: 'center', alignItems: 'center'
                        }}
                        onPress={EndDeletion}
                    >
                        <Text style={{color: '#FF4B4B', fontSize: 16, fontWeight: '500'}}>취소</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
}