import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminAuth from "./pages/auth/AdminAuth";
import SignUp from "./pages/signup/SignUp";
import AdminMain from "./pages/main/AdminMain";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={AdminAuth} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/admin" component={AdminMain} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
