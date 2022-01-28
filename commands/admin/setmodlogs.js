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
  run: async (bot, message, args, dev,data) => {
const areModLogsEnabled = Boolean(data.guild.plugins.modlogs);
		const sentChannel = await Resolvers.resolveChannel({
			message,
			search: args.join(" "),
			channelType: "GUILD_TEXT"
		});

		if (!sentChannel && areModLogsEnabled) {
			data.guild.plugins.modlogs = null;
			data.guild.markModified("plugins.modlogs");
			await data.guild.save();
			return message.channel.send({content:`Mod logs has been disabled`})
		} else {
			const channel = sentChannel || message.channel;
			data.guild.plugins.modlogs = channel.id;
			data.guild.markModified("plugins.modlogs");
			await data.guild.save();
			return message.channel.send({content:`Channel has been setup in **${channel.toString()}**`})
		
		}}}