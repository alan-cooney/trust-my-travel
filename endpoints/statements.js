import urlArguments from "../utils/urlArguments";

export async function getStatement(axios, statement_id) {
  try {
    const res = await axios.get(`statements/${statement_id}`);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function listStatements(axios, options) {
  try {
    const queryString = urlArguments(options);
    const res = await axios.get(`statements${queryString}`);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
}
