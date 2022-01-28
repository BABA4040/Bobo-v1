const Discord = require("discord.js");
const config = require(`${process.cwd()}/config.json`)
module.exports = class {

	
	async run (guild,bot, message) {
        /*
		await guild.members.fetch();

		const guildOwner = await bot.users.fetch(guild.ownerId).catch((err) => {console.log(err.name)});

		const messageOptions = {};

		const user = await User.findOneAndUpdate({ userID: guild.ownerId}) || new User({userID: guild.ownerId});
    let amount = user.money - 3000
    await User.updateOne({
      userID: guild.onwerId},
                         {
      $set:{
        money: amount}})
    
    
    
      const guildData = await Guild.findOne({guildID:guild.id})
      guildData.delete();*/
    
		const text = "**left**"+guild.name+"**, member count **"+guild.members.cache.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.cache.filter((m) => m.user.bot).size+" bots)";

		// Sends log embed in the logs channel
		const logsEmbed = new Discord.MessageEmbed()
			.setColor("#32CD32")
			.setDescription(text);
	bot.channels.cache.get(config.channels.logChannel).send({embeds:[logsEmbed]});
        
	}}