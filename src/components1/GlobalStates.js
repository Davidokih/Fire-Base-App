import React, { createContext, useState } from 'react'

export const StateContext = createContext()

const GlobalStates = ({ children }) => {
    const [viewPost, setViewPost] = useState([])
    return (
        <StateContext.Provider value={{ viewPost, setViewPost }}>{children}</StateContext.Provider>
    )
}

export default GlobalStates