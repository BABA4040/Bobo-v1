const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("give")
.setDescription("transfer balance to your friends")
.addUserOption(option =>
option.setName('')
.setDescription('')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    let author = await User.findOne({ userID: message.author.id });
    let loc = await User.findOne({ userID: member.id }) || new User({userID: member.id})

    if (!money)
      return message.channel.send({ content: `❎ Please type credit!` });
    if (money < 1)
      return message.channel.send({ content: `❎ You can't send 0 credit!` });
/*
    if (!loc) {
      User.create({
        userID: member.id,
        money: 1000,
        name: member.name,
      });
    }*/
    let sender = author.money - args[1];

    if (author.money < Number(args[1]))
      return message.channel.send({
        content: `❎ You don't have this amount credit!`,
      });
    if (author.userID == member.id)
      return message.channel.send({
        content: `❎ You can't send credit to yourself!`,
      });
    if (member.bot)
      return message.channel.send({
        content: `❎ You can send credit to the client`,
      });
    await User.updateOne(
      {
        userID: message.author.id
      },
      {
        $set: {
          money: sender,
        },
      }
    );
    await User.updateOne(
      {
        userID:member.id
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
      content: `🏧 | Transfer Receipt \`You have received __\`$${args[1]}\`__ From user ${message.author.username} (ID: ${message.author.id})\``,
    });
    message.channel.send({
      content: `**${message.author.username}** send credit to **${
        member.username
      }** amount: __\`$${args[1].toLocaleString()}\`__ ${m}`,
    });
  }}