module.exports = {
  name: "setwelcomech",
  aliases: ["welcomech","setwelcomech"],
  description: "set welcome channel",
  usage: ["setwelcomech"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    
  let data = await Guild.findOneAndUpdate({guildID: message.guild.id});
  
 



if (
			args[1] === "test" &&
            data.plugins.welcome.enabled
		) {
			bot.emit("guildMemberAdd", message.member);
			return message.channel.send({content:` Test Tes`})
		}
  
  
  if (args[1] === "off") {
			data.plugins.welcome = {
				enabled: false,
				message: null,
				
				withImage: null
			};
			data.markModified("plugins.welcome");
			data.save();
			return message.channel.send({content:`Welcome system disabled`})
  
  } else {
			const welcome = {
				enabled: true,
				channel: null,
				message: null,
				withImage: null,
			};
message.sendT("administration/welcome:FORM_1", {
				author: message.author.toString()
			});
			const collector = message.channel.createMessageCollector(
				m => m.author.id === message.author.id,
				{
					time: 120000 // 2 minutes
				}
			);
  }}
