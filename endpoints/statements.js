const urlArguments = require("../utils/urlArguments");

module.exports.getStatement = async function getStatement(axios, statement_id) {
  try {
    const res = await axios.get(`statements/${statement_id}`);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};

module.exports.listStatements = async function listStatements(axios, options) {
  try {
    const queryString = urlArguments(options);
    const res = await axios.get(`statements${queryString}`);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};
