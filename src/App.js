import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpaceInvaders from "./games/space-invaders/space-invaders";
import Pong from "./games/pong/Pong";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ApiPage from "./components/ApiPage.js";
// Routes need to be updated in ./components.SideBarData.js
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/GameWebiste-React" element={<Home />} />
          <Route
            path="/GameWebiste-React/spaceinvaders"
            element={<SpaceInvaders />}
          />
          <Route path="/GameWebiste-React/pong" element={<Pong />} />
          <Route path="/GameWebiste-React/api" element={<ApiPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
