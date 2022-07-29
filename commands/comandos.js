const fs = require("fs");

module.exports = {
    name: "comandos",
    description: "Lista todos os comandos do bot",
    execute(message, args){
        const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
        let textReturn = [];
        for(const file of commandFiles){
            console.log(file);
        }
    }
}