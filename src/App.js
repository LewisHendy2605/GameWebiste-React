import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpaceInvaders from "./games/space-invaders/space-invaders";
import Pong from "./games/pong/Pong";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/GameWebiste-React" element={<Home />} />
          <Route path="/spaceinvaders" element={<SpaceInvaders />} />
          <Route path="/pong" element={<Pong />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
