const querystring = require("querystring");

module.exports = function queryStringBuilder(options) {
  if (options) {
    return "?" + querystring.stringify(options);
  } else {
    return "";
  }
};
