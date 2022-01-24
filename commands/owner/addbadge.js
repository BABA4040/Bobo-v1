module.exports = {
  name: "addbadge",
  aliases: [],
  description: "t",
  usage: [],
  category: ["owner"],
  enabled: true,
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: true,
  cooldown: 6000,
  run: async (bot, message, args, dev,prefix) => {
    
  
let data = await Guild.findOneAndUpdate({guildID: message.guild.id})
let user = await message.mentions.users.first() || await bot.users.cache.get(args[1])
if(!user) return message.channel.send({content:`please mention any one to give badge`})
    
if(user){
  let badges = config.badge
  
  let badge = badges.find(x => x.id=== id)
  
  
  
}}}