const Discord = require("discord.js");

module.exports = class {

	
	async run (guild,bot, message) {
        
		await guild.members.fetch();

		const guildOwner = await bot.users.fetch(guild.ownerId).catch(() => {});

		const messageOptions = {};

		const userData = await Users.findOneOrCreate({ userID: message.author.id});
	
    if(userData.invite.times === 0){
      
      await Guild.updateOne(
          {
          userID: message.author.id
          },
          {
            $inc: {
            times: 1
            }
          }
        );
        return;
    
      
      
    }


		const thanksEmbed = new Discord.MessageEmbed()
			.setAuthor("Thank you for adding me to your guild !")
			.setDescription("To configure me, type `"config.prefix+"help`")
			.setColor(config.embed.Color)
			.setFooter(config.embed.footer)
			.setTimestamp();
		messageOptions.embed = thanksEmbed;

		guildOwner.send({embeds:[messageOptions]}).catch(() => {});

		const text = "J'ai rejoint **"+guild.name+"**, avec **"+guild.members.cache.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.cache.filter((m) => m.user.bot).size+" bots)";

		// Sends log embed in the logs channel
		const logsEmbed = new Discord.MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setColor("#32CD32")
			.setDescription(text);
		bot.channels.cache.get(config.logChannel).send({embeds:[logsEmbed]});
        
	}}