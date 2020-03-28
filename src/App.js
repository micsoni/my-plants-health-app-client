import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store/index";
import SignupFormPage from "./components/SignUpFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ProfilePage from "./components/ProfilePage"
import UserAllPlantsPage from "./components/UserAllPlantsPage"
function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignupFormPage} />
        <Route path="/login" component={LoginFormPage} />
        <Route path="/profile" component={ProfilePage}/>
        <Route path="/plants" component={UserAllPlantsPage}/>
      </Switch>
    </Provider>
  );
}

export default App;
