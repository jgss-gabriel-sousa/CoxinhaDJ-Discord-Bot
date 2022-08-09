module.exports = {
    name: "comandos",
    description: "Lista todos os comandos do bot",
    execute(message, args){
        message.channel.send();
        response = "Comandos:\n";

        for(const cmd of args){
            response += "!"+cmd+"\n";
        }

        message.reply(response);
    }
}