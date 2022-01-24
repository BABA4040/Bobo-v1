const profile = require(`${process.cwd()}/data/user`);
const badges = require(`${process.cwd()}/struct/badge`);
const text = require(`${process.cwd()}/util/string`);
const Discord = require("discord.js");
const { Color } = require("../../config.js");
module.exports = {
  name: "usebadge",
  aliases: ["use badge"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 5000,
  run: async (bot, message, args, dev, id) => {
    let doc = await User.findOne({ userID: message.author.id });
    if (!doc) {
      doc = new User({ userID: message.author.id });
    }

    const item = doc.data.badgeinv.find(x => x.id == args[1]);

    if (!item) {
      return message.channel.send({
        content: `❎ **${message.author.tag}**, you do not have this item in your inventory!`
      });
    }

    const metadata = badges.find(x => x.id === item.id);

    if (!metadata) {
      return message.channel.send({
        content: `❎ **${message.author.tag}**, this item can no longer be used!`
      });
    }

    doc.badge[metadata.type] = metadata.link;

    return doc
      .save()
      .then(() =>
        message.channel.send({
          content: `✅ **${message.author.tag}**, successfully used **${metadata.name}!**`
        })
      )
      .catch(() =>
        message.channel.send({
          content: `\`❎ [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`
        })
      );
  }
};
