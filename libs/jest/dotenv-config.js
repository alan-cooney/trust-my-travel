const dotenv = require("dotenv");
const path = require("path");

const dotevnPath = path.join(__dirname, "../../.env");
dotenv.config({ path: dotevnPath });
