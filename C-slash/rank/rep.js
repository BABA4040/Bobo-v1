const moment = require('moment');
const text = require(`${process.cwd()}/util/string`);

const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("")
.setDescription("")
.addStringOption(option =>
option.setName('')
.setDescription('')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    const user = await interaction.options.getUser('user')
    let tipper = await User.findOne({userID: user.id})
    if (!tipper){
      tipper = new User({ userID: user.id });
    };
    const now = Date.now();
if (tipper.data.reps.timestamp !== 0 && tipper.data.reps.timestamp - now > 0){
      return interaction.reply({content:`❎ **${interaction.user.tag}**, you already used your rep. You can wait for ${moment.duration(tipper.data.reps.timestamp - now).format('H [hours,] m [minutes, and] s [seconds]')} to rep someone again.`});
    } else if (!user){
      return interaction.reply({content:`✅ **${interaction.user.tag}**, you can now rep someone from this server!`});
    };
     if(user.id ===interaction.user.id){ return message.reply({content:`❎ You can't tip Your self`})};
    const member = await interaction.guild.members
    .fetch(user)
if (!member){
      return interaction.reply({content:`❎ **${interaction.user.tag}**, could not add rep to this user. Reason: User not found!`});
    } else if (member.bot){
      return message.channel.send({content:`❎ **${interaction.user.tag}**, you cannot rep a bot!`});
    };
    
    let doc = await User.findOne({userID: member.id})
      if (!doc){
        doc = new User.findOne({userID:member.id });
      };
const amount = 1000;
      let overflow = false, excess = null, unregistered = false;
if (doc.money === null){
        unregistered = true;
      } else if (doc.money + amount > 50000){
        overflow = true;
        excess = doc.money + amount - 50000;
        doc.money = 50000;
      } else {
        doc.money += amount;
      };
tipper.data.reps.timestamp = now + 432e5;
      tipper.data.reps.given++;
      doc.data.tips.received++;

  }}