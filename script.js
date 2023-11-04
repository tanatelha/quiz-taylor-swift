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

botaoBoraLa.addEventListener("click", function () {
  //div inicial some
  paginaInicial.style.opacity = "0";
  

  // Adiciona o conteúdo de pergunta

  // Adiciona o conteúdo dos botões de resposta

  // Deixa a box visível
  boxPergunta.style.opacity = "1";
  botaoBoraLa.remove()
  botaoComecar.remove()

  //3. quando a pessoa apertar na resposta. se certa: verde + aparece resposta. se errada, contorna vermelha + aparece resposta
});
