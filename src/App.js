import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import AuthSignUp from "./pages/auth/AuthSignUp";
import AdminMain from "./pages/main/AdminMain";
import Loading from "./pages/loading/Loading";
import Reserve from "./pages/reserve/UserReserve";
import ReserveComplete from "./pages/reserve_complete/ReserveComplete";
import ReserveQR from "./pages/reserve_qr/ReserveQR";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/signup" component={AuthSignUp} />
          <Route path="/admin" component={AdminMain} />
          <Route path="/qr" component={ReserveQR} />
          <Route path="/reserve" component={Reserve} />
          <Route path="/reserveComplete" component={ReserveComplete} />
        </Switch>
      </Router>

    <Loading />
    </div>
  );
}

export default App;
