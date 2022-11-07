import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { useModeContext, useStateContext } from "./ChecklistContext";
import Category from "./Category";
import InputForm from "./InputForm";

export default function ScrollForm({ scrollRef, inputRef }) {
    const state = useStateContext();
    const mode = useModeContext();
    const [contentheight, setContentheight] = useState(0);

    const heightCalc = useCallback(() => {
        const offset1 = 5;
        const offset2 = 20;
        return state.reduce((acc, cur) => {
            if(cur.todos.length === 0) return(acc+90+24 + offset1);
            else return(acc+100+(cur.todos.length-1)*35+24 + offset2);
        }, 20)
    }, [state]);

    useEffect(() => {
        setContentheight(heightCalc());
    }, []);

    useEffect(() => {
        setContentheight(heightCalc());
    }, [state, mode]);

    return(
        <ScrollView
            bounces
            ref={scrollRef}
            style={{marginBottom: 60}}
            contentContainerStyle={{height: contentheight}}
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