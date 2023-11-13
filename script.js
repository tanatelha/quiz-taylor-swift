// Array para armazenar os dados do sorteio
let dadosArmazenados = [];

// Nomear as variáveis gerais
let pergunta = document.querySelector(".titulo-pergunta")
let opcao1 = document.querySelector("#opcao-1")
let opcao2 = document.querySelector("#opcao-2")
let opcao3 = document.querySelector("#opcao-3")
let resultado = document.querySelector(".resultado")
let justificativa = document.querySelector(".texto-justificativa")

let botoesRespostas = document.querySelectorAll(".resposta") // botões de respostas das perguntas

// ----------- Definindo as perguntas em variáveis

const segundaPergunta = dadosArmazenados[1]
const terceiraPergunta = dadosArmazenados[2]
const quartaPergunta = dadosArmazenados[3]
const quintaPergunta = dadosArmazenados[4]


// ----------- função para sortear as linhas do quiz quando a página carrega
async function sorteioPerguntas() {

  // subir os dados em d3
  const dados = await d3.csv("perguntas-quiz.csv")

  // Fazer o sorteio das perguntas
  const numLinhas = dados.length; // calcula a quantidade de linhas da base de dados

  const linhasSorteadas = new Set(); // o Set()  representa uma coleção de valores únicos e não duplicados. No código, 'linhasSorteadas' é usado para rastrear os índices das linhas sorteadas de forma aleatória a partir dos dados do CSV.
  
  const numLinhasASortear = 5;

  // Enquanto a quantidade de linhas selecionadas for menor que o número a sortear...
  while (linhasSorteadas.size < numLinhasASortear) {
    const indiceAleatorio = Math.floor(Math.random() * (numLinhas - 1)) + 1; /// Ignora o cabeçalho
    // O resultado final de indiceAleatorio é um número inteiro aleatório que pode ser usado para acessar uma linha específica nos dados do CSV, excluindo o cabeçalho.

    // O operador ! significa o contrário da condição. Assim, essa linha busca identificar se o Set linhasSorteadas não contém o indiceAleatorio
    if (!linhasSorteadas.has(indiceAleatorio)) {
 
      // se o indiceAleatorio não estiver no set linhasSorteadas, ele é adicionado
      linhasSorteadas.add(indiceAleatorio);
    }
  }


  // Acessar as linhas sorteadas pelos índice
  for (const indice of linhasSorteadas) {
      const linhaSorteada = dados[indice];
      let pergunta = linhaSorteada['pergunta'];
      let opcao_1 = linhaSorteada['opcao_1'];
      let opcao_2 = linhaSorteada['opcao_2'];
      let opcao_3 = linhaSorteada['opcao_3'];
      let resposta_certa = linhaSorteada['resposta_certa'];
      let justificativa = linhaSorteada['justificativa'];

      // Adiciona os dados ao array fora da função
      dadosArmazenados.push({
          indice,
          pergunta,
          opcao_1,
          opcao_2,
          opcao_3,
          resposta_certa,
          justificativa
    });
  };
};



// ----------- Chamar a função para rodar os trem tudo
(async () => {
  await sorteioPerguntas();
  console.log(dadosArmazenados); // Console para verificar se o array foi preenchido corretamente. dadosArmazenados é um array de objetos
})();




// ----------- Funcionalidades do botão 'começar'
let botaoComecar = document.querySelector(".botao-comecar")
let boxRegras = document.querySelector(".box-regras")


botaoComecar.addEventListener("mouseover", function () {
    botaoComecar.style.cursor = "pointer";
    botaoComecar.style.transform = "scale(1.05)";
  });

botaoComecar.addEventListener("mouseout", function () {
  botaoComecar.style.transform = "";
});

botaoComecar.addEventListener('click', function() {
    // obtém a posição original do botão
    let transformacaoOriginal = window.getComputedStyle(botaoComecar).transform;

    // movimenta o botão para baixo quando ele for apertado
    botaoComecar.style.transform = "translateY(5px)";

    // agenda uma função que reverterá a mudança (pra baixo) depois desse intervalo de tempo e fazer o botão voltar para a posição original
    setTimeout(function () {
        botaoComecar.style.transform = transformacaoOriginal;
      }, 300); // 2000 milissegundos (2 segundos)

    // Fazer aparecer a div com as regras do jogo
    boxRegras.style.top = "65%";
    boxRegras.style.opacity = "1";

});





//----------- Funcionalidades do botão 'bora lá' + primeira pergunta
let indicePergunta = 0

let botaoBoraLa = document.getElementById("botao-bora-la");
let paginaInicial = document.querySelector(".fundo");
let boxPergunta = document.querySelector(".box-pergunta");
let boxJustificativa = document.querySelector(".box-justificativa")


botaoBoraLa.addEventListener("mouseover", function () {
  botaoBoraLa.style.cursor = "pointer";
  botaoBoraLa.style.transform = "scale(1.03)";
});

botaoBoraLa.addEventListener("mouseout", function () {
  botaoBoraLa.style.transform = "";
});

botaoBoraLa.addEventListener("click", function () {
  // Div inicial com foto e nome do jogo somem
  paginaInicial.style.opacity = "0";

  // Deixa a box visível
  boxPergunta.style.opacity = "1";
  boxJustificativa.style.opacity = "1";

  // Adiciona o conteúdo de pergunta e o conteúdo dos botões de resposta
  let primeiraPergunta = dadosArmazenados[indicePergunta]
  pergunta.innerHTML = primeiraPergunta.pergunta
  opcao1.innerHTML = primeiraPergunta.opcao_1
  opcao2.innerHTML = primeiraPergunta.opcao_2
  opcao3.innerHTML = primeiraPergunta.opcao_3
  justificativa.innerHTML = primeiraPergunta.justificativa
  console.log(`antes de escolher a resposta, ${indicePergunta}`)

  indicePergunta += 1;
  

  // Torna o botãoBoraLa invisível em vez de removê-lo do DOM
  botaoBoraLa.style.display = "none";
  botaoComecar.style.display = "none";
});




// ---------- Pergunta 2 - botão 'proxima'
let botaoProxima = document.querySelector(".botao-proxima")


// Infos para toque
botaoProxima.addEventListener("mouseover", function () {
  botaoProxima.style.cursor = "pointer";
  botaoProxima.style.transform = "scale(1.03)";
});

botaoProxima.addEventListener("mouseout", function () {
  botaoBoraLa.style.transform = "";
});





// Adiciona o conteúdo de pergunta e o conteúdo dos botões de resposta
botaoProxima.addEventListener("click", function handler() {

  // mudar a estrutura dos botões para amarelo
  botoesRespostas.forEach(function (botao) {
    botao.style.cursor = "pointer";
    botao.style.backgroundColor = "#EFC180";
    botao.style.boxShadow = "0px 0px 10px rgb(239, 193, 128)";
  });

    // volta as perguntas e a justificativa para o centro
    boxPergunta.style.margin = "auto";
    boxPergunta.style.transition = "0.6s ease";
    boxJustificativa.style.top = "10%";
    boxJustificativa.style.transition = "0.6s ease";

    if (indicePergunta < 5) {

      let primeiraPergunta = dadosArmazenados[indicePergunta]
      pergunta.innerHTML = primeiraPergunta.pergunta
      opcao1.innerHTML = primeiraPergunta.opcao_1
      opcao2.innerHTML = primeiraPergunta.opcao_2
      opcao3.innerHTML = primeiraPergunta.opcao_3
      justificativa.innerHTML = primeiraPergunta.justificativa

      // Deixa a box visível
      boxPergunta.style.opacity = "1";
      boxJustificativa.style.opacity = "1";

      indicePergunta += 1;
    };
  });







// ----------- Resultado
let indiceResposta = 0
let resultadoQuiz = 0


// ----------- Botões de resposta   ------- AGORA O PROBLRMA ESTÁ AQUI
// O PROBLEMA É: NÃO ESTÁ BATENDO AS RESPOSTAS COM O BOTÃO CLICADO
botoesRespostas.forEach(function (botao) {

  botao.addEventListener("mouseover", function() {
    botao.style.cursor = "pointer";
    botao.style.transform = "scale(1.05)";
  });

  botao.addEventListener("mouseout", function () {
    botao.style.transform = "";
  });

  botao.addEventListener("click", function(e) {
    console.log(`o botão que eu apertei é ${e.target.id}`) // usar e.target para saber informações sobre um elemento html

    let infoPergunta = dadosArmazenados[indicePergunta - 1];


    let idBotaoClicado = e.target.id // info do botão clicado
    let respostaCerta = infoPergunta.resposta_certa // info com a resposta certa
    console.log(`A resposta é ${respostaCerta}`)

    if (idBotaoClicado === respostaCerta) {
      botao.style.boxShadow = "0px 0px 10px rgb(96, 244, 47)";
      botao.style.backgroundColor = "rgb(96, 244, 47)"
      resultado.innerHTML = "Você acertou!! 🥳"
      resultadoQuiz += 1; // adiciona um no total do quiz
    }

    else {
      botao.style.boxShadow = "0px 0px 10px rgb(244, 47, 47)";
      botao.style.backgroundColor = "rgb(244, 47, 47)";
      resultado.innerHTML = "Você errou!! 😭"
    }

    boxPergunta.style.margin = "-20rem auto 0rem auto";
    boxPergunta.style.transition = "0.6s ease";
    boxJustificativa.style.top = "110%";
    boxJustificativa.style.transition = "0.6s ease";
  });

})






// let respostaCerta = primeiraPergunta.resposta_certa
//resultado.innerHTML = primeiraPergunta.pergunta colocar 'vc errou, vc faz isso'...
//3. quando a pessoa apertar na resposta. se certa: verde + aparece resposta. se errada, contorna vermelha + aparece resposta


// Acessar as linhas sorteadas pelos índices
//for (const indice of linhasSorteadasForaDaFuncao) {
  //const linhaSorteada = dados[indice];
  //let pergunta = linhaSorteada['pergunta']
  //console.log(linhaSorteada);
//}