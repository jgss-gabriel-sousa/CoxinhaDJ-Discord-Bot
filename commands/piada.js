const piadas = [
    "– Chefe, quero um aumento. Saiba o senhor que tem três empresas atrás de mim.\n– Quais?\n||– A de água, a de luz e a de telefone.||",
    "– Quanto é o cafezinho?\n– 2 reais.\n– E o açúcar?\n– O açúcar a gente não cobra.\n||– Então pode me ver 2 quilos, por favor.||",
    "– Esse salgado é de hoje?\n– Não, é de ontem.\n– E como faço pra comer o de hoje?\n||– Volte amanhã!||",
    "Um caipira chega à casa de um amigo que estava vendo TV e pergunta:\n– E aí, firme?\nO outro responde:\n||– Não, futebor!||",
    "A professora:\n– Quem se acha burro fique em pé.\nJoãozinho se levanta:\n– Você se acha burro, Joãozinho?\n||– Não, mas fiquei com dó de ver a senhora em pé sozinha.||",
    "Minha avó começou a andar 5 km por dia quando ela tinha 70 anos.\n||Agora ela está com 85 e não fazemos ideia de onde ela está.||",
    "Joãozinho levou o boleto de pagamento da sua escola para o pai:\n– Meu Deus, mas como é caro estudar nesse seu colégio! – disse o pai.\nJoãozinho respondeu:\n||– E olha que eu sou o que menos estuda na minha turma.||",
    "Qual o lugar mais certo do Brasil?\n||Sertão.||",
    "Qual é o carro movido a suco?\n||Mus-tang.||",
    "Qual a última coisa que um ovo diz para o outro?\n||Estou chocado.||",
    "O que acontece quando chove na Inglaterra?\n||Vira Inglalama||",
    "Estou tão sem grana que até a minha última conversa foi fiada"
]

let lastJoke = -1;

module.exports = {
    name: "piada",
    description: "Piada aleatória",
    execute(message, args){
        let piada;
        let joke;
        while(1){
            joke = Math.floor(Math.random() * (piadas.length - 0) + 0);
            piada = piadas[joke];

            if(lastJoke != joke) break;
        }
        lastJoke = joke;

        message.reply(piada);
    }
}