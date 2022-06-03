const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
let guildLanguages = require("../../../guilds-language.json");

module.exports = {
  name: "help",
  description: `need help ? see my all commands`,
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
      const emoji = {
        Information: "🔰",
        Music: "🎵",
        Settings: "⚙️",
      };
  
      let allcommands = client.commands.size;
      let allguilds = client.guilds.cache.size;
      let botuptime = `<t:${Math.floor(
        Date.now() / 1000 - client.uptime / 1000
      )}:R>`;
  
      let raw = new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder(language("Click to see my all Category"))
          .addOptions([
            {
              label: language("Home"),
              value: "home",
              emoji: `🏘️`,
              description: language(`Click to Go On HomePage`),
            },
            client.scategories.map((cat) => {
              return {
                label: `${cat.toLocaleUpperCase()}`,
                value: cat,
                emoji: emoji[cat],
                description: language("CLICK", cat),
              };
            }),
          ]),
      ]);
  
      let help_embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor({
          name: client.user.tag,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(
          language("** An advanced  Music System with Audio Filtering A unique Music Request System and way much more! **")
        )
        .addField(
          language(`Stats`),
          //text desc
          language(`Statsdesc1`, allcommands) + language(`Statsdesc2`, allguilds) + language(`Statsdesc3`, botuptime) + language(`Statsdesc4`, client.ws.ping),
        )
        .setFooter(client.getFooter(interaction.user));
  
      let main_msg = await interaction.followUp({
        embeds: [help_embed],
        components: [raw],
      });
  
      let filter = (i) => i.user.id === interaction.user.id;
      let colector = await main_msg.createMessageComponentCollector({
        filter: filter,
        time: 20000,
      });
      colector.on("collect", async (i) => {
        if (i.isSelectMenu()) {
          await i.deferUpdate().catch((e) => {});
          if (i.customId === "help-menu") {
            let [directory] = i.values;
            if (directory == "home") {
              main_msg.edit({ embeds: [help_embed] }).catch((e) => {});
            } else {
              main_msg
                .edit({
                  embeds: [
                    new MessageEmbed()
                      .setColor(client.config.embed.color)
                      .setTitle(
                        `${emoji[directory]} ${directory} `+language("Commands")+` ${emoji[directory]}`
                      )
                      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                      .setDescription(
                        `>>> ${client.commands
                          .filter((cmd) => cmd.category === directory)
                          .map((cmd) => {
                            return `\`${cmd.name}\``;
                          })
                          .join(" ' ")}`
                      )
                      .setFooter(client.getFooter(interaction.user)),
                  ],
                })
                .catch((e) => null);
            }
          }
        }
      });
  
      colector.on("end", async (c, i) => {
        raw.components.forEach((c) => c.setDisabled(true));
        main_msg.edit({ components: [raw] }).catch((e) => {});
      });
  },
};
