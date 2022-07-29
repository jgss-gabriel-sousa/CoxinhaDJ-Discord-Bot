const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	getVoiceConnection,
} = require('@discordjs/voice');

module.exports = {
    name: "play",
    description: "Tocar musga",
    async execute(message, args){

        try {
            const voiceChannel = message.member.voice.channel;

            if(!voiceChannel) return message.channel.send("Você precisa estar conectado a um canal de voz");
            
            const userPermissions = voiceChannel.permissionsFor(message.client.user);
            if(!userPermissions.has("CONNECT") || !userPermissions.has("SPEAK"))
                return message.channel.send("Você não tem as permissões necessárias");

            if(!args.length) return message.channel.send("Sim aí vc nn disse qual a musga pra eu tocar né meu parceiro...");

            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const videoFinder = async(query) => {
                const videoResult = await ytSearch(query);

                console.log(`${videoResult.videos[0].title}`);

                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(args.join(" "));
            
            const player = createAudioPlayer();


            if(video){
                const stream = ytdl(video.url, {filter: "audioonly"});
            
                const audioResource = createAudioResource(stream, {inlineVolume : true});
                connection.subscribe(player);

                player.play(audioResource, {seek: 0, volume: 1});

                play.on("error", () => {
                    console.error("error", error);
                });

                await message.reply(`Tocando: ***${video.title}***`);
            }
            else{
                message.channel.send("O video não foi encontrado");
            }
        }
        catch(e){
            console.log(e);
        }
    }
}