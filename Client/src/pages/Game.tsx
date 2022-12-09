import { useQuery } from "react-query";
import MainContent from "../components/MainContent";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import useAxios from "../hooks/useAxios";

export const Game = () => {
    // const [currentUser, setCurrentUser] = useLocalStorage<CurrentUser>("currentUser", {username:"", token:"", isLoggedIn:false});
    const { currentUser ,setCurrentUser } = useCurrentUser();
    const fetchWords = useAxios({url: "https://api.datamuse.com/words?sl=jirraf", method: "get"});
    const { data } = useQuery<string[]>(["words"], fetchWords);

  return (
    <>
    <MainContent>
      {currentUser.username}
    </MainContent>
    </>
  )
}
