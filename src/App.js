import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store/index";
import SignupPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import Navbar from "./components/presentationals/Navbar";
import Homepage from "./components/pages/Homepage";
import ProfilePage from "./components/pages/ProfilePage"
import AllAlarmsPage from "./components/pages/AllAlarmsPage"
import PlantDetailsPage from "./components/pages/PlantDetailsPage"
import AllNotesPage from "./components/pages/AllNotesPage"

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage}/>
        <Route path="/plants/:plantId" component={PlantDetailsPage}/>
        <Route path="/alarms" component={AllAlarmsPage}/>
        <Route path="/notes" component={AllNotesPage}/>
      </Switch>
    </Provider>
  );
}

export default App;
