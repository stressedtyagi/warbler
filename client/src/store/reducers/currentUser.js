import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    insAuthenticated: false, // true when user logged in
    user: {}, // all the info about the user logged in
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                // will return a boolen telling us if there are any ( 1 or more) keys in action.user
                inAuthenticated: !!Object.keys(action.user).length,
                user: action.user,
            };
        default:
            return state;
    }
};
