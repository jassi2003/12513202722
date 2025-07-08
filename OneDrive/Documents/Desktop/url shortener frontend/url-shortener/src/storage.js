// src/utils/storage.js

const STORAGE_KEY = 'shortenedUrls';

export const saveUrlData = (entry) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  existing.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getAllUrls = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const findByShortcode = (code) => {
  return getAllUrls().find(entry => entry.shortcode === code);
};
