const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const pendings = {};
module.exports = {
data: new SlashCommandBuilder()
.setName("marry")
.setDescription("marry with your girlfriend")
.addUserOption(option =>
option.setName('target_user')
.setDescription('target your girlfriend')
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
    
if (member.bot) {
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
    } else if (requester === member.id) {
        // If the asked member has sent pending request
        const user =
          bot.users.cache.get(receiver) || (await bot.users.fetch(receiver));
        return interaction.reply({
          content: `Your request has been sent to user  ${member.user.tag} to ${user.tag}`
        });
      } else if (receiver === member.id) {
        // If there is a pending request for the asked member
        const user =
          bot.users.cache.get(requester) || (await bot.users.fetch(requester));
        return interaction.reply({
          content: `  ${member.tag} pending request ${user.tag}`
        });
      }
    }
    // Update pending requests
    pendings[interaction.user.id] = member.id;

    interaction.reply({
      content: ` Request marry from: ${interaction.user.tag} to: ${member.toString()} if you agree please type: **\`yes\`** if your disagree type: **\`no\`**`
    });

    const collector = new Discord.MessageCollector(
      interaction.channel,
      m => m.author.id === member.id,
      {
        time: 120000
      }
    );
    collector.on("collect", msg => {
      ///if(msg.content.toLowerCase() === message.content.startsWith("yes"){
      if (msg.content.startsWith("yes", "Yes", "YES")) {
        return collector.stop(true);
      }
      //	if(msg.content.toLowerCase() === message.content.startsWith("no")){
      if (msg.content.startsWith("no", "No", "NO")) {
        return collector.stop(false);
      }
      if (!msg.content.startsWith("")) {
        return interaction.reply({
          content: `❎ Invalid answer Only Type: Yes Or No`
        });
      }
    });
    collector.on("end", async (_collected, reason) => {
      // Delete pending request
      delete pendings[interaction.user.id];
      if (reason === "time") {
        return interaction.reply({
          content: `❎ Marry request time has been ended  
				 ${member.toString()}`
        });
      }
      if (reason) {
        data.guild.lover = member.id;
        await data.guild.save();
        userData.lover = interaction.user.id;
        await userData.save();
        const messageOptions = {
          content: `${member.toString()} :heart: ${interaction.user.tag}`,
          files: [
            {
              name: "unlocked.png",
              attachment:
                "https://media.discordapp.net/attachments/850135031015538748/894182688490127420/achievement3.png"
            }
          ]
        };
                let sent = false;
        if (!userData.achievements.married.achieved) {
          interaction.eply(messageOptions);
          sent = true;
          userData.achievements.married.achieved = true;
          userData.achievements.married.progress.now = 1;
          userData.markModified("achievements.married");
          userData.save();
        }
        if (!userData.achievements.married.achieved) {
          if (!sent) interaction.editReply({ content: messageOptions });
          userData.achievements.married.achieved = true;
          userData.achievements.married.progress.now = 1;
          userData.markModified("achievements.married");
          userData.save();
        }
        return interaction.reply({
          content: ` Congratulations🎉💏
			 ${interaction.user.tag}
				and ${member.tag}`
        });
      } else {
        return interaction.editreply({
          content: `Sorry 😑 Your request has been denied  
					creator: ${interaction.user.tag}
					partner: ${member.tag}`
        });
      }
    });



    
    
    
    
    
  }}