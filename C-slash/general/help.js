const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("help")
.setDescription("show you cmds"),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`a game bot for spending time and enjoying[ Invite ](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=260383435985&scope=bot%20applications.commands) - [ Support ](https://discord.gg/rjhPpahNNR)`)
      .addField ("Admin || ⚠️","`prefix`, `xp`")
      .addField("General || 🌎","`news`, `about`,  `invite`, `serverinfo`, `userinfo`, `ping`, `bots`,`redeem`")  
      .addField("Economy || 💶","`daily`, `balance`, `give`, `birthday`")
      .addField("Game ||  🎮"," `coinflip`, `slots`")
      .addField("Shop || 🛍️","`buy`, `shop`, `use`, `unequip`, `inventory`")
      .addField("Fun || 🥳","`slap`, `hug`, `ship`, `kiss`, `marry`")
      .addField("Ranking || 🧧"," `profile`, `rank`, `setinfo`, `setbackground`, `tip`, `setcolor`")
 interaction.reply({embeds:[embed]});
  

  }}

    
    