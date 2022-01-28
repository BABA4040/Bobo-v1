const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const text = require('../../util/string');
module.exports = {
data: new SlashCommandBuilder()
.setName("leaderboard")
.setDescription("leaderboard in server"),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    const embed = new Discord.MessageEmbed()    
  
    
   return User.find({ 'data.xp.id': interaction.guild.id }).exec( async (err, docs) => {
      if (err) {
        return interaction.reply({embeds:[
          embed.setAuthor('Database Error','https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
          .setDescription('\'s Database Provider responded with an error: ' + err.name)
       ]});
      };

      docs = docs.map(x => { return { id: x.userID, data: x.data.xp.find(x => x.id === interaction.guild.id)};})
      .sort((A,B) => B.data.xp - A.data.xp) // Arrange by points, descending.
      .filter(x => x.data.xp); // Remove document where xp is 0.

      if (!docs.length){
        return interaction.reply({embeds:[
          embed.setDescription([
            `**${interaction.member.displayName}**, No XP found.\n\n`,
            'Users in this server have not started earning XP yet!\n',
            '[loading]() about Bobo\'s XP System.'
          ].join('\n'))
          .setAuthor('No XP','https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
        ]});
      };

      const members = await interaction.guild.members
      .fetch({ user: docs.slice(0,10).map(x => x.id) })
      .catch(() => null)

      return interaction.reply({embeds:[
        new Discord.MessageEmbed()
        .setColor(config.embed.Color)
        .setFooter(`XP Leaderboard | \©️${new Date().getFullYear()} Bobo`)
        .setAuthor(`🏆 ${interaction.guild.name} Leaderboard`, interaction.guild.iconURL({format: 'png', dynamic: true }) || null)
        .addField(`**${members.get(docs[0].id)?.displayName || '<Unknown User>'}** ranked the highest with **${text.commatize(docs[0].data.xp)}**XP!`,
        [
          '```properties',
          '╭═══════╤═══════╤════════╤════════════════════════════╮',
          '┃  Rank ┃ Level ┃     XP ┃ User                               ┃',
          '╞═══════╪═══════╪════════╪════════════════════════════╡',
          docs.slice(0,10).map((u,i) => {
            
            const rank = String(i+1);
            return [
              '┃' + ' '.repeat(6-rank.length) + rank,
              ' '.repeat(5-String(u.data.level).length) + u.data.level,
          
              ' '.repeat(6-text.compactNum(u.data.xp).length) + text.compactNum(u.data.xp),
              members.get(u.id)?.user.tag || '<Unknown User>'
            ].join(' ┃ ')
          }).join('\n'),
          '╞═══════╪═══════╪════════╪════════════════════════════╡',
          docs.filter(x => x.id === interaction.user.id).map((u,i,a) => {
            const user = a.find(x => x.id === interaction.user.id);
            
            const rank = docs.findIndex(x => x.id === interaction.user.id) + 1;
            
            return [
              '┃' + ' '.repeat(6-text.ordinalize(rank).length) + text.ordinalize(rank),
              ' '.repeat(5-String(u.data.level).length) + u.data.level,
          
              ' '.repeat(6-text.compactNum(u.data.xp).length) + text.compactNum(u.data.xp),
              text.truncate('You (' + interaction.user.username+ ')', 26) + ' '.repeat(27-text.truncate('You (' + interaction.user.tag + ')', 26).length) + '┃'
            ].join(' ┃ ')
          }).join(''),
          '╰═══════╧═══════╧════════╧════════════════════════════╯',
          '```'
        ].join('\n'))
        
      ]});
    });  

  }}