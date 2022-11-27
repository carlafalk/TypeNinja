import { Route, Routes } from "react-router-dom"
import GlobalStyle from "./globalStyles"
import Layout from "./Layout"
import { Game } from "./pages/Game"
import { Highscore } from "./pages/Highscore"
import { Login } from "./pages/Login"
import { Profile } from "./pages/Profile"

function App() {

  return (
  <>
   <GlobalStyle />
   <Routes>
     <Route path="/" element={<Layout/>}>
        <Route index element={<Login />}/>
        <Route path="game/" element={<Game />}/>
        <Route path="profile/" element={<Profile/>}>
          <Route path="highscore/" element={<Highscore/>}/>
        </Route>
     </Route>
   </Routes>
  </>
  )
}

export default App
