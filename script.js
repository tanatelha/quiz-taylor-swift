// Array para armazenar os dados do sorteio
let dadosArmazenados = [];



// Nomear as variáveis gerais
let pergunta = document.querySelector(".titulo-pergunta");
let opcao1 = document.querySelector("#opcao-1");
let opcao2 = document.querySelector("#opcao-2");
let opcao3 = document.querySelector("#opcao-3");
let resultado = document.querySelector(".resultado");
let justificativa = document.querySelector(".texto-justificativa");
let botoesRespostas = document.querySelectorAll(".resposta"); // botões de respostas das perguntas




// ----------- função para sortear as linhas do quiz quando a página carrega
async function sorteioPerguntas() {

  // subir os dados em d3
  const dados = await d3.csv("perguntas-quiz.csv");

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
let botaoComecar = document.querySelector(".botao-comecar");
let boxRegras = document.querySelector(".box-regras");


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
    boxRegras.style.top = "110%";
    boxRegras.style.opacity = "1";
});


// Colocar o timer
let timer; // Variável para armazenar o timer
let tempoRestante = 16; // Tempo inicial do timer

// Para adicionar o tempo na div e aparecer para o usuário
function exibirTempoRestante() {
  document.querySelector(".timer-conteudo-fluido").innerText = `${tempoRestante} seg`;

}


// Função que faz o timer rodar
function iniciarTimer() {
  // A função setInterval é usada para executar uma determinada função em intervalos regulares de tempo
  timer = setInterval(() => {
    if (tempoRestante > 0){
      tempoRestante--; // tira 1 do tempo
      exibirTempoRestante(); // Muda no html o valor de tempo para o usuário
    }
      else {
        // se o tempo acabar e a pessoa não responder, acaba o jogo
        paginaFinal.style.opacity = "1";
        boxPergunta.style.opacity = "0";
        boxJustificativa.style.opacity = "0";
        paginaFinalTitulo.innerHTML = "O tempo acabou..."
        paginaFinalTexto.innerHTML = "E você não terminou de responder a pergunta. Com isso, podemos concluir que você é cambista"
      }
    
  }, 1000); // intervalo para o timer rodar (= 1 segundo)
}

// Reseta o timer para as próximas perguntas
function resetarTimer() {
  clearInterval(timer); // Limpa o timer atual, se existir
  tempoRestante = 15; // Reseta o tempo para 15 segundos
  exibirTempoRestante(); // Atualiza o display do timer
  iniciarTimer(); // Inicia o timer novamente
}



//----------- Funcionalidades do botão 'bora lá' + primeira pergunta
let indicePergunta = 0

let botaoBoraLa = document.getElementById("botao-bora-la");
let paginaInicial = document.querySelector(".fundo");
let boxPergunta = document.querySelector(".box-pergunta");
let boxJustificativa = document.querySelector(".box-justificativa");


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
  paginaInicial.style.pointerEvents = "none"; /*vai impedir qalquer clique nesse elemento*/

  // Torna o botãoBoraLa invisível em vez de removê-lo do DOM
  botaoBoraLa.style.display = "none";
  botaoComecar.style.display = "none";

  // Adiciona o conteúdo de pergunta e o conteúdo dos botões de resposta
  let primeiraPergunta = dadosArmazenados[indicePergunta];
  pergunta.innerHTML = primeiraPergunta.pergunta;
  opcao1.innerHTML = primeiraPergunta.opcao_1;
  opcao2.innerHTML = primeiraPergunta.opcao_2;
  opcao3.innerHTML = primeiraPergunta.opcao_3;
  justificativa.innerHTML = primeiraPergunta.justificativa;

  indicePergunta += 1;
  
  // Deixa a box visível
  boxPergunta.style.opacity = "1";
  
  // Começa a calcular o timer
  iniciarTimer();
});









// ---------- Pergunta 2 - botão 'proxima'
let botaoProxima = document.querySelector(".botao-proxima");
let paginaFinal = document.querySelector(".box-resultado");
let paginaFinalTitulo = document.querySelector(".titulo-resultado");
let paginaFinalTexto = document.querySelector(".texto-resultado");// ----------- Resultado
let elementoImagem = document.querySelector('.imagem-resultado');
let resultadoQuiz = 0





async function resultadoFinal() {
  clearInterval(timer);

  // subir os dados em d3
  const dadosResultado = await d3.csv("resultado-quiz.csv");

  for (let i = 0; i < dadosResultado.length; i++) {
    let linha = dadosResultado[i];
    
    let resultadoAtual = parseInt(linha.resultado); // transformando a string em um number. poderia usar parseFloat(): Esta função é usada para converter uma string em um número decimal
    
    if (resultadoAtual === resultadoQuiz) {
        // Faça algo quando encontrar o resultado desejado
        paginaFinalTitulo.innerHTML = linha.titulo;
        paginaFinalTexto.innerHTML = linha.texto;
        elementoImagem.src = "imagens/" + linha.imagem;

    };
  };
};

resultadoFinal();

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

  // Começa a calcular o timer
  resetarTimer();

  // mudar a estrutura dos botões para amarelo
  botoesRespostas.forEach(function (botao) {
    botao.style.cursor = "pointer";
    botao.style.backgroundColor = "#EFC180";
    botao.style.color = 'black';
    botao.style.boxShadow = "0px 0px 10px rgb(239, 193, 128)";
    botao.style.pointerEvents = '';
  });

    // volta as perguntas e a justificativa para o centro
    boxPergunta.style.margin = "auto";
    boxPergunta.style.transition = "0.6s ease";
    boxJustificativa.style.top = "10%";
    boxJustificativa.style.transition = "0.6s ease";

    if (indicePergunta < 5) {

      let primeiraPergunta = dadosArmazenados[indicePergunta];
      pergunta.innerHTML = primeiraPergunta.pergunta;
      opcao1.innerHTML = primeiraPergunta.opcao_1;
      opcao2.innerHTML = primeiraPergunta.opcao_2;
      opcao3.innerHTML = primeiraPergunta.opcao_3;
      justificativa.innerHTML = primeiraPergunta.justificativa;

      // Deixa a box visível
      boxPergunta.style.opacity = "1";
      boxJustificativa.style.opacity = "1";

      indicePergunta += 1;
    }
    
    else {
      paginaFinal.style.opacity = "1";
      boxPergunta.style.opacity = "0";
      boxJustificativa.style.opacity = "0";
      resultadoFinal();
    }; 
  });










// ----------- Botões de resposta
botoesRespostas.forEach(function (botao) {

  botao.addEventListener("mouseover", function() {
    botao.style.cursor = "pointer";
    botao.style.transform = "scale(1.05)";
  });

  botao.addEventListener("mouseout", function () {
    botao.style.transform = "";
  });

  botao.addEventListener("click", function(e) {

    // Parar o timer: clearInterval(timer) é utilizado para interromper o funcionamento do timer que foi previamente iniciado usando setInterval()
    clearInterval(timer);
    
    // Impeço que outras respostas sejam clicadas
    let idBotaoClicado = e.target.id; // info do botão clicado

    botoesRespostas.forEach(function(outroBotao) {
      if (outroBotao.id !== idBotaoClicado) {
        outroBotao.style.backgroundColor = '#C8C8C8';
        outroBotao.style.color = '#808080';
        outroBotao.style.pointerEvents = 'none';
        outroBotao.style.boxShadow = "";
      }
    });
  

    // Deixa o boz justificativa visível, mas ainda escondido atrás da pergunta
    boxJustificativa.style.opacity = "1";

    // usar e.target para saber informações sobre um elemento html
    //console.log(`o botão que eu apertei é ${e.target.id}`)

    let infoPergunta = dadosArmazenados[indicePergunta - 1];
    let respostaCerta = infoPergunta.resposta_certa; // info com a resposta certa

    if (idBotaoClicado === respostaCerta) {
      botao.style.boxShadow = "0px 0px 10px rgb(96, 244, 47)";
      botao.style.backgroundColor = "rgb(96, 244, 47)";
      resultado.innerHTML = "Você acertou!! 🥳";
      resultadoQuiz += 1; // adiciona um no total do quiz
    }

    else {
      botao.style.boxShadow = "0px 0px 10px rgb(244, 47, 47)";
      botao.style.backgroundColor = "rgb(244, 47, 47)";;
      resultado.innerHTML = "Você errou!! 😭";
    }


    boxPergunta.style.margin = "-20rem auto 0rem auto";
    boxPergunta.style.transition = "0.6s ease";
    boxJustificativa.style.top = "110%";
    boxJustificativa.style.transition = "0.6s ease";
  });
});


// ----------- Se a pessoa sair da página...
// cada uma dessas versões do documento.algo serve para um navegador. Seu valor é true quando a página está oculta (por exemplo, quando o usuário muda para outra aba ou minimiza a janela do navegador) e false quando a página está visível.
// Em resumo, esse trecho de código faz uma verificação para determinar a capacidade do navegador de utilizar a propriedade document.hidden e o evento visibilitychange. Se suportado, ele define variáveis para usar essas funcionalidades posteriormente no código, caso contrário, ele tenta verificar outras propriedades equivalentes para suportar diferentes navegadores e versões.

var hidden, visibilityChange;
// para navegadores mais modernos

if (typeof document.hidden !== "undefined") {
  // Se for definido como "undefined", isso indica que o navegador suporta essa funcionalidade hidden
    hidden = "hidden";
    visibilityChange = "visibilitychange";

// para Mozilla
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";

// para Internet Explorer (IE) da Microsoft.
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";

// para navegadores que usam o motor WebKit, como o Safari
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

// Adiciona um ouvinte de eventos à mudança de visibilidade (visibilityChange), e quando essa mudança ocorre, esse event chama a função acao() e roda o código dentro dela
document.addEventListener(visibilityChange, acao, false);
function acao() {
  // parar o tempo
  clearInterval(timer)

  // faz desaparecer tudo que tem na página
  paginaInicial.style.display = "none";
  botaoComecar.style.display = "none";
  botaoBoraLa.style.display = "none";
  boxRegras.style.display = "none";
  boxPergunta.style.display = "none";
  boxJustificativa.style.display = "none";
  botaoProxima.style.display = "none";

  // aparece boz de resultado
  paginaFinal.style.opacity = "1";
  paginaFinalTitulo.innerHTML = "SAIU DA PÁGINA? FAKE SWIFTER";
  paginaFinalTexto.innerHTML = "Você infringiu a regra do jogo. Por isso, foi classificado como <span class='negrito'>cambista</span>";
  elementoImagem.src = "imagens/imagem_youre_cambista.png";
}


// script















// let respostaCerta = primeiraPergunta.resposta_certa
//resultado.innerHTML = primeiraPergunta.pergunta colocar 'vc errou, vc faz isso'...
//3. quando a pessoa apertar na resposta. se certa: verde + aparece resposta. se errada, contorna vermelha + aparece resposta


// Acessar as linhas sorteadas pelos índices
//for (const indice of linhasSorteadasForaDaFuncao) {
  //const linhaSorteada = dados[indice];
  //let pergunta = linhaSorteada['pergunta']
  //console.log(linhaSorteada);
//}