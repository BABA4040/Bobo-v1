module.exports = async (bot) =>{
  const config= require("../../config.json")
  global.mongoose = require("mongoose");
mongoose
  .connect(config.mongoURL
    ,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to the Mongodb database.");
  })
  .catch(err => {
    console.log("Unable to connect to the Mongodb database. Error:" + err);
  });

global.Guild = require("../data/guild.js");
global.User = require("../data/user.js");
global.Owner = require("../data/owner.js");
global.Prime = require("../data/prime.js");
global.Lang = require("../data/lang.js");
global.Black = require("../data/blacklist");
}