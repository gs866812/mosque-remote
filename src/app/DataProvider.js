"use client";
import { useState, createContext } from "react";
export const ContextData = createContext(null);


export default function DataProvider({ children }) {
    const [reFetch, setReFetch] = useState(false);

    const info = {
        reFetch,
        setReFetch
    };
    return <ContextData.Provider value={info}>{children}</ContextData.Provider>
}
