const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = config.embed.Color;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("xp toggle")
    .setDescription("xptoggle")
   .addSubcommand((subcommand) =>
      subcommand
        .setName("xp)
        .setDescription("to on xp in server")
        .addStringOption((option) =>
          option.setName("xp").setDescription("on or of")
        )
    ),
  memberPermissions: ["SEND_MESSAGES", "MANAGE_GUILD"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  enable: true,
  cooldown: 10000,
  prime: false,
  run: async (bot, message, args, dev) => {

  
  
  },
};
