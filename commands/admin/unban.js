module.exports = {
  name: "unban",
  aliases: ["unban"],
  description: "unban user by id",
  usage: ["unban userId"],
  category: ["admin"],
  enabled: true,            
  memberPermissions: [ "BAN_MEMBERS" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","BAN_MEMBERS" ],        
  ownerOnly: false,            
  cooldown: 10000,
  run: async (bot, message, dev, data,args) => {
  /*  if (!user.match(/\d{17,19}/)){
      return message.channel.send({content:`${message.author}, Please provide the ID of the user to unban`});
    };

    user = user.match(/\d{17,19}/)[0];

    return message.guild.members.unban(user, { reason: `Mai Unbans: ${message.author.tag}: ${args.join(' ') || 'None'}`})
    .then(user => message.channel.send({content:`\\✔️ Successfully unbanned **${user.tag}**!`}))
    .catch(() => message.channel.send({content:`\\❌ Unable to unban user with ID ${user}. The provided argument maybe not a valid user id, or the user is not banned.`}));}}*/
  
    		let user = null;

		if(!args[1]){
			return message.channel.send({content:`Please Put Id of user`})
		}

		// Check if the arg is an ID or a username
		const isId = !isNaN(args[1]);

		if(isId){
			// Try to find a user with that ID
			await bot.users.fetch(args[1]).then((u) => {
				// if a user was found
				user = u;
			}).catch(() => {});
		} else if(!isId) {
			const arr = args[1].split("#");
			if(arr.length < 2){
				return message.channel.send({content:`I can't found`})
			}
			user = bot.users.filter((u) => u.username === arr[0]).find((u) => u.discriminator === arr[1]);
		}

		if(!user){
			return message.channel.send({content:`❌ | i cant find this user`}) ;
		}

		// check if the user is banned
		const banned = await message.guild.bans.fetch();
		if(!banned.some((e) => e.user.id === user.id)){
			return message.channel.send({content:`I think This user **${user.tag}** not banned from server`})}
		

		// Unban user
		message.guild.members.unban(user).catch(() => {});

		// Send a success message in the current channel
		message.channel.send({content:`${user.tag} unbanned by ${message.authlr.tag}`});

	}
    
  }