var CryptoJS = require("crypto-js");
const { CRYT_SECRET_KEY } = require("./env_file");
let json_parser = (json) => JSON.parse(JSON.stringify(json));
let stringify = (data) => JSON.stringify(data);
let parser = (data) => JSON.parse(data);

function crypter(text) {
  // Encrypt
  // console.log("ciphertext", text);
  // console.log("CRYT_SECRET_KEY", CRYT_SECRET_KEY);
  var ciphertext = CryptoJS.AES.encrypt(text, CRYT_SECRET_KEY).toString();
  return ciphertext;
}

function decrypter(ciphertext) {
  // Decrypt
  //   console.log("ciphertext", ciphertext);
  var bytes = CryptoJS.AES.decrypt(ciphertext, CRYT_SECRET_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return json_parser(originalText);
}

export { crypter, decrypter, json_parser, stringify, parser };
