
const Discord = require("discord.js"),
      Resolvers = require("../../helpers/resolvers");



module.exports = {
  name: "goodbye",
  aliases: ["goodbye"],
  description: "set goodbye channel and message",
  usage: ["goodbye"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_GUILD"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev,prefix) => {
    let data = await Guild.findOneAndUpdate({guildID: message.guild.id});
    	/*if (
			args[0] === "test" &&
            data.plugins.goodbye.enabled
		) {
		bot.emit("guildMemberRemove", message.member);
			return message.success("administration/goodbye:TEST_SUCCESS");
		}
*/
		if (
			(!args[0] || !["edit", "off"].includes(args[1])) &&
            data.plugins.goodbye.enabled
		)
			return message.channel.send({content:` missing args`})

		if (args[0] === "off") {
			data.guild.plugins.goodbye = {
				enabled: false,
				message: null,
				channelID: null,
				withImage: null
			};
			data.guild.markModified("plugins.goodbye");
			data.guild.save();
			return message.channel.send({content:`Goodbye system is disabled`})
		} else {
			const goodbye = {
				enabled: true,
				channel: null,
				message: null,
				withImage: null,
			};

			message.channel.send({content:`In which channel will goodbye messages be sent?**\n\n:arrow_right_hook: *Answer by mentioning a channel!*
`});
			const collector = message.channel.createMessageCollector({filter:
				m => m.author.id === message.author.id,
				
					time: 120000 // 2 minutes
				}
			);

			collector.on("collect", async msg => {
				// If the message is filled, it means the user sent yes or no for the image
				if (goodbye.message) {
					if (
						msg.content.toLowerCase() ==="yes","y","Yes"
                        
					) {
						goodbye.withImage = true;
					} else if (
						msg.content.toLowerCase() ==="No","no","n"
                      
					) {
						goodbye.withImage = false;
					} else {
						return message.channel.send({content:` Invalid **Yes** **No**`})
					}
					data.plugins.goodbye = goodbye;
					data.markModified("plugins.goodbye");
					await data.save();
					message.channel.send({content:`**Alright, done!**\n\n:arrow_right_hook: *Answer by sending **${prefix}goodbye test to preview your custom goodbye message!*
  `})
					return collector.stop();
				}

				// If the channel is filled and the message is not, it means the user sent the message
				if (goodbye.channel && !goodbye.message) {
					if (msg.content.length < 400) {
						goodbye.message = msg.content;
						return message.channel.send({content:`Do you want a great goodbye image too?**\n\n:arrow_right_hook: *Answer by sending **yes** or **no**`});
					}
					return message.channel.send({content:`Your message must not exceed 1800 characters!`})
				}

				// If the channel is not filled, it means the user sent it
				if (!goodbye.channel) {
					const channel = await Resolvers.resolveChannel({
						message: msg,
						channelType: "GUILD_TEXT"
					});
					if (!channel) {
						return message.channel.send({content:`Please specify a valid channel!`});
					}
					goodbye.channel = channel.id;
					message.channel.send({content:`Please enter your desired goodbye message.**\n\n**If you want to:**\n*-* __Mention the user__: {user}\n*-* __Get the member count__: {membercount}\n*-* __Get the server name__: {server}\n\n**Usage example:**\nGoodbye {user}, we will miss you! We are now {membercount}.\n:fast_forward:\nGoodbye ${message.author.tag}, we will miss you! We are now ${message.guild.memberCount}.,
`})
				}
			});

			collector.on("end", (_, reason) => {
				if (reason === "time") {
					return message.channel.send({content:`collector timeout`})
				}
			});
		}
    
    
  }}
    
  
  