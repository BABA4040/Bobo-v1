/*const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');*/
const discord = require("discord.js");
const moment = require('moment');
const cooldown =  new Set();



module.exports = class{

async run(role, message) {

if(!role) return


const guild = await Guild.findOne({ guildID: message.guild.id })


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

if(cooldown.has(message.guild.id)) return;


if(guild){
if(guild.plugins.modlogs){



const channelEmbed = await role.guild.channels.cache.get(guild.plugins.modlogs)

if(channelEmbed){

let color = config.embed.Color




    const embed = new discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL())
    .setAuthor(message.guild.name)
    .setDescription(`:pencil: ***role Created***`)
    .addField("**role Name**", role.name)
  
    .addField("**role Id**",role.id)
    .setTimestamp()
    .setFooter({text:message.guild.name})
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
  if(message.type ==="GUILD_VOICE"){

  
  const embed = new discord.MessageEmbed()
         .setThumbnail(message.guild.

  }


  }
 }
}


}