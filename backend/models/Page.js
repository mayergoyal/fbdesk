const mongoose = require("mongoose");
const pageSchema = new mongoose.Schema({
  userId: String,
  pageId: String,
  pageName: String,
  accessToken: String,
});
module.exports = mongoose.model("Page", pageSchema);
