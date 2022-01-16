const Discord = require("discord.js");
module.exports = class{
  async run(bot, message,guild){
    
    const embed = new Discord.MessageEmbed()
    .addField(`I joined a new guild`)
    .addField(guild.memberCount)
    .addFiled(guild.owner)
    log.send({embeds: [embed]});
    
  }}