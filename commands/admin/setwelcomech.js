module.exports = {
  name: "setwelcomech",
  aliases: ["welcomech","setwelcomech"],
  description: "set welcome channel",
  usage: ["setwelcomech"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    
  let data = await Guild.findOneAndUpdate({guildID: message.guild.id});
  let channel = await message.mentions.channels.first() || message.guild.channels.fetch(args[1]);
    
    if(!channel) return message.channel.send({content:` Mention channel or Put id channel`})
    
  
if(data){
   
data.channels.welcomech = channel.id;
data.save();
}
          channel.permissionOverwrites.create(
          channel.guild.roles.everyone,
          {
            SEND_MESSAGES: false,

            VIEW_CHANNEL: true
          }
        )
    message.channel.send({content:`welcome channel setuped use Botest`})
    
  }}