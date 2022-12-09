import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Routes } from "react-router-dom"
import GlobalStyle from "./globalStyles"
import Layout from "./Layout"
import { Game } from "./pages/Game"
import { Highscore } from "./pages/Highscore"
import { Login } from "./pages/Login"
import { Profile } from "./pages/Profile"

function App() {
  const queryClient = new QueryClient();
  return (
  <>
  <QueryClientProvider client={queryClient}>
   <GlobalStyle />
   <Routes>
     <Route path="/" element={<Layout/>}>
        <Route path="" element={<Login />}/>
        <Route path="game/" element={<Game />}/>
        <Route path="profile/" element={<Profile/>}>
          <Route path="highscore/" element={<Highscore/>}/>
        </Route>
     </Route>
   </Routes>
  </QueryClientProvider>
  </>
  )
}

export default App
