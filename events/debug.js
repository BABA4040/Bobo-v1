const { WebhookClient } = require("discord.js");
const logger = require(`${process.cwd()}/util/logger`)
const Discord = require("discord.js")
const data = {
  id: config.webhook.id,
  token: config.webhook.token
};

const webhookClient = new WebhookClient(data);






let number = 1
module.exports = class extends Event {
    async run(info) {
 
let embed;
  const maintenance = await Maintenance.findOne({maintenance: 'maintenance'})

  
  if(info.includes('hit')){


number = ++number

embed = `${info} - ${number}`;
logger.info(info, { label: 'Debug' })


if(number >= 10){
  embed = `${info} - ${number} - SAFE MODE REACHED <@710465231779790849>`;
  console.log('Safe mode reached - Turning maintenance mode on.')
  maintenance.toggle = "true"
  await maintenance.save();
  process.exit(1);
 
}

const lmao = new Discord.MessageEmbed()
.setDescription(embed)
.setColor('RED')


webhookClient.send({embeds:[lmao]})
  }}}
  