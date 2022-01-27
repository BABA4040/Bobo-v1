const Discord = require("discord.js");

const fs = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load Status");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const rest = new REST({ version: "9" }).setToken(config.token);
const guild = "850129663896190996";
module.exports = async (bot) => {
  //////resting slash command
  const commands = [];
(async()=>{
  try {
    console.log("Started refreshing application (/) commands.");

    if (!guild) {
      await rest.put(Routes.applicationCommands(config.clientID), {
        body: commands,
      });
      console.log("Successfully registered application commands globally");
    } else {
      await rest.put(Routes.applicationGuildCommands(config.clientID, guild), {
        body: commands,
      });
      console.log(
        "Successfully registered application commands for development guild"
      );

      console.log("Successfully reloaded application (/) commands.");
    }
  } catch (error) {
    console.log(error);
  }})

  fs.readdirSync("./C-slash/").forEach((dir) => {
    const commandFiles = fs
      .readdirSync(`./C-slash/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../C-slash/${dir}/${file}`);
      // console.log(command.data.name);
      commands.push(command.data);
      bot.slash.set(command.data.name, command);
      table.addRow(file, "👍");
      console.log(table.toString());
    }
  });
};
