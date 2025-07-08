// src/utils/validators.js

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidShortcode = (code) => {
  return /^[a-zA-Z0-9]{3,10}$/.test(code); // 3 to 10 alphanumeric
};

export const isPositiveInteger = (val) => {
  return /^\d+$/.test(val) && parseInt(val) > 0;
};
