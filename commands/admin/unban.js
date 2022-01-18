module.exports = {
  name: "unban",
  aliases: ["unban"],
  description: "unban user by id",
  usage: ["unban userId"],
  category: ["admin"],
  enabled: true,            
  memberPermissions: [ "BAN_MEMBERS" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","BAN_MEMBERS" ],        
  ownerOnly: false,            
  cooldown: 10000,
  run: async (bot, message, dev, data,args,[ user = '' ]) => {
    if (!user.match(/\d{17,19}/)){
      return message.channel.send({content:`${message.author}, Please provide the ID of the user to unban`});
    };

    user = user.match(/\d{17,19}/)[0];

    return message.guild.members.unban(user, { reason: `Mai Unbans: ${message.author.tag}: ${args.join(' ') || 'None'}`})
    .then(user => message.channel.send({content:`\\✔️ Successfully unbanned **${user.tag}**!`}))
    .catch(() => message.channel.send({content:`\\❌ Unable to unban user with ID ${user}. The provided argument maybe not a valid user id, or the user is not banned.`}));}}