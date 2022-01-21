const Discord = require('discord.js')
const { Color } = require("../../config.js");
const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: "ban",
    aliases: ["band","ban"],
    description: "You can ban a member, or multiple members using this command",
    usage: ["ban [@User]"],
    category: ["admin"],
    enabled: true,
    memberPermissions: ["BAN_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (bot, message, args, dev) => {
  let data = await Guild.findOneAndUpdate({guildID: message.guild.id})
     let user = await message.mentions.members.first() || await message.guild.members.fetch(args[1])
     let admin = message.author;
     // if(!user) return message.channel.send({content:` Mention someone or put id`})
      let reason = args.slice(1).join(" ");
      const member = await message.guild.members.fetch(user.id).catch(() => {});
if(user){
      /*if(member.id === admin.id){
        return message.channel.send({content:` you can't ban yourself`})
        
      }
      if(user.id === bot.user.id) {
        
        return message.channel.send({content:`🙂 |You want ban me why....!`})
        
      }*/
  
    const memberPosition = member.roles.highest.position;
			const moderationPosition = message.member.roles.highest.position;
			if(message.member.ownerId !== message.author.id && !(moderationPosition > memberPosition)){
				return message.channel.send({content:`You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `})
			}
			if(!member.bannable) {
				return message.channel.send({content:`An error has occurred... Please check that I have the permission to ban this specific member and try again!`})
			}
		}
      
      await user.send(`**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return user.ban({ reason: `Ban Command: ${message.author.tag}: ${reason || 'Unspecified'}`})
    .then(_member => message.channel.send(`Successfully banned **${_member.user.tag}**`))
    .catch((err) => message.channel.send(`Failed to ban **${user.user.tag} : reason: Your role not high than this member or ${err.name}**!`));

    

  
      if(data.plugins.modlogs){
				const channel = message.guild.channels.cache.get(data.plugins.modlogs);
				if(!channel) return;
				const embed = new Discord.MessageEmbed()
					.setAuthor(`BAN CASE`)
					.addField("User Banned", `\`${user.tag}\` (${user.toString()})`, true)
					.addField("moderator", `\`${message.author.tag}\` (${message.author.toString()})`, true)
					.addField("reason", reason, true)
					.setColor("#e02316");
				channel.send({ embeds: [embed] }).catch((err) => {
			console.log(err);
			return message.channel.send({content`an error according in 
		});
			}

    
    
    }
}
