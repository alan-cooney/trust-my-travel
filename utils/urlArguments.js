import querystring from "querystring";

export default function queryStringBuilder(options) {
  if (options) {
    return "?" + querystring.stringify(options);
  } else {
    return "";
  }
}
