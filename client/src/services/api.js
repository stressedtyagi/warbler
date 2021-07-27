import axios from "axios";

export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

/**
 * A wapper around axios API call that formats errors, etc.
 * @param {string} method the HTTP verb we want to use
 * @param {string} path the route path / endpoint
 * @param {object} data (optional) not in all routes, mainly data from forms for POST requests
 */

export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method.toLocaleLowerCase()](path, data)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((err) => {
                return reject(err.response.data.error);
            });
    });
}
