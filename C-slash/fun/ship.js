const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const progressbar = require("percentagebar");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ship")
    .setDescription("ship is a ship")
    .addUserOption((option) =>
      option.setName("target_ship").setDescription("target user to ship")
    ),
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  enabled: true,
  category: ["general"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
    try {
      const user1 =
        (await interaction.options.getUser("target_ship")) || interaction.user;
      let author = interaction.user;
      const ship = Math.floor(Math.random() * 100) + 1;
      const bar = progressbar(100, ship, 10);
      const mehh = new Discord.MessageEmbed() // Prettier

        .setThumbnail(
          "https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1"
        )
        .setDescription(
          `I shipped ${author} with **${user1}** and it is **${ship}%**\n${bar}`
        )

        .setColor(config.embed.Color);
      const love = new Discord.MessageEmbed() // Prettier

        .setThumbnail(
          "https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1"
        )
        .setDescription(
          `I shipped ${author} with **${user1}**  and it is **${ship}%**\n${bar}`
        )

        .setColor("GREEN");
      if (ship > 50) {
        interaction.reply({ embeds: [love] });
      } else {
        interaction.reply({ embeds: [mehh] });
      }
    } catch (err) {
      interaction.editReply({ content: `Something went wrong...` });
    }
  },
};
