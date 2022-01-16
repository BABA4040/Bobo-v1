async function black(bot, message,userBlack,guildBlack){
  

   ///const userBlacklistSettings = await Black.findOne({ userID: message.author.id,});
//  const guildBlacklistSettings = await Black.findOne({ Guild: message.guild.id });



      if (userBlack&& userBlack.isBlacklisted) {
       //   logger.warn(`${message.author.tag} tried to use "${cmd}" command but the user is blacklisted`, { label: 'Commands' })
          return;// message.channel.send(`You are blacklisted from the bot :(`);
        }

        // Check if server is Blacklisted
        if (guildBlack && guildBlacklistSetting.isBlacklisted) {
        //  logger.warn(`${message.author.tag} tried to use "${cmd}" command but the guild is blacklisted`, { label: 'Commands' })
          return;//message.channel.send(` This guild is Blacklisted :(`);
        }}
module.exports = black