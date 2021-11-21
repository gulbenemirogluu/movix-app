import React from "react";
import Signup from "./screens/Auth/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./screens/Auth/Login";
import PrivateRoute from "./utils/PrivateRoute";
import ForgotPassword from "./screens/Auth/ForgotPassword";
import UpdateProfile from "./screens/UpdateProfile";
import { NavbarMenu } from "./components/Navbar/Navbar";
import { HomeScreen } from "./screens/HomeScreen/Home";
import { MovieScreen } from "./screens/Movies/Movies";
import { MovieDetailsScreen } from "./screens/MovieDetailsScreen/MovieDetails";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <NavbarMenu />
          <Switch>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/movies/:id" component={MovieScreen} />
            <Route path="/movie/:id" component={MovieDetailsScreen} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
