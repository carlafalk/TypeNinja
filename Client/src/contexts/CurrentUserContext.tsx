import { createContext, useContext, useState } from "react";

interface CurrentUserContext{
    username: string, 
    token:string,
}

const CurrentUserContext = createContext<CurrentUserContext>({
    username:"",
    token:"",
});

interface CurrentUserProviderProps {
  children: React.ReactNode;
}

const CurrentUserProvider = ({ children} : CurrentUserProviderProps) => {
    const [username, setUsername] = useState<string>("")
    const [token, setToken] = useState<string>("")

    return (
        <CurrentUserContext.Provider
            value={{
                username,
                token,
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext);
    return context
}

export default CurrentUserProvider