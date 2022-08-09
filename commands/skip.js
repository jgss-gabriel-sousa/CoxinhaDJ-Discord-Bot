const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: "skip",
    description: "Deixar de tocar musga",
    async execute(message, args){
        try{
            getVoiceConnection(message.guild.id).disconnect();
        }
        catch(error){
            console.log(error);
        }
    }
}