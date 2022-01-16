const Discord = require("discord.js");
module.exports = class{
  async run(bot, message,guild){
    
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Some title')
    .addField(`I joined a new guild`)
    .addField(`hi ${message.guild.memberCount}`)
    .addField(`hi<@${message.guild.ownerId}>`)
    log.send({embeds: [embed]});
    
  }}