
     module.exports = {
  name: "maintenance",
  aliases: ["maint"],
  description: "",
  usage: [],
  category: ["owner"],
  enabled: true,
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: true,
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
    
  

     
     if(!args[0]) return message.channel.send('Would you like to enable or disable maintenance mode?')
      
      const maintenance = await Maintenance.findOne({maintenance: 'maintenance'})

      if(args[0].toLowerCase() == "enable"){
      if(maintenance){

      maintenance.toggle = "true"
      await maintenance.save();

      } else {
        const newMain = new Maintenance({
          toggle: "true"
        })
        newMain.save().catch(()=>{})
      }
      await message.channel.send('Enabling maintenance Mode')
      process.exit(1)

      } else if(args[1].toLowerCase() == "disable"){

 if(maintenance){
      maintenance.toggle = "false"
      await maintenance.save();

      } else {
        const newMain = new Maintenance({
          toggle: "false"
        })
        newMain.save().catch(()=>{})
      }
      await message.channel.send({content:'Disabling maintenance Mode'})
      process.exit(1)

      } else {
        message.channel.send({content:'Invalid Response'})
      }}}