// import { useNavigate } from "react-router-dom";
import { decrypter } from "./crypt_funct";

export async function postData(url = "", body = {}, method = "POST") {
  // Default options are marked with *
  let access = "tkopen";
  let header = {
    "Content-Type": "application/json",
  };

  if (!url.endsWith("login")) {
    header.Authorization = `Bearer ${decrypter(localStorage.getItem(access))}`;
  }

  let data = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: header,
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  };

  const response = await fetch(url, data);

  if (response.status === 401) {
    localStorage.removeItem("tkopen");
    localStorage.clear();
    window.location.href = "/";
    return;
  }
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getData(url = "") {
  // Default options are marked with *
  let access = "tkopen";
  let header = {
    "Content-Type": "application/json",
  };

  if (!url.endsWith("login")) {
    header.Authorization = `Bearer ${decrypter(localStorage.getItem(access))}`;
  }

  let data = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: header,
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };

  const response = await fetch(url, data);

  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/";
    // navigate("/");
    return;
  }
  return response.json(); // parses JSON response into native JavaScript objects
}
