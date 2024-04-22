module.exports = {
  MAX_LIST: 20,
  TOP_LIST: 3,
  URL_MAIN_IMAGE:
    "https://drive.google.com/file/d/1LK2zGi3B6pD73AWhh-Uvm0BqvlYwwMSV/view?usp=sharing",
  JWT_REFRESH_EXPIRY: "20m",
  JWT_ACCESS_EXPIRY: "2m",
  _PRODUCTION: process.env.NODE_ENV === "PRODUCTION",
};
