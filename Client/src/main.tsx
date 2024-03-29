import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CurrentUserProvider from "./contexts/CurrentUserContext";
import GameProvider from "./contexts/GameContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GameProvider>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </GameProvider>
    </BrowserRouter>
  </React.StrictMode>
);
