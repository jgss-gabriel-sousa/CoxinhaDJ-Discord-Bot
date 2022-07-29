module.exports = {
    name: "shot",
    description: "Shotzin de bebida. Tá com o fígado em dia???",
    execute(message, args){
        const result = Math.random() * (100 - 0) + 0;

        if(result >= 70){
            message.channel.send("Ficou bêbado");
        }
        else{
            message.channel.send("Está sóbrio");
        }
    }
}