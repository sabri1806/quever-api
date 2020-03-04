// Import all env vars from .env file
require("dotenv").config();
export const MAIL_USER_ADDRESS = process.env.MAIL_USER_ADDRESS;
export const MAIL_USER_PASS = process.env.MAIL_USER_PASS;
console.log(MAIL_USER_ADDRESS); // => Hello
console.log(MAIL_USER_PASS); // => Hello
