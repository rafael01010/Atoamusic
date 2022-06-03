const languageData = {
    PING: (ms) => `**Pong!**\n Bot's latency: ${ms}ms`,
    LANGUAGE_UPDATED: "Bot language updated!",
    MISSING_LANGUAGE: "You must specify a valid language! (english or portuguese)",
    HELLO: "Hello!",
    LANGUAGE_NO_EXIST: "This langage doesn't exist!",
    "Click to Go On HomePage":"Click to Go On HomePage",
    "Click to see my all Category":"Click to see my all Category",
    Home:"Home",
    CLICK: (cat) => `Click to see commands ${cat}`,
    "** An advanced  Music System with Audio Filtering A unique Music Request System and way much more! **":`** An advanced  Music System with Audio Filtering A unique Music Request System and way much more! **`,
    "Stats":"Stats",
    Statsdesc1: (allcmd) =>`>>> ** :gear: \`${allcmd}\` Commands \n`,
    Statsdesc2: (allg) => ` :file_folder: \`${allg}\` Guilds \n `,
    Statsdesc3: (botup) => ` ⌚️ ${botup} Uptime \n`,
    Statsdesc4: (ms) =>`🏓 \`${ms}\` Ping \n  Made by [\` Rafael Soares \`]()**`,
    "Commands":"Commands"
    INVITE: (link) => `[\`Click to Invite Me\`](${link})`
};
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;
