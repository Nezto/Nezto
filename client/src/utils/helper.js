import { API_URL } from "../config.js";


/**
 * @description 
 * This function wraps API call to the server.
 * @param {String} path 
 * @param {String} method
 * @param {Object} data 
 * ```
 * const response = await ApiCall("/orders", "POST", {price: 100})
 * const json = await response.json();
 * console.log(json);
 * ```
 */
export async function ApiCall(path, method="GET", data) {
  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}


export async function FetchApi(path, option={}) {
  return fetch(`${API_URL || "http://localhost:8000"}${path}`, {
    credentials: "include",
    ...option,
  });
}