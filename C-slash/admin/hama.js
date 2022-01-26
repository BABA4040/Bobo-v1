const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = config.embed.Color;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("xptoggle")
  .addStringOption(option => option.setName("toggle"). setDescription("xpon")),
  memberPermissions: ["SEND_MESSAGES", "MANAGE_GUILD"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  enabled: true,
  cooldown: 10000,
  prime: false,
  run: async (bot, interaction) => {
    
    let guild = await Guild.findOne({guildID: interaction.guildId});
     
    if ( "on") {
      guild.xp.onoff = "on";
      guild.save();
      return interaction.reply({content:`xp status has been update to **on**`})
    
     } else if ("off") {
        guild.xp.onoff = "off";
        guild.save();
      return interaction.reply({content:` Xp system from guild is disabled`})
    }
  
      return interaction.reply({content:`error syntax [on,off] `})

    
    
    
    
    
  },
};
