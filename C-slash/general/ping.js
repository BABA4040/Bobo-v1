const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js");
module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("speed bot"),
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  enabled: true,
  category: ["general"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
    let date = Date.now();
    let ping_db = await new Promise((r, j) => {
      require("mongoose")
        .connection.db.admin()
        .ping((err, result) =>
          err || !result ? j(err || result) : r(Date.now() - date)
        );
    });

    date = Date.now();

    let pong = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Pong?");

    return interaction.reply({ embeds: [pong] }).then(() => {
      let embed = new Discord.MessageEmbed()
        .setDescription(
          `🏓 Bot: ${bot.ws.ping}ms \n📡 Discord API: ${
            Date.now() - date
          }ms \n🗃️ DB: ${ping_db}ms`
        )
        .setColor("RED");

      return interaction.editReply({ embeds: [embed] });
    });
  },
};
