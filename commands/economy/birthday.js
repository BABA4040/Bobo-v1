const Discord = require("discord.js")
const { Color } = require("../../config.js")
module.exports = {
  name: "birthday",
  aliases: ["birthday","bh"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args, dev) => {

    let data = await User.findOne({userID: message.author.id})
    
    const date = args[1];
		if(!date){
			return message.reply({content:`❎ Please set your Date`})
		}

		const tArgs = date.split("/");
		const [day, month, year] = tArgs;
		if(!day || !month || !year){
			return message.reply({content:`❎ Invalid Date`})
		}
        
		// Gets the string of the date
		const match = date.match(/\d+/g);
		if (!match){
			return message.reply({content:`❎ Invalid Date Format`})
		}
		const tday = +match[0], tmonth = +match[1] - 1;
		let tyear = +match[2];
		if (tyear < 100){
			tyear += tyear < 50 ? 2000 : 1900;
		}
		const d = new Date(tyear, tmonth, tday);
		if(!(tday == d.getDate() && tmonth == d.getMonth() && tyear == d.getFullYear())){
			return message.reply({content:`❎ Invalid Date Format`})
		}
		if(d.getTime() > Date.now()){
			return message.reply({content:`⬆️ Your birthday Date too high`})
		}
		if(d.getTime() < (Date.now()-2.523e+12)){
			return message.reply ({content:`⬇️ Your Date birthday too Low`})
		}

		data.birthdate = d;
		data.save();
        
		message.channel.send({content:`✅ Your Date Birthday Setup ${d}`
  });}}
