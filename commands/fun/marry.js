const Discord = require("discord.js");
const { Color } = require("../../config.js");

const pendings = {};

module.exports = {
  name: "marry",
  aliases: ["marry"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 5000,
  run: async (bot, message, args, dev) => {
    let data = await User.findOne({ userID: message.author.id });
    if (data.lover) {
      return message.reply({
        content: `❎ You Already Married with this person `
      });
    }

    // Gets the first mentionned member
    const member = await message.mentions.members.first();
    if (!member) {
      return message.reply({ content: `❎ Invalid User` });
    }

    const userData = await User.findOne({ id: member.id });
    // if the member is already wedded
    if (userData.lover) {
      return message.channel.send({
        content: `ALREADY_MARRIED_USER
				username: ${member.user.tag}`
      });
    }

    if (member.user.bot) {
      return message.reply({ content: `❎ You can't Marry With Me` });
    }

    if (member.id === message.author.id) {
      return message.reply({ content: `❎ You can't marry with Yourself` });
    }

    for (const requester in pendings) {
      const receiver = pendings[requester];
      // If the member already sent a request to someone
      if (requester === message.author.id) {
        const user =
          bot.users.cache.get(receiver) || (await bot.users.fetch(receiver));
        return message.reply({
          content: `❎ You Requested Befor to
					username: ${user.tag}`
        });
      } else if (receiver === message.author.id) {
        // If there is a pending request for this member
        const user =
          bot.users.cache.get(requester) || (await bot.users.fetch(requester));
        return message.reply({
          content: `🌀 You must waiting to accept Your Request 
					username: ${user.tag}`
        });
      } else if (requester === member.id) {
        // If the asked member has sent pending request
        const user =
          bot.users.cache.get(receiver) || (await bot.users.fetch(receiver));
        return message.reply({
          content: `Your request has been sent to user firstUsername: ${member.user.tag} to secondUsername: ${user.tag}`
        });
      } else if (receiver === member.id) {
        // If there is a pending request for the asked member
        const user =
          bot.users.cache.get(requester) || (await bot.users.fetch(requester));
        return message.channel.send({
          content: ` wtf firstUsername: ${member.user.tag} secondUsername: ${user.tag}`
        });
      }
    }

    // Update pending requests
    pendings[message.author.id] = member.id;

    message.channel.send({
      content: ` Request marry from: ${message.author.toString()} to: ${member.user.toString()} if you agree please type: **\`yes\`** if your disagree type: **\`no\`**`
    });

    const collector = new Discord.MessageCollector(
      message.channel,
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
        return message.channel.send({
          content: `❎ Invalid answer Only Type: Yes Or No`
        });
      }
    });

    collector.on("end", async (_collected, reason) => {
      // Delete pending request
      delete pendings[message.author.id];
      if (reason === "time") {
        return message.reply({
          content: `❎ Marry request time has been ended  
					username: ${member.user.toString()}`
        });
      }
      if (reason) {
        data.lover = member.id;
        await data.save();
        userData.lover = message.author.id;
        await userData.save();
        const messageOptions = {
          content: `${member.toString()} :heart: ${message.author.toString()}`,
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
          message.channel.send(messageOptions);
          sent = true;
          userData.achievements.married.achieved = true;
          userData.achievements.married.progress.now = 1;
          userData.markModified("achievements.married");
          userData.save();
        }
        if (!userData.achievements.married.achieved) {
          if (!sent) message.channel.send({ content: messageOptions });
          data.userData.achievements.married.achieved = true;
          data.userData.achievements.married.progress.now = 1;
          data.userData.markModified("achievements.married");
          data.userData.save();
        }
        return message.channel.send({
          content: ` Congratulations🎉💏
					creator: ${message.author.toString()}
					partner: ${member.user.toString()}`
        });
      } else {
        return message.channel.send({
          content: `Sorry 😑 Your request has been denied  
					creator: ${message.author.toString()}
					partner: ${member.user.toString()}`
        });
      }
    });
  }
};
