const bebidas = [
    {
        name: "Pitu",
        alcool: 40
    },
    {
        name: "Cerveja",
        alcool: 5
    },
    {
        name: "Vinho",
        alcool: 14
    },
    {
        name: "Tequila",
        alcool: 27
    },
    {
        name: "Vodka",
        alcool: 40
    },
    {
        name: "Whisky",
        alcool: 54
    },
    {
        name: "Caipirinha",
        alcool: 48
    },
    {
        name: "Gin",
        alcool: 50
    },
    {
        name: "Alcool 70",
        alcool: 70
    },
]

module.exports = {
    name: "shot",
    description: "Shotzin de bebida. Tá com o fígado em dia???",
    execute(message, args){
        const result = Math.floor(Math.random() * (100 - 0) + 0);
        const shots = Math.floor(Math.random() * (5 - 0) + 1);
        const bebida = bebidas[Math.floor(Math.random() * (bebidas.length - 0) + 0)];
        const embriaguez = bebida.alcool * shots;

        if(embriaguez > 100){
            message.reply(`Tomou ${shots} shot de ${bebida.name} e está em coma alcoólico`);
        }
        else if(result >= embriaguez){
            message.reply(`Tomou ${shots} shot de ${bebida.name} e está bêbado`);
        }
        else{
            message.reply(`Tomou ${shots} shot de ${bebida.name} e está sóbrio`);
        }
    }
}