const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("balance")
.setDescription("show your balance or balance of anyuser")
.addStringOption(option =>
option.setName('target')
.setDescription('tag')
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

    
    if (member) {
      let autho = await User.findOne({ userID: member.id });
if(!autho) return interaction.reply({content:`user not have any data`})
      interaction.reply({
        content:`
          🏦 **${member.username}**, credits balance is __${autho.money.toLocaleString() ||"0"}__ ${m}`
      });
    }
    if (!member) {
      let author = await User.findOne({ userID: interaction.user.id });
      interaction.reply({
        content: `🏦 **${message.author.username}**, Your credits balance is:  __\`${author.money.toLocaleString()||"0"}\`__${m}
      `});
    }}}