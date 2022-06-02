const languageData = {
    PING: (ms) => `**Pong!**\n Latência do bot: ${ms}ms`,
    LANGUAGE_UPDATED: "Linguagem de bot atualizada!",
    MISSING_LANGUAGE: "Você deve especificar um idioma válido! (english,portugues)",
    HELLO: "Ola",
    LANGUAGE_NO_EXIST: "Este idioma não existe!"
};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;
