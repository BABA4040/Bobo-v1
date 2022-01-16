const Discord = require("discord.js");
const owners = "768944616724103170";
/**/

const profileSchema = require(`${process.cwd()}/data/user.js`);
const experience = require(`${process.cwd()}/util/xp`);
const permission = require(`${process.cwd()}/util/permission.js`);
const blacklist = require(`${process.cwd()}/util/blacklist.js`)
const cooldown = require(`${process.cwd()}/util/cooldown.js`)
module.exports = class {
  async run(message, bot, command) {
    const data = {};

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let guild = await Guild.findOne({ guildID: message.guild.id });
    if (!guild) {
      Guild.create({ guildID: message.guild.id });
    }
    data.guild = guild;
    let user = await User.findOne({
      userID: message.author.id,
    });
    if (!user) {
      User.create({ userID: message.author.id });
    }
    data.user = user;
    let prime = await Prime.findOne({ guildID: message.guild.id });
    if (prime && prime.log === "enable") return; //message.channel.send(`you don't have Premium version`);

    let h = await Owner.findOne({ ownerCode: "768944616724103170" });
    if (!h) {
      Owner.create({
        ownerCode: "768944616724103170",
        worldWhitelist: "768944616724103170",
      });
    }
    ///if(message.guild.members.cache.has("838593240328044554")) return

    if (!user || !user.xp) {
      return; /////message.channel.send({content:`\\❌ **${message.author.tag}** have not started earning XP in this bot yet!`})
    }
let member = message.author.id
    const response = await experience(message, bot, guild);
///const black = await blacklist(message,bot)
    ///-----------////

    const userBlack= await Black.findOne({
      userID: message.author.id,
    });
    const guildBlack = await Black.findOne({
      Guild: message.guild.id,
    });
const black = await blacklist(message,bot,userBlack,guildBlack)
    

    
    
    const cool = await permission(message,bot,Discord,guild,data, member)
        const coold = await cooldown(bot, message,guild,Discord,command)
   /*   if (!bot.cooldowns.has(command.name)) {
        bot.cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = bot.cooldowns.get(command.name);
      const cooldownAmount = command.cooldown || 2 * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel
            .send({content:`Please wait ${timeLeft.toFixed(1)} second`})
            .then(msg =>setTimeout(() => msg.delete(), 2000));
        }
      }
      timestamps.set(message.author.id, now);

    
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
   */ }
  };
