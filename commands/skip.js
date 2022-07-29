const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: "skip",
    description: "Deixar de tocar musga",
    async execute(message, args){
        getVoiceConnection(message.guild.id).disconnect();
    }
}