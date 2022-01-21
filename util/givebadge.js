

    async function  badge(bot, message){
      const b ={};
  let  res2 = await User.findOneAndUpdate({userID: message.author.id})
  if(res2.data.command.uses = 1002){
  
    
    res2.badge = config.badge.lover;
    res2.save();
    
    
  }
  message.channel.send({content:` you got new badge by the bot because you used bot 1000 times new badge${config.badge.lover}`})
  if(res2.data.game.uses = 1000){
    res2.badge = config.badge.game;
    res2.save()
  
  
}}

module.exports = badge