const { Client, Intents, DiscordAPIError, Collection } = require('discord.js');
const { prefix } = require('./config.json');
require('dotenv').config();
const fs = require("fs");

const token = process.env.TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 'GUILD_VOICE_STATES'] });

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
const commands = [];

const playingSong = false;

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    commands.push(file.substring(0, file.indexOf(".")));
}

client.once("ready", () => {
    console.log("CoxinhaDJ is online!");
    console.log(client.commands);
});

client.on("messageCreate", message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    commands.forEach(element => {
        if(command == element){
            console.log(command);
            if(command == "comandos")
                client.commands.get(element).execute(message, commands);
            else
                client.commands.get(element).execute(message, args);
        }
    });
});

client.login(token);