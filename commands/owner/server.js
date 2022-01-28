const fs = require("fs");
const { Color } = require("../../config.js");
const Discord = require("discord.js");
const ownerid = "768944616724103170";

module.exports = {
  name: "slt",
  enabled: true,
  memberPermissions: [ "SEND_MESSAGES" ],
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
  ownerOnly: true,
  cooldown: 0,
  run: async (bot, message, args) => {
    if (message.author.id == ownerid) {
      /*if (!message.guild.me.hasPermission("SEND_MESSAGES"))
        return message.channel
          .send({content:"I Dont Have Permissions"})
          .then(msg => msg.delete({ timeout: 5000 }));
*/
      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description = bot.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id} - server owner <@${r.ownerId}>`)
          .slice(0, 10)
          .join("\n");

      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Page - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
        .setDescription(description);

      let msg = await message.channel.send({embeds: [embed]});

      await msg.react("⬅️");
      await msg.react("➡️");
      await msg.react("🚫");

      let collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      );

      collector.on("collect", async (reaction, user) => {
        if (reaction._emoji.name === "⬅️") {
          // Updates variables
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;

          // if there is no guild to display, delete the message
          if (i0 + 1 < 0) {
            console.log(i0)
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Total Servers - ${bot.guilds.cache.size}\n\n` +
            bot.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}\nServer Owner - <@${r.ownerId}>`
              )
              .slice(i0, i1)
              .join("\n");

          // Update the embed with new informations
          embed
            .setTitle(
              `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          // Edit the message
          msg.edit({embeds: [embed]});
        }

        if (reaction._emoji.name === "➡️") {
          // Updates variables
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

          // if there is no guild to display, delete the message
          if (i1 > bot.guilds.cache.size + 10) {
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Total Servers - ${bot.guilds.cache.size}\n\n` +
            bot.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}\n Server Owner - <@${r.ownerId}>`
              )
              .slice(i0, i1)
              .join("\n");

          // Update the embed with new informations
          embed
            .setTitle(
              `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          // Edit the message
          msg.edit({embeds: [embed]});
        }

        if (reaction._emoji.name === "🚫") {
          return msg.delete();
        }

        // Remove the reaction when the user react to the message
        await reaction.users.remove(message.author.id);
      });
    } else {
      return;
    }
  }
};
