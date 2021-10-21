document.addEventListener('DOMContentLoaded',function(){
    // Array com os textos que devem aparecer
    var dataText = [ "Bem vindo(a) ao Quiz de Animes 🎮.", "Acerte todas as perguntas.", "Tente ficar em 1ª lugar.", "Obrigado pela visita 😄."];
    
    function typeWriter(text, i, fnCallback) {
      // Verificando se o texto terminou
      if (i < (text.length)) {
        // Adicionando o próximo texto ao h1
       document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // Esperando por um tempo para o proximo texto
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      // Quando acabar os textos, chamando a função novamente
      else if (typeof fnCallback == 'function') {
        // Chamando o retorno depois de um tempo
        setTimeout(fnCallback, 700);
      }
    }
    // Iniciando animação de máquina de escrever para o texto
     function StartTextAnimation(i) {
       if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 5000);
       }
       // Verificando se a variavel dataText existe
      if (i < dataText[i].length) {
        // Se existir, iniciar animação
       typeWriter(dataText[i], 0, function(){
         // Após o retorno da chamada e o texto ser animado por completo
         // Iniciasse o próximo texto
         StartTextAnimation(i + 1);
       });
      }
    }
    // Iniciando animação do texto
    StartTextAnimation(0);
});

var nameSaved = localStorage.getItem("playerName");

if(nameSaved == null){
  var player = prompt("Hey, antes de continuar, pf informe seu nome: ");

  if(player != null){
    alert(`Obrigado ${player}. Seja muito bem vindo(a)`);
    localStorage.setItem("playerName", player);
  }
  else{
    alert("Obrigado desconhecido, veja as regras do jogo");
  }
}
else{
  player = prompt(`Você é o(a) ${nameSaved}? 🤔 (S ou N)`);

  if(player == "S" || player == "Sim" || player == "s" || player == "sim"){
    alert(`Bem vindo de volta ${nameSaved}`);
  }
  else if(player == "N" || player == "Nao" || player == "n" || player == "nao"){
    player = prompt("Opa, olá tudo bem?, pf informe seu nome: ");

    if(player != null){
      alert(`Bem vindo ${player}, conheça as regras do jogo`);
      localStorage.setItem("playerName", player);
    }
    else{
      alert("Bem vindo desconhecido, conheça as regras do jogo");
    }
  }
  else{
    alert("Nome não informado 😑")
  }
}