const { Message } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
const { links } = require("../../../settings/config");
let guildLanguages = require("../../../guilds-language.json");
module.exports = {
  name: "invite",
  aliases: ["inv", "addme"],
  description: `Get My Invite Link For Add me !!`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["EMBED_LINKS"],
  category: "Information",
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
    client.embed(message, language("INVITE", links.inviteURL.replace("BOTID", client.user.id))
    );
  },
};
