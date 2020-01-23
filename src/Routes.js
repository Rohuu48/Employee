import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashBoard from "./components/Admin/AdminDashBoard";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/user/dashboard" component={Dashboard} />
        <Route path="/admin/dashboard" component={AdminDashBoard} />
      </Switch>
    </Router>
  );
}
