const Discord = require("discord.js");
const config = require(`${process.cwd()}/config.json`)
module.exports = class {

	
	async run (guild,bot, message) {
        
		await guild.members.fetch();

		const guildOwner = await bot.users.fetch(guild.ownerId).catch((err) => {console.log(err.name)});

		const messageOptions = {};

		const user = await User.findOneAndUpdate({ userID: guild.ownerId}) || new User({userID: message.author.id});
    if(user){
      user.money += 3000;
      user.save()}
    



		const thanksEmbed = new Discord.MessageEmbed()
			.setAuthor("Thank you for adding me to your guild !")
			.setDescription(`To configure me use ${config.prefix}help`)
			.setColor(config.embed.Color)
			.setFooter(config.embed.footer)
			.setTimestamp();
		messageOptions.embed = thanksEmbed;

		guildOwner.send({embeds:[thanksEmbed]}).catch((err) => {console.log(err)});

		const text = "J'ai rejoint **"+guild.name+"**, avec **"+guild.members.cache.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.cache.filter((m) => m.user.bot).size+" bots)";

		// Sends log embed in the logs channel
		const logsEmbed = new Discord.MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setColor("#32CD32")
			.setDescription(text);
	bot.channels.cache.get(config.channels.logChannel).send({embeds:[logsEmbed]});
        
	}}