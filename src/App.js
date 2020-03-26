import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store/index";
import SignupFormContainer from "./components/SignUpFormContainer";
function App() {
  return (
    <Provider store={store}>
      <p>hello</p>
      <Switch>
        <Route path="/signup" component={SignupFormContainer} />
      </Switch>
    </Provider>
  );
}

export default App;
