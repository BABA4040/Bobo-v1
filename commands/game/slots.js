const Discord = require("discord.js")
const slot = ["<a:slot:896774794706571365>"]
const cash = "<:Bobocash:897148836567457862>"
const { Color } = require("../../config.js")
module.exports = {
  name: "slots",
  aliases: ["slots","s"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 8000,
  run: async (bot, message, args, dev) => {
 
    let user = await User.findOne({userID: message.author.id})
    
    let amount = args[1]  ||1
  let money = user.money
  
      
  //== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
if(amount > 50000) return message.channel.send({content:`❎ **${message.author.username}**, You Can't More Than __50,000__ **amount!**`})
  
  /////////////
if(amount > money) return message.channel.send({content: `❎ You don't have enough money to start`})
  /////////////////
  
        
 let br = amount * 2
  let slots = ["<:heart:896938168681627658>","<:heart:896938168681627658>","<:heart:896938168681627658>","<:gelas:896938056840515664>","<:bainjan:896937982160949329>","<:bainjan:896937982160949329>"]
////["🍇","🍒","🍒","🍇"];
  //
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  let result1 = Math.floor((Math.random() * slots.length));
  let result2 = Math.floor((Math.random() * slots.length));
  let result3 = Math.floor((Math.random() * slots.length));

  //
  let ust1 = Math.floor((Math.random() * slots.length));
  let ust2 = Math.floor((Math.random() * slots.length));
  let ust3 = Math.floor((Math.random() * slots.length));

  //
  let alt1 = Math.floor((Math.random() * slots.length));
  let alt2 = Math.floor((Math.random() * slots.length));
  let alt3 = Math.floor((Math.random() * slots.length));
if(Number(args[1])){
  
  if (slots[result1] === slots[result2] && slots[result2] === slots[result3] ) {
    var text2 = `
   \`___SLOTS___\`
| ${slot} | ${slot} | ${slot} | **${message.author.username}**,
The slots is spins to win or losse you...
\`|           |\`
\`|           |\``;
          message.channel.send({content: text2}).then(msg => {
            setTimeout(() => {
              msg.edit({content:`
    \`___SLOTS___\`
| ${slots[result1]} | ${slots[result2]} | ${slots[result3]} | **${message.author.username}**,
\`|           |\` You win __\`${br.toLocaleString()}\` ${cash}__
\`|           |\`
\`|           |\``},true);
            }, 3500);
          });

    user.money += br
     user.save()
  } else {
    var text3 = `
    \`___SLOTS___\`
| ${slot} | ${slot} | ${slot} | **${message.author.username}**,
The slots is spins to win or losse you...
\`|           |\`
\`|           |\``;
         message.channel.send({content: text3 }).then(msg => {
            setTimeout(() => {
              msg.edit({content:`
    \`___SLOTS___\`
| ${slots[result1]} | ${slots[result2]} | ${slots[result3]} | **${message.author.username}**,
\`|           |\` You lost __\`${amount.toLocaleString()}\`${cash}__
\`|           |\`
\`|           |\``}, true);
            }, 3500);
          });
 user.money -= amount
 user.save()

  }}
    
    
    const mont = 50000
    const m = mont *2
  if(args[1]==="all"){
  if (slots[result1] === slots[result2] && slots[result2] === slots[result3] ) {
    var text2 = `
   \`___SLOTS___\`
| ${slot} | ${slot} | ${slot} | **${message.author.username}**,
The slots is spins to win or losse you...
\`|           |\`
\`|           |\``;
          message.channel.send({content: text2}).then(msg => {
            setTimeout(() => {
              msg.edit({content:`
    \`___SLOTS___\`
| ${slots[result1]} | ${slots[result2]} | ${slots[result3]} | **${message.author.username}**,
\`|           |\` You win __\`${m.toLocaleString()}\` ${cash}__
\`|           |\`
\`|           |\``},true);
            }, 3500);
          });

    user.money += m
     user.save()
  } else {
    var text3 = `
    \`___SLOTS___\`
| ${slot} | ${slot} | ${slot} | **${message.author.username}**,
The slots is spins to win or losse you...
\`|           |\`
\`|           |\``;
         message.channel.send({content: text3 }).then(msg => {
            setTimeout(() => {
              msg.edit({content:`
    \`___SLOTS___\`
| ${slots[result1]} | ${slots[result2]} | ${slots[result3]} | **${message.author.username}**,
\`|           |\` You lost __\`${mont.toLocaleString()}\`${cash}__
\`|           |\`
\`|           |\``}, true);
            }, 3500);
          });
 user.money -= mont
 user.save()

  }}
    
    
    
    
    
    
    
    
    
    
}
  
}
