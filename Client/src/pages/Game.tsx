import { useCurrentUser } from "../contexts/CurrentUserContext";

export const Game = () => {
    // const [currentUser, setCurrentUser] = useLocalStorage<CurrentUser>("currentUser", {username:"", token:"", isLoggedIn:false});
    const { currentUser ,setCurrentUser } = useCurrentUser();


  return (
    <>
    <div style={{marginTop: 100}}>{currentUser.username}</div>
    </>
  )
}
