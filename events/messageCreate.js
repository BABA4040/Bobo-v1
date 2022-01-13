const Discord = require("discord.js");
const owners = "768944616724103170";
/**/

const profileSchema = require(`${process.cwd()}/data/user.js`);


module.exports = class{
  async run (message, bot){
    
    
    const data = {};
   
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let guild = await Guild.findOne({ guildID: message.guild.id });
    if (!guild) {
      Guild.create({ guildID: message.guild.id });
    }
    data.guild = guild;
    let user = await User.findOne({
      
      userID: message.author.id
    });
    if (!user) {
      User.create({  userID: message.author.id });
    }
    data.user = user;
        let prime = await Prime.findOne({ guildID: message.guild.id });
    if (prime && prime.log === "enable")
      return ;//message.channel.send(`you don't have Premium version`);
  
   let h= await Owner.findOne({ ownerCode: "768944616724103170" });
    if (!h) {
      Owner.create({ ownerCode: "768944616724103170",worldWhitelist:"768944616724103170"})
   }
    ///if(message.guild.members.cache.has("838593240328044554")) return
   


if (!user || !user.xp){
        return /////message.channel.send({content:`\\❌ **${message.author.tag}** have not started earning XP in this bot yet!`})
      };






////--------xp system------/////*
/*xp(message)
      function xp(message){
      let xp = (user.xp += 1)
  let level = Math.floor(0.1 * Math.sqrt(xp));
  let lvl = user.levels;

  
  if (level > lvl) {
    let newLevel = (user.levels += level);
    message.channel.send(
      `:tada: ${message.author.username}, You just advanced to level ${newLevel}!`
    );
  }
user.name= message.author.username
  user.save();}

xp(message);
    function xp(message) {
      if(!guild) {Guild.create({guildID: message.guild.id})}
      if(guild){
        if(guild.xp.onoff === "off") return;
      let xp = (user.xp += 1);

      
      let level = Math.floor(0.1 * Math.sqrt(xp));
      let lvl = user.levels;

      if (level > lvl) {
        let newLevel = (user.levels += level);
        message.channel.send(
          `:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`
        );
      }
      user.save();
    }}*/




  //xp(message);
    async function xp(message) {

      if (guild) {
        if (guild.xp.onoff === "off") return;

        
      
        const max = 8;
        const min = 2;
        const points = Math.floor(Math.random() * (max - min)) + min;
        let res = await profileSchema.findOne({ userID: message.author.id });

        if (!(res instanceof profileSchema)) {
          return promise.resolve({ xpAdded: false, reason: "DB_ERROR" });
        }

        // Get the server data
        let index = res.data.xp.findIndex(x => x.id === message.guild.id);
        let serverdata;

        // Add serverdata to profile if it doesn't exist yet
        // -1 means the index couldn't be found
        if (index === -1) {
          res.data.xp.push({
            id: message.guild.id,
            xp: 0,
            level: 1
          });
          index = res.data.xp.findIndex(x => x.id === message.guild.id);
          [serverdata] = res.data.xp.splice(index, 1);
        } else {
          [serverdata] = res.data.xp.splice(index, 1);
        }

        // define points
        let _xp = {
          global: {
            get cap() {
              return (
                50 * Math.pow(res.data.global_level, 2) +
                150 * res.data.global_level
              );
            },
            get next() {
              return this.cap - res.data.global_xp;
            }
          },
          local: {
            get cap() {
              return (
                50 * Math.pow(serverdata.level, 2) + 150 * serverdata.level
              );
            },
            get next() {
              return this.cap - serverdata.xp;
            }
          }
        };

        // PROCESS GLOBAL XP
        // Add 3xp xp add on global based xp
        // Increment level if next is less than the current xp
        res.data.global_xp = res.data.global_xp + 3;
        while (_xp.global.next < 1) {
          res.data.global_level++;
          message.channel.send({content:`Congratulations ${message.author.toString()}, you leveled up to ${serverdata.level}!!`})
        }

        // PROCESS LOCAL XP
        // Add points which was previously randomized on server[local] based xp
        // increment level if next is less than the current xp.
        serverdata.xp = serverdata.xp + points;
        while (_xp.local.next < 1) {
          serverdata.level++;
          
         /// bot.emit('memberLevelup',user, serverdata.level)

          message.channel.send({content:`Congratulations ${message.author.toString()}, you leveled up to ${serverdata.level} in the server!!`})
        }
      
        // Add xpdata again to the xp array of the profile
        // index = where the serverdata is inserted
        // 0 = number of elements to remove
        // serverdata = the inserted data
        res.data.xp.splice(index, 0, serverdata);

        
        //message.channel.send(
          //`:tada: ${message.author.toString()}, You just advanced to level ${res.data.xp.level}!`
    //  )
        
        // Save the new data
        return res
          .save()

          .then(() => {
            xp.set(message.author.id, {});
            setTimeout(() => xp.delete(message.author.id), 60000);
            return { xpAdded: true, reason: null };
          })
          .catch(() => {
            return { xpAdded: false, reason: "DB_ERROR_ON_SAVE" };
          });
      }}

    ///-----------////


   const userBlacklistSettings = await Black.findOne({ userID: message.author.id,});
  const guildBlacklistSettings = await Black.findOne({ Guild: message.guild.id });



      if (userBlacklistSettings && userBlacklistSettings.isBlacklisted) {
       //   logger.warn(`${message.author.tag} tried to use "${cmd}" command but the user is blacklisted`, { label: 'Commands' })
          return;// message.channel.send(`You are blacklisted from the bot :(`);
        }

        // Check if server is Blacklisted
        if (guildBlacklistSettings && guildBlacklistSettings.isBlacklisted) {
        //  logger.warn(`${message.author.tag} tried to use "${cmd}" command but the guild is blacklisted`, { label: 'Commands' })
          return;//message.channel.send(` This guild is Blacklisted :(`);
        }

      

////////--------/////

 if (guild) {
      
      if (!message.content.toLowerCase().startsWith(guild.prefix.toLowerCase()))
         return;
       let args = message.content.split(" ");
       const argsr = message.content
         .slice(guild.prefix.length)
         .trim()
         .split(/ +/g);
       const cmd = argsr.shift().toLowerCase();
       if (cmd.length === 0) return;
     let command = bot.commands.get(cmd);
      if (!command) command = bot.commands.get(bot.aliases.get(cmd));
/*
      if (command.prime) {
        let data = await Prime.findOne({ Guild: message.guild.id });

        if (!data)
          return message.channel.send({content:`this server not haven't on data base`});

        if (!data.Permanent && Date.now() > data.time) {
          data.delete();

          return message.channel.send({content:
            `prime bot on your server ended for buy mor join support server `
                                      });
        }
      }*/
if(!command) return;/// message.channel.send({content: `I don't have command like this`})
      ////////
      if (!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES"))
        return;
      if (!command.enabled) return await message.channel.send({content:`This command is **Disable** for now`})
  let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
  data.ww = Ww;
  if (command.ownerOnly && !Ww.worldWhitelist.find((c) => c.type === message.author.id)) return await message.channel.send({content:`This command is only for owner the bot`});
  if (command.guilOwnerOnly) {
      if (message.author.id !== message.guild.ownerId &&
       !Ww.worldWhitelist.find((c) => c.type === message.author.id)
      ) return message.channel.send({content:`This command is only for guildOwner`})
	  }
     let neededPermissions = [];
	  if(!command.botPermissions.includes("EMBED_LINKS")){
		  command.botPermissions.push("EMBED_LINKS");
	  }
	  command.botPermissions.forEach((perm) => {
		  if(!message.channel.permissionsFor(bot.user).has(perm)){
			  neededPermissions.push(perm);
		  }
	  });
	 if(neededPermissions.length > 0){
		  return message.channel.send({content:`I don't have a ${neededPermissions.map((p) => `\`${p}\``).join(", ")} permissions`});
	  }
	  neededPermissions = [];
	  command.memberPermissions.forEach((perm) => {
		  if(!message.channel.permissionsFor(message.member).has(perm)){
			  neededPermissions.push(perm);
		  }
	  });
	  if(neededPermissions.length > 0){
		  return message.channel.send({content:`You don't have a ${neededPermissions.map((p) => `\`${p}\``).join(", ")} permissions`});
	 } 

   
if (command.botPermissions) {
    let perms = new Discord.MessageEmbed().setDescription(
      `i don't Have ${command.botPermissions} To Run Command..`
    );
    if (!message.guild.me.permissions.has(command.botPermissions || []))
      return message.channel.send({ embeds: [perms] });

}

/*
      if (!bot.cooldowns.has(command.name)) {
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
     */ let prefix = guild.prefix;
  /// else loadCommandOptions(client, message, command, false);

      if (command) command.run(bot, message, args, prefix, data, cmd, prime);
  //setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
  }
};
