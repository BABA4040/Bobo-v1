const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const m = "<:Bobocash:897148836567457862>"

module.exports ={

data: new SlashCommandBuilder()
.setName("balance")
.setDescription("show your balance or balance of anyuser")
.addUserOption(option =>
option.setName('target')
.setDescription('target anyuser to show money')),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    const user = await interaction.options.getUser('target')||interaction.user
    const member = await interaction.guild.members.fetch(user.id)
    if (member) {
      let autho = await User.findOne({ userID: member.id });
if(!autho) return interaction.reply({content:`user not have any data`})
      interaction.reply({
        content:`
          🏦 **${member.user.username}**, credits balance is __${autho.money.toLocaleString() ||"0"}__ ${m}`
      });
    }
    if (!member) {
      let author = await User.findOne({ userID: interaction.user.id });
      interaction.reply({
        content: `🏦 **${interaction.user.username}**, Your credits balance is:  __\`${author.money.toLocaleString()||"0"}\`__${m}
      `});
    }}}