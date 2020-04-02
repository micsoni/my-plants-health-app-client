import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducer, { cookiePath } from "./rootReducer";
import reduxCookiesMiddleware from "redux-cookies-middleware";

const options = {
  setCookie(name, value) {
    let expires = "";
    const date = new Date();
    date.setHours(date.getHours() + 2);
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxCookiesMiddleware(cookiePath, options), ReduxThunk)
);

const store = createStore(reducer, enhancer);

export default store;
