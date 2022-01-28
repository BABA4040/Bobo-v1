const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const pendings = {};
module.exports = {
data: new SlashCommandBuilder()
.setName("marry")
.setDescription("marry with your girlfriend")
.addStringOption(option =>
option.setName('target_user')
.setDescription('target your girlfriend')),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    if (data.user.lover) {
      return interaction.reply({
        content: `❎ You Already Married with this person `
      });
    }
    
    const member = await interaction.options.getUser('target_user')
    const userData = await User.findOne({ id: member.id });
    // if the member is already wedded
    if (userData.lover) {
      return interaction.reply({
        content: `this user already married ${member.user.tag}`
      });
    }
    
if (member.user.bot) {
      return interaction.reply({ content: `❎ You can't Marry With Me` });
    }
if (member.id === interaction.user.id) {
      return interaction.reply({ content: `❎ You can't marry with Yourself` });
    }
for (const requester in pendings) {
      const receiver = pendings[requester];
      // If the member already sent a request to someone
      if (requester === interaction.user.id) {
        const user =
          bot.users.cache.get(receiver) || (await bot.users.fetch(receiver));
        return interaction.reply({
          content: `❎ You Requested Befor to
					 ${user.tag}`
        });
      } else if (receiver === interaction.user.id) {
        // If there is a pending request for this member
        const user =
          bot.users.cache.get(requester) || (await bot.users.fetch(requester));
        return interaction.reply({
          content: `🌀 You must waiting to accept Your Request 
			 ${user.tag}`
        })
    
    
    
    
    
    
  }}