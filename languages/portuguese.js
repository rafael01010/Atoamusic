const languageData = {
    PING: (ms) => `**Pong!**\n Latência do bot: ${ms}ms`,
    LANGUAGE_UPDATED: "Linguagem de bot atualizada!",
    MISSING_LANGUAGE: "Você deve especificar um idioma válido! (english,portuguese)",
    HELLO: "Ola",
    LANGUAGE_NO_EXIST: "Este idioma não existe!",
    "Click to see my all Category":"Clique para ver todas as minhas Categorias",
    Home:"Inicio",
    "Click to Go On HomePage":"Clique para ir para a página inicial",
    CLICK: (cat) => `Clique para ver os comandos de ${cat}`,
    "** An advanced  Music System with Audio Filtering A unique Music Request System and way much more! **":`** Um sistema de música avançado com filtragem de áudio Um sistema de solicitação de música exclusivo e muito mais! **`,
    "Stats":"Estatísticas",
    Statsdesc1: (allcmd) =>`>>> ** :gear: \`${allcmd}\` Comandos \n`,
    Statsdesc2: (allg) => ` :file_folder: Presente em \`${allg}\` Servidores \n `,
    Statsdesc3: (botup) => ` ⌚️ ${botup} Tempo de atividade \n`,
    Statsdesc4: (ms) =>`🏓 \`${ms}\` Ping \n  Feito por [\` Rafael Soares \`]()**`,
    "Commands":"Comandos",
    INVITE: (link) => `[\`Clique para me convidar\`](${link})`,
    "Users":"Utilizadores",
    "Servers":"Servidores",
    "Channels":"Canais",
    "CPU usage":"Utilização da CPU",
    "Platform":"Plataforma",
    "Memory Usage":"Uso de memória Ram",
    "Uptime":"Tempo Ativo ",
    "Play":"reproduzir"
};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;
