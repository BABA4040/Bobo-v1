const Color = require(`${process.cwd()}/config.json`);
const ms = require("ms");
const Discord = require("discord.js");
module.exports = {
  name: "unbanall",
  aliases: ["unbanall"],
  description: "unbanall members",
  usage: ["unban"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["BAN_MEMBERS"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
    try {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Remove Bans`)
        .setDescription(
          `Please confirm that you wish to revoke all current server bans in this guild.\n\n**Note:** This process may take awhile, and cannot be easily stopped or un-done.\n\n**Do you still wish to continue?**\n✅ - Yes, remove all bans.\n❌ - No, cancel command.`
        )
        .setThumbnail(`${bot.user.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp();
      message.channel.send({ embeds: [embed] }).then((balls) => {
        balls.react("✅").then(() => balls.react("❌"));
        const johncena = (reaction, user) => {
          return (
            ["✅", "❌"].includes(reaction.emoji.name) &&
            user.bot == false &&
            user.id === message.author.id
          );
        };
        balls
          .awaitReactions({filter: johncena, max: 1, time: 120000 })
          .then((collected) => {
            const react23847 = collected.first();
            if (react23847.emoji.name === "✅") {
              message.channel
                .send({
                  content: `Please Wait! We are beginning the process now...`,
                })
          
            
                .catch((e) => {});
              setTimeout(() => {
                message.guild.bans
                  .fetch()
                  .then((bans) => {
                  if(bans.size > 0){
                    message.channel.send({content: ` Unbanned all`})}
                    if (bans.size == 0) {
                      message.channel.send({
                        content: "There are no banned users.",
                      });
                      
                    }
                    bans.forEach((ban) => {
                      message.guild.members.unban(ban.user.id);
                    });
                  })
                  .then(() => console.log("n"))
                  .catch((e) => console.log(e));
              }, 6000);
            }
            if (react23847.emoji.name === "❌") {
              return message.channel
                .send({ content: `Cancelling update bans process...` })
                .catch((e) => {});
            }
          });
      });
    } catch (e) {
      console.log(e);
    }
  },
};
