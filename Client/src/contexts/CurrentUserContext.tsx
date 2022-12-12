import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalstorage";
import { CurrentUser } from "../models/CurrentUser";

interface CurrentUserContext {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
}

const CurrentUserContext = createContext<CurrentUserContext>({
  currentUser: { username: "", token: "", isLoggedIn: false },
  setCurrentUser: () => {},
});

interface CurrentUserProviderProps {
  children: React.ReactNode;
}

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useLocalStorage<CurrentUser>("currentUser", {
    username: "",
    token: "",
    isLoggedIn: false,
  });

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  return context;
};

export default CurrentUserProvider;
