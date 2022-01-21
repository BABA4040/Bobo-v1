


const { Discord, Client } = require("discord.js");
const bot = new Client({
  intents: [
    "GUILDS",
  "GUILD_MEMBERS",
   "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    

  ],
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true
  },
  partials: ["CHANNEL", "MESSAGE", "REACTION", "USER"]
});
///const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD] });
global.config = require("./config.json")
const { Util } = require("discord.js");
const fs = require("fs");
const prefix = config.prefix
const { Collection, MessageEmbed } = require("discord.js");
const beautify = require("js-beautify");
const { inspect } = require("util");
let dev = [""];
const cmd = require("node-cmd");
const { I18n } = require("locale-parser");
bot.reva = new I18n({ defaultLocale: "en" });


global.mongoose = require("mongoose");

mongoose
  .connect(config.mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to the Mongodb database.");
  })
  .catch(err => {
    console.log("Unable to connect to the Mongodb database. Error:" + err);
  });
global.Log = bot.channels.cache.get(config.channels.logChannel);
global.Debug = bot.channels.cache.get(config.channels.debug);
global.Guild = require("./data/guild.js");
global.User = require("./data/user.js");
global.Owner = require("./data/owner.js");
global.Prime = require("./data/prime.js");
global.Lang = require("./data/lang.js");
global.Black = require("./data/blacklist");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.catagories = fs.readdirSync("./commands/");
["command","event"].forEach(handler => {
  require(`./handler/${handler}`)(bot);
});

bot.login(config.token)

