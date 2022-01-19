

const Resolvers = require("../../helpers/resolvers");

module.exports = {
  name: "welcome",
  aliases: ["welcome"],
  description: "set welcome channel",
  usage: ["setwelcomech"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, prefix) => {
    let data = await Guild.findOneAndUpdate({ guildID: message.guild.id });

    if (args[1] === "test" && data.plugins.welcome.enabled) {
      bot.emit("guildMemberAdd", message.member);
      
      return message.channel.send({ content: ` Test Tes` });
    }

    if (args[1] === "off") {
      data.plugins.welcome = {
        enabled: false,
        message: null,
        channel: null,
        withImage: null,
      };
      data.markModified("plugins.welcome");
      data.save();
      return message.channel.send({ content: `Welcome system disabled` });
    } else {
      
      const welcome = {
        enabled: true,
        channel: null,
        message: null,
        withImage: null,
      };
      message.channel.send({content:`${message.author.toString()}, In which channel will welcome messages be sent?**\n\n:arrow_right_hook: *Answer by mentioning a channel!*`})
      
     const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no'].includes(_message.content.toLowerCase());

      const collector = message.channel.createMessageCollector({filter: filter, time: 120000, /*2 minutes*/ } );

      collector.on("collect", async (msg) => {
        // If the message is filled, it means the user sent yes or no for the image
        if (welcome.message) {
          if ((msg.content.toLowerCase() === "yes", "y", "Yes")) {
            welcome.withImage = true;
          } else if ((msg.content.toLowerCase() === "no", "n", "No")) {
            welcome.withImage = false;
          } else {
            return message.channel.send({
              content: ` Your answer Not including **Yes** or **No**`,
            });
          }
          data.plugins.welcome = welcome;
          data.markModified("plugins.welcome");
          await data.save();
          message.channel.send({
            content: `*Alright, done!**\n\n:arrow_right_hook: *Answer by sending ${prefix}welcome test to preview your custom welcome message!* <#${welcome.channel}>`,
          });
        
        return collector.stop();
        }
        // If the channel is filled and the message is not, it means the user sent the message
        if (welcome.channel && !welcome.message) {
          if (msg.content.length < 400) {
            welcome.message = msg.content;
            return message.channel.send({
              content: `"**Do you want a great welcome image too?**\n\n:arrow_right_hook: *Answer by sending **yes** or **no** !*`,
            });
          }
          return message.channel.send({
            content: `❌ | Your welcome message less than 400 words`,
          });
        }

        // If the channel is not filled, it means the user sent it
        if (!welcome.channel) {
          const channel = await Resolvers.resolveChannel({
						message: msg,
						channelType: "GUILD_TEXT"
					});
          if (!channel) {
            return message.channel.send({
              content: `Please specify a valid channel!`,
            });
          }
          welcome.channel = channel.id;
          message.channel.send({
            content: `"**Please enter your desired welcome message.**\n\n**If you want to:**\n*-* __Mention the user__: {user}\n*-* __Get the member count__: {membercount}\n*-* __Get the server name__: {server}\n\n**Usage example:**\nWelcome to {server}, {user}! We are now {membercount}!\n:fast_forward:\nWelcome to {{guildName}}, {{author}}! We are now {{memberCount}}!"`,
          });
        }
      });

      collector.on("end", (_, reason) => {
        if (reason === "time") {
          return message.channel.send({ content: `time out` });
        }
      });
    }
  },
};
