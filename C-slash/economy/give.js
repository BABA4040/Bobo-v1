const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const m = "<:Bobocash:897148836567457862>";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("give")
    .setDescription("transfer balance to your friends")
    .addUserOption((option) =>
      option
        .setName("user_target")
        .setDescription("tarfet user to transfer")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("amount to transfer")
        .setRequired(true)
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
    const member = await interaction.options.getUser("user_target");
    const money = await interaction.options.getNumber("amount");
    let author = await User.findOne({ userID: interaction.user.id });
    let loc =
      (await User.findOne({ userID: member.id })) ||
      new User({ userID: member.id });

    if (money < 1) {
      return interaction.reply({ content: `❎ You can't send 0 credit!` });
    }
    /*
    if (!loc) {
      User.create({
        userID: member.id,
        money: 1000,
        name: member.name,
      });
    }*/
    let sender = author.money - money;

    if (author.money < money) {
      return interaction.reply({
        content: `❎ You don't have this amount credit!`,
      });
    }
    if (author.userID == member.id) {
      return interaction.reply({
        content: `❎ You can't send credit to yourself!`,
      });
    }
    if (member.bot) {
      return interaction.reply({
        content: `❎ You can send credit to the client`,
      });
    }
    await User.updateOne(
      {
        userID: interaction.user.id,
      },
      {
        $set: {
          money: sender,
        },
      }
    );
    await User.updateOne(
      {
        userID: member.id,
      },
      {
        $inc: {
          money: money,
        },
      }
    );

    /* author.money -= Math.floor(parseInt(args[1]));
    loc.money += Math.floor(parseInt(args[1]));
    author.save();
    loc.save()*/

    member.send({
      content: `🏧 | Transfer Receipt \`You have received __\`$${money}\`__ From user ${interaction.user.username} (ID: ${interaction.user.id})\``,
    });
    interaction.reply({
      content: `**${interaction.user.username}** send credit to **${
        member.username
      }** amount: __\`$${money.toLocaleString()}\`__ ${m}`,
    });
  },
};
