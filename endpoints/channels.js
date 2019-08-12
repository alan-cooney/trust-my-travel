const urlArguments = require("../utils/urlArguments");

module.exports.createChannel = async function createChannel(
  axios,
  { name, currencies }
) {
  try {
    const res = await axios.post("channels", {
      name,
      currencies
    });
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports.updateChannel = async function updateChannel(
  axios,
  channel_id,
  { name, currencies }
) {
  try {
    const res = await axios.put(`channels/${channel_id}`, {
      name,
      currencies
    });
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports.listChannels = async function listChannels(axios, options) {
  try {
    const queryString = urlArguments(options);
    const res = await axios.get(`channels${queryString}`);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports.getChannel = async function getChannel(axios, channel_id) {
  try {
    const res = await axios.get(`channels/${channel_id}`);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports.deleteChannel = async function deleteChannel(axios, channel_id) {
  try {
    const res = await axios.delete(`channels/${channel_id}`);
    return res.data.deleted;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};
