module.exports = {
    name: "play",
    description: "Tocar musga",
    async execute(message, args){
        const fs=require("fs");
        const mp3=require("youtube-mp3-downloader");
        const ffmpeg=require("ffmpeg-static");
        const yd=new mp3({
            ffmpegPath:ffmpeg,
            outputPath:"./",
            youtubeVideoQuality:"highestaudio"
        });
        const {
            AudioPlayerStatus,
            StreamType,
            createAudioPlayer,
            createAudioResource,
            joinVoiceChannel,
            getVoiceConnection,
        } = require('@discordjs/voice');

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

        const ytSearch = require("yt-search");

        const videoFinder = async(query) => {
            const videoResult = await ytSearch(query);

            console.log(`${videoResult.videos[0].title}`);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(" "));
        let url = video.url;
        url = url.substring(url.indexOf('=') + 1);

        message.reply(`Música Encontrada: ***${video.title}***`);

        yd.download(url, "song.mp3");

        yd.on("error", function(error){
            message.channel.send("Erro");
            return;
        });

        const player = createAudioPlayer();
        connection.subscribe(player);

        yd.on("finished", function(err, data){
            const audioResource = createAudioResource("./song.mp3");
            player.play(audioResource, {seek: 0, volume: 1});
        });
    }
}