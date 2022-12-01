/* eslint-disable max-len */
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const {
  AES_DB_KEY,
  AES_DB_IV,
  AES_REQ_RES_IV,
  AES_REQ_RES_KEY,
  DB_ENCRYPTION_ALGORITHM,
  RESPONSE_ENCRYPTION_ALGORITHM,
  DOUBBLE_API_ALGORITHM,
  DOUBBLE_API_KEY,
  DOUBBLE_API_IV,
  KEY_HEX,
  VECTOR_HEX,
} = require("../config");
const binaryToString = require("./binaryToString");

const encryptResponse = async (plain) => {
  try {
    const iv = Buffer.alloc(16, AES_REQ_RES_IV);
    const key = AES_REQ_RES_KEY;

    let cipher = crypto.createCipheriv(RESPONSE_ENCRYPTION_ALGORITHM, key, iv);
    let encrypted = cipher.update(plain);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
  } catch (error) {
    throw error;
  }
};

const encryptionBase64 = (t) =>
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t));

const doubbleAPIEncrypt = (data) => {
  const code = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Utf8.parse(DOUBBLE_API_KEY),
    {
      iv: CryptoJS.enc.Utf8.parse(encryptionBase64(DOUBBLE_API_IV)),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return code.ciphertext.toString(CryptoJS.enc.Base64);
};

const encryptSPay = (arg) => {
  let keyHex = CryptoJS.enc.Utf8.parse(binaryToString(KEY_HEX));
  let vectorHex = CryptoJS.enc.Utf8.parse(
    binaryToString(VECTOR_HEX)
  );

  let encrypted = CryptoJS.TripleDES.encrypt(
    arg.trim(),
    keyHex,
    { iv: vectorHex },
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};

module.exports = {
  encryptResponse,
  doubbleAPIEncrypt,
  encryptSPay
};
