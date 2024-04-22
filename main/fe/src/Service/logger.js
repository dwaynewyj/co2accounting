function info(...args) {
  console.log("[LOG]", ...args);
}

function dev(...args) {
  if (process.env.REACT_APP_STAGE === "DEV") {
    console.log("[DEV]", ...args);
  }
}

function error(...args) {
  console.error("[ERROR]", ...args);
}

module.exports = {
  info,
  dev,
  error,
};
