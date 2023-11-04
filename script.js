//botão 'começar'
let botaoComecar = document.querySelector(".botao-comecar")

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
});