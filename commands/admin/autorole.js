
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
  run: async (bot, message, args, dev, data) => {
    
  




const status = args[0];
		if(status !== "on" && status !== "off"){
			return message.channel.send({content:`"Please specify a valid value between **on** and **off**`})
		}
        
		if(status === "on"){

			const role = await Resolvers.resolveRole({
				message,
				search: args.slice(1).join(" ")
			});
			if(!role){
				return message.channel.send({content:`Please specify a valid role!`})
			}

			data.plugins.autorole = {
				enabled: true,
				role: role.id
			};
			data.markModified("plugins.autorole");
			await data.save();

			message.channel.send({content:`Autorole enabled! New members will automatically receive the **${role.namw}** role.,`})
		}

		if(status === "off"){

			if(!data.guild.plugins.autorole.enabled){
				return message.success("administration/autorole:ALREADY_DISABLED", {
					prefix: data.guild.prefix
				});
			}

			data.guild.plugins.autorole = {
				enabled: false,
				role: null
			};
			data.guild.markModified("plugins.autorole");
			await data.guild.save();
            
			message.success("administration/autorole:SUCCESS_DISABLED", {
				prefix: data.guild.prefix
			});

		}
        
  }	}