const Discord = require('discord.js');
const { join } = require('path');

module.exports = async function (bot, message, command, isInteraction) {
    if (!command) return;
    if (await require(join(__dirname, 'cooldown'))(bot, message, command, Discord)) return;
   /* else if (await require(join(__dirname, 'OwnerOnly'))(message, command, Discord)) return;
    else if (await require(join(__dirname, 'UserPermissions'))(message, command, Discord)) return;
    else if (await require(join(__dirname, 'ClientPermissions'))(message, command, Discord)) return;
    else if (await require(join(__dirname, 'OnlyChannels'))(message, command, Discord)) return;
   */ //else if (await require(join(__dirname, 'OnlyUsers'))(bot, message, command, Discord)) return;
    if (isInteraction) command.run(client, message, Discord);
}