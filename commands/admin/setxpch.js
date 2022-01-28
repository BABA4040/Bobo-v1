const guilds = require(`${process.cwd()}/data/guild`);

module.exports = {
  name: "setxpch",
  aliases: ["setxpmessage","xpmessage","setchannelxp","setxpch"],
  enabled: true,			    
  memberPermissions: [ "MANNAGE_GUILD" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 8000,
  run: async (bot, message, args, dev, channel,data) => {
  
  
   if (!data.guild){
      data.guild = new Guild({guildID: message.guild.id });
    };

    const channelID = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])/// (channel.match(/\d{17,19}/)||[])[0];
  ///  channel = message.guild.channels.cache.get(channelID);
/*
    if (channelID.type !== 'GUILD_TEXT'){
      return message.channel.send({content:`\\❌ **${message.member.displayName}**, please provide a valid channel ID or channel mention.`});
    } else if (!.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
      return message.channel.send({content:`\\❌ **${message.member.displayName}**, I need you to give me permission to send messages on ${channel} and try again.`});
    }else if (!channel.permissionsFor(message.guild.me).has('EMBED_LINKS')){
      return message.channel.send({content:`\\❌ **${message.member.displayName}**, I need you to give me permission to embed links on ${channel} and try again.`});
    };*/
    if(!channelID){
      
      
      return message.reply({content:`I can't find this channel check my permission or try again`})
    }
    /*
   let h = bot.channels.cache.get(channelID)
   if(!h){
     return message.reply({content:` I think Your channel not created yet`})
   }
*/
    data.guild.channels.xp = channelID.id;
    return data.guild.save()
    .then(() => {
      return message.channel.send({content:`✔️ Successfully set the suggest channel to ${channelID}!`});
    })
    .catch(() => message.channel.send({content:`\`❌ [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`}))
  }}