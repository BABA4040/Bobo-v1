
		const Resolvers = require("../../helpers/resolvers.js")
module.exports = {
  name: "autorole",
  aliases: ["autorole"],
  description: "set autorole for new member when join it",
  usage: ["autorole"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_ROLES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_ROLES"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev,prefix) => {
    
  
let data = await Guild.findOneAndUpdate({guildID: message.guild.id})



const status = args[1];
		if(status !== "on" && status !== "off"){
			return message.channel.send({content:`Please specify a valid value between **on** and **off**`})
		}
        
		if(status === "on"){
/*
			const role = await Resolvers.resolveRole({
			message,
				search: args.slice(1).join(" ")
			});*/
      let role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
			if(!role){
				return message.channel.send({content:`Please specify a valid role!`})
			}

			data.plugins.autorole = {
				enabled: true,
				role: role.id
			};
			data.markModified("plugins.autorole");
			await data.save();

			message.channel.send({content:`Autorole enabled! New members will automatically receive the **${role.name}** role.`})
		}

		if(status === "off"){

			if(!data.plugins.autorole.enabled){
				return message.channel.send({content:`**The autorole is already disabled.**\n\n:arrow_right_hook: *Send ${prefix}autorole on @YourRole to enable it again!*`})
			}

			data.plugins.autorole = {
				enabled: false,
				role: null
			};
			data.markModified("plugins.autorole");
			await data.save();
            
			message.channel.send({content:`
      
      The autorole is already disabled.**\n\n:arrow_right_hook: *Send ${prefix}autorole on @YourRol to enable it again!*

      
      
`})

		}
        
  }	}