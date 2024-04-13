import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    users: null,
    token: null,
    setUsers: () => { },
    setToken: () => { }
})

export const ContextProvider = ({ children }) => {

    const [users, setUsers] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('access_token'));

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('access_token', token)
        } else {
            localStorage.removeItem('access_token')
        }
    }


    return (
        <StateContext.Provider value={{
            users,
            token,
            setUsers,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)