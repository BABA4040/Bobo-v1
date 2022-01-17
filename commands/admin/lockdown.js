module.exports = {
  name: "lockdown",
  aliases: ["lockdown","lockall"],
  description: ["lockall channel"],
  usage: ["Bolock"],
  category: ["admin"],
  enabled: true,            
  memberPermissions: [ "ADMINISTRATOR","MANAGE_CHANNELS" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],        
  ownerOnly: false,            
  cooldown: 10000,
  run: async (bot, message, args, dev, data) => {

message.channel.permissionOverwritesedit([
    {
      id: message.guild.roles.everyone.id,
      deny: [ 'SEND_MESSAGES' ].slice(Number(
        !message.channel.permissionsFor(message.guild.roles.everyone)
        .has('SEND_MESSAGES'))),
      allow: [ 'SEND_MESSAGES' ].slice(Number(
        message.channel.permissionsFor(message.guild.roles.everyone)
        .has('SEND_MESSAGES')))
    },
    {
      id: message.guild.me.id,
      allow: [ 'SEND_MESSAGES' ]
    }
  ], `Mai Lockdown Command: ${message.author.tag}`)
  .then((ch) => message.channel.send({content:
    ch.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
    ? '\\✔️ Lockdown Ended! Everyone can now send messages on this channel'
    : '\\✔️ Lockdown has initiated! Users withour special permissions will not be able to send messages here!'
                                     })).catch(() => message.channel.send({content:
    message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
    ? '\\❌ Unable to Lockdown this channel!'
    : '\\❌ Unable to restore this channel!'
                                                                          }))}}