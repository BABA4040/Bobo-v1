//onst { Listener } = require('discord-akairo');
module.exports = class {
  
    async run(invite,bot) {
        let invites = await bot.guild.invents.fetch();
        if(invite.guild.vanityURLCode) invites.set(invite.guild.vanityURLCode, await invite.guild.fetchVanityData());
        bot.guild.invites.set(invite.guild.id, invites);
    };
};