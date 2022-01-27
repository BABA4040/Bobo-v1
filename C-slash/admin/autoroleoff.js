const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("autoroleoff")
.setDescription("disable autorole")
  
.addStringOption(option =>
option.setName('status')
.setDescription(' off')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES","MANAGE_ROLES"],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    let status = await interaction.options.getString('status')
    

				if(status === "off"){
      
			if(!data.guild.plugins.autorole.enabled){
				return interaction.reply({content:`**The autorole is already disabled.**`})
			}

			data.guild.plugins.autorole = {
				enabled: false,
				role: null
			};
			data.guild.markModified("plugins.autorole");
			await data.guild.save();
            
			interaction.reply({content:`
      
      The autorole is already disabled.**

      
      
`})
      
    const channelEmbed = await interaction.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Auto role disabled**`)
    .addField('Moderator Name', interaction.author.toString(), true)
    //.addField('Role Name',role.name, true)
    .setFooter({text:interaction.guild.name})
    .setThumbnail(interaction.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(interaction.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      }}

    
    
  }}

    