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



const channel = await message.guild.channels.cache.get(guild.plugins.modlogs)

if(channel){

let color = config.embed.Color




if(message.type === "GUILD_TEXT"){

    const embed = new discord.MessageEmbed()
    .setDescription(`:pencil: ***Channel Created***`)
    .addField('Channel', message, true)
    .addField('Channel Name', message.name, true)
    .addField('Channel Type', 'Text Channel', true)
    .setFooter(`Channel ID: ${message.id}`)
    .setTimestamp()
    .setColor(color)
  
   if(message.parent && message.type !== 'category')embed.addField(`Parent Name`, message.parent.name)
   
        if(channel &&
      channel.viewable &&
      channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channel.send({embeds:[embed]}).catch(()=>{})
            cooldown.add(message.guild.id);
            setTimeout(()=>{
cooldown.delete(message.guild.id)
            }, 3000)
      }

} else {

    const embed = new discord.MessageEmbed()
    .setDescription(`🆕 ***Channel Created***`)
    .addField('Channel Name', message.name, true)
    .addField('Channel Type', message.type, true)
    .setFooter(`Channel ID: ${message.id}`)
    .setTimestamp()
    .setColor(color)
     
    if(channel &&
      channel.viewable &&
      channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channel.send({embeds:[embed]}).catch(()=>{})
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