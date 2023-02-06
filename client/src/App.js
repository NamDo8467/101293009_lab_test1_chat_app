import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./Join/Join";
import Chat from "./Chat/Chat";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import './index.css'
function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/join" component={Join} />

      <Route path="/chat"component={Chat} />
    </Router>
  );
}

export default App;
