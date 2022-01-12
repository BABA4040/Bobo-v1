const Discord = require("discord.js")

const SlayBotDB = require('../../data/news.js');

const { Color } = require("../../config.js")
module.exports = {
  name: "setnews",
  aliases: ["setnews"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],		
  ownerOnly: true,			
  cooldown: 5000,
  run: async (bot, message, dev,prefix) => {
    
    const [name, ...args] = message.content.slice(prefix.length)
      .split(/ +/)
      .filter(Boolean);

    
let news = args.join(' ')
    if(!SlayBotDB.news) return  await SlayBotDB.create({ news: news, tag: '768944616724103170', time: new Date() }) + await SlayBotDB.updateOne({ news: news, tag: '710465231779790849', time: new Date()}) +  message.channel.send(' Updated News!')
    await SlayBotDB.updateOne({ news: news, tag: 'u', time: new Date() })
    message.channel.send({content:' Updated News!'})
  }
}
