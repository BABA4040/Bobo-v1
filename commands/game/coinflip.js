const Discord = require("discord.js")
const { Color } = require("../../config.js")
const ms = require('parse-ms')
const bobo = "<:Bobocash:897148836567457862>"
const tail = "<a:flip:897157024209592331>"
module.exports = {
  name: "coinflip",
  aliases: ["coinflip","cf"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 8000,
  run: async (bot, message, args, dev) => {
 
   
    let data = await User.findOne({userID: message.author.id}) 
    
let money = data.money
    var cf = args[1] || 1
  if(!cf) return message.channel.send({content:`❎ **${message.author.username}**, please, Type a number `})
        

    if(cf > money) return message.channel.send({content:`❎ **${message.author.username}**, You Don't have enough Bobo coins to play, Your balance:**\`$${money}\`**`})
  
        if(cf> 50000) return message.channel.send({content:`❎ You can't use your money than 50,000`})
                    
     if(args[1] ==="all"){
       var cff = 50000;
 
       const result = [ "LOOSELOOSE","WINWIN","WINWIN","LOOSELOOSE","WINWIN","LOOSELOOSE"] 
  
        let awnser = result[Math.floor(Math.random() * result.length)]
     if (awnser === "LOOSELOOSE") {

      var monn = cff * 2      
        //////        
        var text2 = `**${message.author.username} You spent \`${cff.toLocaleString()}\`**, chose **heads** The coin spins ${tail}...`;
          message.channel.send({content: text2}).then(msg => {
            setTimeout(() => {
              msg.edit({content:`**${message.author.username} You spent \`${cff.toLocaleString()}\`**, chose **heads** The coin spins and You lost all ${bobo}`});
            }, 3000);
        });
       
  if(data){   
data.money -= cff
data.save()}
}
     
if(awnser === "WINWIN") {
       
          var monn2 = cff * 2
        var text2 = `**${message.author.username} You spent \`${cff}\`**, chose **heads** The coin spins ${tail}...`;
          message.channel.send({content:text2}).then(msg => {
            setTimeout(() => {
              msg.edit( {content:`**${message.author.username} You spent \`${cff.toLocaleString()}\`**, chose **heads** The coin spins  and Win **\`${monn2.toLocaleString()}\`${bobo}**`});
            }, 3000);
          });
    if(data){
      data.money += monn2;
      data.save()
    }
      }}







                  
      

        if(Number(args[1])){
        const result = [ "LOOSELOOSE","WINWIN","WINWIN","LOOSELOOSE","WINWIN","LOOSELOOSE"] 
  ///f (isNaN(cf) || cf < 0)  return message.channel.send({content:`❎ The amount you entered is not a valid number?`})

        let awnser = result[Math.floor(Math.random() * result.length)]
     if (awnser === "LOOSELOOSE") {
 var mon = cf * 2      
        //////        
        var text2 = `**${message.author.username} You spent \`${cf.toLocaleString()}\`**, chose **heads** The coin spins ${tail}...`;
          message.channel.send({content: text2}).then(msg => {
            setTimeout(() => {
              msg.edit({content:`**${message.author.username} You spent \`${cf.toLocaleString()}\`**, chose **heads** The coin spins and You lost all ${bobo}`});
            }, 3000);
        });
       
      if(data){
       data.money -= cf 
data.save()}
     }
if(awnser === "WINWIN"){
       
          var mon2 = cf * 2
        var text2 = `**${message.author.username} You spent \`${cf.toLocaleString()}\`**, chose **heads** The coin spins ${tail}...`;
          message.channel.send({content:text2}).then(msg => {
            setTimeout(() => {
              msg.edit( {content:`**${message.author.username} You spent \`${cf.toLocaleString()}\`**, chose **heads** The coin spins  and Win **\`${mon2.toLocaleString()}\`${bobo}**`});
            }, 3000);
          });
    if(data){
      data.money += mon2 
      data.save()
    }
      }}}}
