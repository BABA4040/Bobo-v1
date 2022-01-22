/*const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');*/
const discord = require("discord.js");
const moment = require('moment');
const cooldown =  new Set();



module.exports = class{

async run(message, channel) {

if(!message || !channel) return;


const guild = await Guild.findOne({ guildID: message.guild.id })


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

if(cooldown.has(message.guild.id)) return;

if (message.name.indexOf('Room') >= 0) return;

if(guild){
if(guild.plugins.modlogs){



const channelEmbed = await message.guild.channels.cache.get(guild.plugins.modlogs)

if(channelEmbed){

let color = config.embed.Color




if(message.type === "GUILD_TEXT","GUILD_VOICE"){

    const embed = new discord.MessageEmbed()
    .setAuthor(message.guild.iconURL() ,message.guild.name)
    .setDescription(`:pencil: ***Channel Created***`)
    .addField("**Channel Name**", message.name)
    .addField("**Channel Type**", message.parent.name)
    .setTimestamp()
    .setFooter({text:message.guild.name})
    .setColor(color)
  
   if(message.parent && message.type !== 'category')embed.addField(`Parent Name`, message.parent.name)
  
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err.name)})
            cooldown.add(message.guild.id);
            setTimeout(()=>{
cooldown.delete(message.guild.id)
            }, 3000)
      }

} else {

    const embed = new discord.MessageEmbed()
    .setDescription(`🆕 ***Channel Create**
**channel name**: ${message.name}
    
**channel type**: ${message.parent.name}
    `)
    .addField("**channel Type**", message.parent.name)
    .setTimestamp()
    .setColor(color)
     
    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err.name)})
                   cooldown.add(message.guild.id);
            setTimeout(()=>{
cooldown.delete(message.guild.id)
            }, 3000)
      }

}

  }


  }
 }
}


  }