const { Message } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
const fs = require('file-system');
let guildLanguages = require("../../../guilds-language.json");

module.exports = {
  name: "setlang",
  aliases: ["lang"],
  description: `set language`,
  userPermissions: ["MANAGE_GUILD"],
  botPermissions: ["EMBED_LINKS"],
  category: "Settings",
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,

  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
  run: async (client, message, args, prefix, queue) => {
    // Code
    const guildLanguage = guildLanguages[message.guild.id] || "english"; // "english" will be the default language
    const language = require(`../../../languages/${guildLanguage}`);
    const langages = ["english", "portuguese"]
    let nPrefix = args[0];
    const newLanguageName = nPrefix;

    // If no new language is specified, returns an error message
    if (!newLanguageName) {
      return   client.embed(message, language("MISSING_LANGUAGE"));
    }
    if (!langages.includes(newLanguageName)) {
      return client.embed(message, language("LANGUAGE_NO_EXIST"));
    }

    // Update our json database
      guildLanguages[message.guild.id] = newLanguageName;
      fs.writeFileSync("./guilds-language.json", JSON.stringify(guildLanguages));
/*, "utf-8"*/
    // Gets the new language
     const newLanguage = require(`../../../languages/${newLanguageName}`);

    // Send a success message
    client.embed(message,newLanguage("LANGUAGE_UPDATED"));
  
  },
};
