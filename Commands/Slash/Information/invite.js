const { CommandInteraction } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
const { links } = require("../../../settings/config");
let guildLanguages = require("../../../guilds-language.json");

module.exports = {
  name: "invite",
  description: `Get My Invite Link to add me`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["EMBED_LINKS"],
  category: "Information",
  cooldown: 5,
  type: "CHAT_INPUT",
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,

  /**
   *
   * @param {JUGNU} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    const guildLanguage = guildLanguages[interaction.guild.id] || "english"; // "english" will be the default language
    const language = require(`../../../languages/${guildLanguage}`);
    client.embed(interaction, language("INVITE", links.inviteURL.replace("BOTID", client.user.id)));
  },
};
