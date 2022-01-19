module.exports = {
  name: "welcome",
  aliases: ["welcome"],
  description: "setwelcome ",
  usage: ["welcome"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_GUILD"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    
    let data = await Guild.findOneAndUpdate({guildID: message.guild.id})
    
    
    if(args[1] === "channel"){
      let channel = await message.mentions.channels.first();
      if(!channel) return message.channel.send({content:`Mention channel please`})
      
      message.guild.channels.fetch(channel).then(ch =>{
        if(!ch) 
    
    
    
    }
    
    
  }
}