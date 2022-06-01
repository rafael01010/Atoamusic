const { Message } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "setlang",
  aliases: ["setlang"],
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
      const langages = ["english", "french"]
      const newLanguageName = message.content.split(" ")[1];
      // If no new language is specified, returns an error message
      if(!newLanguageName){
          return message.channel.send(language("MISSING_LANGUAGE"));
      }
      if(!langages.includes(newLanguageName)){
          return message.channel.send(language("LANGUAGE_NO_EXIST"));
      }
      // Update our json database
      guildLanguages[message.guild.id] = newLanguageName;
      fs.writeFileSync("./guilds-language.json", JSON.stringify(guildLanguages), "utf-8");
      // Gets the new language
      const newLanguage = require(`./languages/${newLanguageName}`);
      // Send a success message
      client.embed(message, `Ping :: \`${client.ws.ping}\``);
      message.channel.send(newLanguage("LANGUAGE_UPDATED"));
      client.embed(message,newLanguage("LANGUAGE_UPDATED"));

  },
};
