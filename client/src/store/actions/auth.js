import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user,
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export function logout() {
    return (dispatch) => {
        localStorage.clear();
        // setting up empty object instead of user object to logout
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}

export function authUser(type, userData) {
    // since we are making API call ... we need to wait for API call to complete
    // before we dispatch anything .... so we will return a new promise
    return (dispatch) => {
        // wrap out redux-thunk in a promise so we can wait for the API call
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({ token, ...user }) => {
                    // if we get a response .. store jwt token in local storage to complete the auth process
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve(); // indicate API call is done successfully
                })
                .catch((err) => {
                    dispatch(addError(err.message));
                    reject(); // indicate api call failed
                });
        });
    };
}
