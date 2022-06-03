const { Message, MessageEmbed, version } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
let os = require("os");
let cpuStat = require("cpu-stat");
let guildLanguages = require("../../../guilds-language.json");


module.exports = {
  name: "stats",
  aliases: ["botinfo"],
  description: `see stats of bot`,
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
    cpuStat.usagePercent(function (err, percent, seconds) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.config.embed.color)
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTitle("__**"+language('Stats')+":**__")
            .addField(
              "⏳ "+language('Memory Usage'),
              `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                2
              )}\` / \`${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``
            )
            .addField(
              "⌚️ "+language('Uptime'),
              `<t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>`
            )
            .addField("📁 "+language('Users'), `\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\``, true)
            .addField("📁 "+language('Servers'), `\`${client.guilds.cache.size}\``, true)
            .addField("📁 "+language('Channels'), `\`${client.channels.cache.size}\``, true)
            .addField("👾 Discord.js", `\`v${version}\``, true)
            .addField("🤖 Node", `\`${process.version}\``, true)
            .addField("🏓 Ping", `\`${client.ws.ping}ms\``, true)
            .addField(
              "🤖 CPU",
              `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``
            )
            .addField("🤖 "+language('CPU usage'), `\`${percent.toFixed(2)}%\``, true)
            .addField("🤖 Arch", `\`${os.arch()}\``, true)
            // .addField("\u200b", `\u200b`)
            .addField("💻 "+language('Platform'), `\`\`${os.platform()}\`\``, true)
            .setFooter(client.getFooter(message.author)),
        ],
      });
    });
  },
};
