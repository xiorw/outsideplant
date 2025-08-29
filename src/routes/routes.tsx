import { Router, Route } from "@solidjs/router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forgot from "../pages/Forgot";
import Dashboard from "../pages/Dashboard";
import FOT from "../pages/FOT";
import IP from "../pages/IP";
import PBR from "../pages/PBR";
import SCS from "../pages/SCS";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";

import { Component } from "solid-js"

const AppRoutes: Component = () => {
  return (
    <Router>
      <Route path="/" component={() => <App><Login /></App>} />
      <Route path="/register" component={() => <App><Register /></App>} />
      <Route path="/forgot-password" component={() => <App><Forgot /></App>} />
      <Route path="/dashboard" component={() => <App><Dashboard /></App>} />
      <Route path="/field-operations-tracking" component={() => <App><FOT /></App>} />
      <Route path="/photo-based-reporting" component={() => <App><PBR /></App>} />
      <Route path="/integrated-payments" component={() => <App><IP /></App>} />
      <Route path="/smart-cluster-security" component={() => <App><SCS /></App>} />
      <Route path="/profile" component={() => <App><Profile /></App>} />
      <Route path="/edit-profile" component={() => <App><EditProfile /></App>} />
      <Route path="/change-password" component={() => <App><ChangePassword /></App>} />
    </Router>
  );
};

export default AppRoutes;