const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("💸get your daily all 24 hours"),
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  enabled: true,
  category: ["general"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
    let cooldown = 0; //43200000;
    //  let data = await User.findOne({ userID: message.author.id });
    if (
      data.user.time !== null &&
      cooldown - (Date.now() - data.user.time) > 0
    ) {
      return interaction.reply({
        content: ` You need wait ${ms(
          cooldown - (Date.now() - data.time)
        )} to daily again`,
      });
    }
    let DR = Math.floor(Math.random() * 2000) + 1000;

    interaction.reply({
      content: `**${interaction.user.username}** you get 💰$\`${DR}\` credits`,
    });
    /*
      data.time = Date.now();
      data.name = message.author.username
    data.money += parseInt(DR);*/

    await User.updateOne(
      {
        userID: interaction.user.id,
      },

      {
        $set: {
          time: Date.now(),
        },
      }
    );
    await User.updateOne(
      {
        userID: interaction.user.id,
      },
      {
        $inc: {
          money: DR,
        },
      }
    );
  },
};
