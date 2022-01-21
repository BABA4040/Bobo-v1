		const Resolvers = require("../../helpers/resolvers")
module.exports = {
  name: "setmodlogs",
  aliases: ["setmod","setlogs","setmodlogs","setmodlog"],
  description: "to set mod log channel",
  usage: ["setmodlogs"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    
  
  let data = await Guild.findOneAndUpdate({guildID: message.guild.id})




const areModLogsEnabled = Boolean(data.plugins.modlogs);
		const sentChannel = await Resolvers.resolveChannel({
			message,
			search: args.join(" "),
			channelType: "GUILD_TEXT"
		});

		if (!sentChannel && areModLogsEnabled) {
			data.plugins.modlogs = null;
			data.markModified("plugins.modlogs");
			await data.save();
			return message.channel.send({content:`Mo logs has been disabled`})
		} else {
			const channel = sentChannel || message.channel;
			data.plugins.modlogs = channel.id;
			data.markModified("plugins.modlogs");
			await data.save();
			return message.channel.send({content:`Channel has been setup in **${channel.toString()}**`})
		
		}}}