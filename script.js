//botão 'começar'
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
    let transformacaoOriginal = window.getComputedStyle(botaoComecar).transform; // Obtém a transformação original

    // movimenta o botão para baixo quando ele for apertado
    botaoComecar.style.transform = "translateY(5px)";

    // agenda uma função que reverterá as mudanças (pra baixo) depois desse intervalo de tempo
    setTimeout(function () {
        botaoComecar.style.transform = transformacaoOriginal;
      }, 300); // 2000 milissegundos (2 segundos)

    // Fazer aparecer a div com as regras do jogo
    boxRegras.style.top = "65%"
    boxRegras.style.opacity = "1"
});


//botão 'bora lá'
let botaoBoraLa = document.querySelector(".botao-bora-la");
let paginaInicial = document.querySelector(".fundo");
let boxPergunta = document.querySelector(".box-pergunta");

botaoBoraLa.addEventListener("mouseover", function () {
  botaoBoraLa.style.cursor = "pointer";
  botaoBoraLa.style.transform = "scale(1.03)";
});

botaoBoraLa.addEventListener("mouseout", function () {
  botaoBoraLa.style.transform = "";
});


// função para gerar as perguntas do quiz
async function iniciar() {
  const dados = await d3.csv("perguntas-quiz.csv")

  // Fazer o sorteio das perguntas
  const numLinhas = dados.length; // calcula o tamanho de linhas da base de dados

  const linhasSorteadas = new Set(); // o Set()  representa uma coleção de valores únicos e não duplicados.No código, 'linhasSorteadas' é usado para rastrear os índices das linhas sorteadas de forma aleatória a partir dos dados do CSV.
  
  const numLinhasASortear = 5;

  // Enquanto a quantidade de linhas selecionadas for menor que o número a sortear...
  while (linhasSorteadas.size < numLinhasASortear) {
    const indiceAleatorio = Math.floor(Math.random() * (numLinhas - 1)) + 1; /// Ignora o cabeçalho
    // O resultado final de indiceAleatorio é um número inteiro aleatório que pode ser usado para acessar uma linha específica nos dados do CSV, excluindo o cabeçalho.

    // O operador ! significa o contrário da conição. Assim, essa linha busca identificar se o Set linhasSorteadas não contém o indiceAleatorio
    if (!linhasSorteadas.has(indiceAleatorio)) {
      linhasSorteadas.add(indiceAleatorio);
    }
  }

  // Agora, você pode acessar as linhas sorteadas pelos índices
  for (const indice of linhasSorteadas) {
    const linhaSorteada = dados[indice];
    console
    // Faça o que você precisa com essas linhas aqui.
  }  
}


botaoBoraLa.addEventListener("click", function () {
  // div inicial some
  paginaInicial.style.opacity = "0";

  // Adiciona o conteúdo de pergunta e o conteúdo dos botões de resposta
  iniciar()

  // Deixa a box visível
  boxPergunta.style.opacity = "1";
  botaoBoraLa.remove()
  botaoComecar.remove()

  //3. quando a pessoa apertar na resposta. se certa: verde + aparece resposta. se errada, contorna vermelha + aparece resposta
});
