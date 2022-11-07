import { useReducer, useState, createContext, useContext, useRef } from "react";
import { create } from "react-test-renderer";

const initialState = [
    {
        categoryID: 1,
        categoryname: "출국 전",
        todos: [
            {
                ID: 1,
                todoname: "할 일 1",
                done: false,
            },
            {
                ID: 2,
                todoname: "할 일 2",
                done: true,
            },
            {
                ID: 3,
                todoname: "할 일 3",
                done: true,
            },
        ]
    },
    {
        categoryID: 2,
        categoryname: "In UCLA",
        todos: [
            {
                ID: 1,
                todoname: "할 일 1",
                done: true,
            },
            {
                ID: 2,
                todoname: "할 일 2",
                done: false,
            },
        ]
    },
    {
        categoryID: 3,
        categoryname: "귀국 후",
        todos: [
            {
                ID: 1,
                todoname: "할 일 1",
                done: true,
            },
            {
                ID: 2,
                todoname: "할 일 2",
                done: true,
            },
            {
                ID: 3,
                todoname: "할 일 3",
                done: false,
            },
            {
                ID: 4,
                todoname: "할 일 4",
                done: true,
            },
        ]
    },
    {
        categoryID: 4,
        categoryname: "한국 도착",
        todos: [
            {
                ID: 1,
                todoname: "할 일 1",
                done: true,
            },
            {
                ID: 2,
                todoname: "할 일 2",
                done: true,
            },
            {
                ID: 3,
                todoname: "할 일 3",
                done: false,
            },
            {
                ID: 4,
                todoname: "할 일 4",
                done: true,
            },
            {
                ID: 5,
                todoname: "할 일 4",
                done: true,
            },
            {
                ID: 6,
                todoname: "할 일 4",
                done: true,
            },
        ]
    },
    {
        categoryID: 5,
        categoryname: "디지스트",
        todos: [
            {
                ID: 1,
                todoname: "할 일 1",
                done: true,
            },
            {
                ID: 2,
                todoname: "할 일 2",
                done: true,
            },
            {
                ID: 3,
                todoname: "할 일 3",
                done: false,
            },
            {
                ID: 4,
                todoname: "할 일 4",
                done: true,
            },
            {
                ID: 5,
                todoname: "할 일 4",
                done: true,
            },
        ]
    },
]

const initialNextID = {
    categoryID: 6,
    inside: [
        {
            category: 1,
            ID: 4, 
        },
        {
            category: 2,
            ID: 3, 
        },
        {
            category: 3,
            ID: 5, 
        },
        {
            category: 4,
            ID: 5, 
        },
        {
            category: 5,
            ID: 5, 
        },
    ]
}

function reducer(state, action) {
    switch(action.type) {
        case 'CATEGORY_ADD':
            return([
                ...state,
                {
                    categoryID: action.categoryID,
                    categoryname: action.categoryname,
                    todos: []
                }
            ]);
        case 'CATEGORY_DELETE':
            return(state.filter(category =>
                !(category.categoryID in action.categoryIDList)
            ));
        case 'CATEGORY_EDIT':
            return(state.map(category =>
                (category.categoryID === action.categoryID) ?
                {
                    ...category,
                    categoryname: action.categoryname,
                }
                : category
            ));
        case 'TODO_ADD':
            return(state.map(category => 
                (category.categoryID === action.categoryID) ?
                {
                    ...category,
                    todos: [
                        ...category.todos,
                        {
                            ID: action.ID,
                            todoname: action.todoname,
                            done: false,
                        }
                    ]
                }
                : category
            ));
        case 'TODO_EDIT':
            return(state.map(category => 
                (category.categoryID === action.categoryID) ?
                {
                    ...category,
                    todos: category.todos.map(todo =>
                        (todo.ID === action.ID) ?
                        {
                            ...todo,
                            todoname: action.todoname,
                        }
                        : todo
                    )
                }
                : category
            ));
        case 'TODO_TOGGLE':
            return(state.map(category => 
                (category.categoryID === action.categoryID) ?
                {
                    ...category,
                    todos: category.todos.map(todo =>
                        (todo.ID === action.ID) ?
                        {
                            ...todo,
                            done: !todo.done,
                        }
                        : todo
                    )
                }
                : category
            ));
        case 'TODO_DELETE':
            return(state.map(category => 
                (category.categoryID === action.categoryID) ?
                {
                    ...category,
                    todos: category.todos.filter(todo => 
                        !(todo.ID in action.ID)
                    )
                }
                : category
            ));
    }
}

const stateContext = createContext();
const dispatchContext = createContext();
const nextIDContext = createContext();
const dellistContext = createContext();
const modeContext = createContext();
const setModeContext = createContext();

export default function ChecklistContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextID = useRef(initialNextID);
    const dellist = useRef([]);
    const [mode, setMode] = useState("IDLE");

    return(
        <stateContext.Provider value={state}>
            <dispatchContext.Provider value={dispatch}>
                <nextIDContext.Provider value={nextID}>
                    <dellistContext.Provider value={dellist}>
                        <modeContext.Provider value={mode}>
                            <setModeContext.Provider value={setMode}>
                                { children }
                            </setModeContext.Provider>
                        </modeContext.Provider>
                    </dellistContext.Provider>
                </nextIDContext.Provider>
            </dispatchContext.Provider>
        </stateContext.Provider>
    );
}

export function useStateContext() {
    const state = useContext(stateContext);
    if(!state) {
        Error("state context not existing");
        return;
    }
    return state;
}

export function useDispatchContext() {
    const dispatch = useContext(dispatchContext);
    if(!dispatch) {
        Error("dispatch context not existing");
        return;
    }
    return dispatch;
}

export function useNextIDContext() {
    const nextID = useContext(nextIDContext);
    if(!nextID) {
        Error("nextID context not existing");
        return;
    }
    return nextID;
}

export function useDellistContext() {
    const dellist = useContext(dellistContext);
    if(!dellist) {
        Error("dellist context not existing");
        return;
    }
    return dellist;
}
export function useModeContext() {
    const mode = useContext(modeContext);
    if(!mode) {
        Error("mode context not existing");
        return;
    }
    return mode;
}

export function useSetModeContext() {
    const setMode = useContext(setModeContext);
    if(!setMode) {
        Error("setMode context not existing");
        return;
    }
    return setMode;
}