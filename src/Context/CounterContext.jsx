import { createContext, useState } from "react";

export let counterContext= createContext();
 
export function CounterContextProvider(props){
    const [counter, setcounter] = useState(0);
    const [UserName, setUserName] = useState('')
    return <counterContext.Provider value={{counter,UserName}} >

        {props.children}
    </counterContext.Provider>
}