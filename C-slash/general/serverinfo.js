const moment = require('moment');

const filterLevels = {

	DISABLED: 'Off',

	MEMBERS_WITHOUT_ROLES: 'No Role',

	ALL_MEMBERS: 'Everyone'

};

const verificationLevels = {

	NONE: 'None',

	LOW: 'Low',

	MEDIUM: 'Medium',

	HIGH: '(╯°□°）╯︵ ┻━┻',

	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'

};

const regions = {

	brazil: 'Brazil',

	europe: 'Europe',

	hongkong: 'Hong Kong',

	india: 'India',

	japan: 'Japan',

	russia: 'Russia',

	singapore: 'Singapore',

	southafrica: 'South Africa',

	sydeny: 'Sydeny',

	'us-central': 'US Central',

	'us-east': 'US East',

	'us-west': 'US West',

	'us-south': 'US South'

};
const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("serverinfo")
.setDescription("server information"),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    
    const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

            
       
		const members = interaction.guild.members.cache;

	        ///let guild = await Guild.findOne({ guildID: message.guild.id });
		
                const channel = interaction.guild.channels.cache.size;
	       
                const channels =interaction.guild.channels.cache;

		const emojis = interaction.guild.emojis.cache;

		const embed = new Discord.essageEmbed()
      .setTitle("Guild information")
			.setColor(config.embed.Color)
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addField("Name", `${interaction.guild.name}`)
                      
                        .addField("Owner", `<@${interaction.guild.ownerId}>`)
                        .addField("Region", `${regions[interaction.guild.region]}`)
                        .addField("Explicit Filter", `${filterLevels[interaction.guild.explicitContentFilter]}`)
                        .addField("Verification Level", `${verificationLevels[interaction.guild.verificationLevel]}`)
                        .addField("Time Created", `${moment(interaction.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`)
                        .addField("Role Count", `${roles.length}`)
                        .addField("Boost Count", `${message.guild.premiumSubscriptionCount || '0'}`)
                        .addField("Member Count", `${message.guild.memberCount}`)
                        .addField("Bots", `${members.filter(member => member.user.bot).size}`)
                        .addField(`Channels`, `(${channel})`)
                        .addField("Emoji Count", `${emojis.size}`)


	      message.channel.send({embeds: [embed] });



  }}