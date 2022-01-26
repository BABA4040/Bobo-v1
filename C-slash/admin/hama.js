const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = config.embed.Color;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("setprefix")


   .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("setprefix in guild")
        .addUserOption((option) =>
          option.setName("input").setDescription("The user")
        )
    ),
  memberPermissions: ["SEND_MESSAGES", "MANAGE_GUILD", "ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  enable: true,
  cooldown: 10000,
  prime: false,
  run: async (bot, message, args, dev) => {},
};
