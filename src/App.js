import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store/index";
import SignupFormPage from "./components/SignUpFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route path="/signup" component={SignupFormPage} />
        <Route path="/login" component={LoginFormPage} />
      </Switch>
    </Provider>
  );
}

export default App;
