const { Client, Intents, DiscordAPIError, Collection } = require('discord.js');
const { prefix } = require('./config.json');
require('dotenv').config();

const token = process.env.TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 'GUILD_VOICE_STATES'] });

const fs = require("fs");

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const baseCmdsMessage = [
    "comandos",
    "teste",
    "shot",
    "play",
    "skip"
];

client.once("ready", () =>{
    console.log("CoxinhaDJ is online!");
});

client.on("messageCreate", message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    baseCmdsMessage.forEach(element => {
        if(command == element){
            client.commands.get(element).execute(message, args);
        }
    });
});

client.login(token);

// Auto Caller
var http = require("http");
setInterval(function() {
    http.get(process.env.HEROKU_APP);
}, 600000);