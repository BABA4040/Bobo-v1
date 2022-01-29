const Discord = require("discord.js")
const { Color } = require("../../config.js")

module.exports = {
  name: "invite",
  aliases: ["invites","inv","invite"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 3000,
  run: async (bot, message, args, dev) => {
    let embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("**Bobo Bot**  InviteLink!")
      .setURL(
        `${config.invite}`
)
     
      
      message.channel.send({embeds:[embed]}).catch(err=>{
      message.author.send({embeds:[embed]})
      })
  }
}
