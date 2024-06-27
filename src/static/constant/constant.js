import { parser } from "./crypt_funct";

let navMenu = [
  { name: "Dashboard", link: "/" },
  { name: "Top Up Request", link: "/topup" },
  { name: "All Widthdrawal", link: "/widthdraw" },
  { name: "Settings", link: "/settings" },
  { name: "Logout", link: "/logout" },
];

let doc = (formName) => {
  return document.querySelector(formName);
};

let saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
let removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
let getLocalStorage = (key) => {
  return parser(localStorage.getItem(key));
};

let hideShow = () => {
  console.log(doc("#navbar").classList);
  if (doc("#navbar").classList.contains("hide")) {
    doc("#navbar").classList.remove("hide");
    doc("#navbar").classList.add("show");
    console.log(doc("#navbar").classList);
    return;
  }
  doc("#navbar").classList.remove("show");
  doc("#navbar").classList.add("hide");
  console.log(doc("#navbar").classList);
};
export {
  navMenu,
  doc,
  removeLocalStorage,
  saveToLocalStorage,
  getLocalStorage,
  hideShow,
};
