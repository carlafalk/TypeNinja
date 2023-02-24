import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Layout from "./Layout";
import { Game } from "./pages/Game";
import { Highscore } from "./pages/Highscore";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import Score from "./pages/Score";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="game/" element={<Game />} />
            <Route path="game/score/" element={<Score />} />
            <Route path="profile/" element={<Profile />}>
              <Route path="highscore/" element={<Highscore />} />
            </Route>
          </Route>
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
