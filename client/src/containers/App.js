import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();

// if the server goes down we will still have a state from where we can repopulate the token in frontend
if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    // we use try catch because
    // we want to prevent someone to manually alter the key of jwtToken in localstorage
    try {
        // only decode the middle part of jwt token using package jwtdecode
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (e) {
        store.setCurrentUser({});
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="onboarding">
                <Navbar />
                <Main />
            </div>
        </Router>
    </Provider>
);

export default App;
