/**getFetch - Sends a GET fetch request
 * @param url The url to send GET fetch
 */
export const getFetch = async (url) => {
  try {
    const response = await fetch(url, {
      credentials: "include"
    });
    const data = await response.json();
    console.log("Fetch data returned: ", data);
    return data;
  } catch (err) {
    console.log("Fetch error: ", err);
    const e = { success: false, msg: err };
    return e;
  }
};

/**postFetch - Sends a POST fetch request using
 *             application/json.
 * @param url The url to send POST fetch
 * @param body The data to store in body of POST
 */
export const postFetch = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
    const data = await response.json();
    //console.log("Fetch data returned: ", data);
    return data;
  } catch (err) {
    console.log("Fetch error: ", err);
    const e = { success: false, msg: err };
    return e;
  }
};

/**putFetch - Sends a PUT fetch request using
 *             application/json.
 * @param url The url to send PUT fetch
 * @param body The data to store in body of PUT
 */
export const putFetch = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
    const data = await response.json();
    //console.log("Fetch data returned: ", data);
    return data;
  } catch (err) {
    console.log("Fetch error: ", err);
    const e = { success: false, msg: err };
    return e;
  }
};

/**deleteFetch - Sends a DELETE fetch request using
 *             application/json.
 * @param url The url to send DELETE fetch
 * @param body The data to store in body of DELETE
 */
export const deleteFetch = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
    const data = await response.json();
    //console.log("Fetch data returned: ", data);
    return data;
  } catch (err) {
    console.log("Fetch error: ", err);
    const e = { success: false, msg: err };
    return e;
  }
};
