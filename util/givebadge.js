 async function hama({bot, message, user }){
  
  if(user.data.command.uses = 1002){
  
    
    user.badge = config.badge.lover;
    user.save();
    
    
  }
  message.channel.send({content:` you got new badge by the bot because you used bot 1000 times new badge${config.badge.lover}`})
  if(user.data.game.uses = 1000){
    user.badge = config.badge.game;
    user.save()
  
  
}}
module.exports = hama