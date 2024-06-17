//import logo from "./logo.svg";
//import "./App.css";
//import SpaceInvaders from "./games/space-invaders/space-invaders.js";
import NavBar from "./components/NavBar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
