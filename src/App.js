import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminAuth from "./pages/auth/AdminAuth";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={AdminAuth} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
