// Menu
const menuSection = document.querySelector(".menu-section")
const menuToggle = document.querySelectorAll(".menu-toggle")

for(const element of menuToggle){
    element.addEventListener("click", () => {
        menuSection.classList.toggle("on")
    })
}

//Removendo o menu ao clicar em um dos links
const links = document.querySelectorAll("nav ul li a")

for(const link of links){
    link.addEventListener("click", () => {
        menuSection.classList.remove("on")
    })
}

// Variaveis de modal e seu conteudo e informações do localStorage
const modal = document.getElementById("modal");
const content = document.getElementById("modal-content");
const answerElements = document.querySelectorAll(".answer");
const video = document.getElementById("video");
const buttonAnswer = document.createElement("button");
const questions = document.getElementById("question");
const input0 = document.getElementById("input0");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const label0 = document.getElementById("label0");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
const label3 = document.getElementById("label3");
var users = document.getElementsByClassName("user");
var point = document.getElementsByClassName("point");
var newRecord = [];
var playerName = localStorage.getItem("playerName");
var dataSaved = localStorage.getItem("record");
var currentScore = 0;

//Adicionando os videos e as perguntas
const cards = [
    {
        banner: "./video/BlackClover.mp4",
        question: "Qual o nome do Rei Mago do reino de Clover?",
        alter: ["Augustus Kira Clover XIII", "Julius Novachrono", "Lemiel Silvamillion Clover", "William Vangeance"],
        correct: 1,
        points: 10,
        done: false
    },
    {
        banner: "./video/Bleach.mp4",
        question: "Qual o nome do pai do Protagonista?",
        alter: ["Isshin Kurosaki", "Urahara Kisuke", "Chōjirō Sasakibe", "Masaki Kurosaki"],
        correct: 0,
        points: 10,
        done: false,
    },
    {
        banner: "./video/BokuNoHero.mp4",
        question: "Quanto de poder do One for All Midoriya consegue suportar atualmente?",
        alter: ["15%", "20%", "70%", "100%"],
        correct: 1,
        points: 10,
        done: false,
    },
    {
        banner: "./video/DeathNote.mp4",
        question: "Qual dessas regras sobre o Death Note é FALSA?",
        alter: ["Após este caderno tocar no solo, ele passa a ser propriedade do mundo humano.", "O humano que utilizar o caderno irá para o Vazio", "Só podem existir 6 Death Notes simultaneamente no mundo humano.", "Um Shinigami pode ser morto por um humano."],
        correct: 3,
        points: 10,
        done: false,
    },
    {
        banner: "./video/DrStone.mp4",
        question: "Qual é o nome do protagonista?",
        alter: ["Senku Ishigami", "Tsukasa Shishio", "Chrome", "Kaseki"],
        correct: 0,
        points: 10,
        done: false,
    },
    {
        banner: "./video/GokuVsKefla.mp4",
        question: "Qual guerreiro do universo 7 foi o 4ª eliminado no Torneio do Poder?",
        alter: ["Mestre Kame", "Nº18", "Piccolo", "Kuririn"],
        correct: 2,
        points: 10,
        done: false,
    },
    {
        banner: "./video/JujutsuKaisen.mp4",
        question: "Qual o nome da maldição que Yuji Itadori engole?",
        alter: ["Mahito", "Sukuna", "Nanami", "Fushiguro"],
        correct: 1,
        points: 10,
        done: false,
    },
    {
        banner: "./video/Madara.mp4",
        question: "Quem é conhecido como Sábio dos Seis Caminhos?",
        alter: ["Indra Otsutsuki", "Ashura Otsutsuki", "Hagoromo Otsutsuki", "Kaguya Otsutsuki"],
        correct: 2,
        points: 10,
        done: false,
    },
    {
        banner: "./video/OnePiece.mp4",
        question: "Qual o nome da fruta que Luffy comeu?",
        alter: ["Gomu Gomu no Mi", "Gura Gura no Mi", "Ope Ope no Mi", "Bomu Bomu no Mi"],
        correct: 0,
        points: 10,
        done: false,
    },
    {
        banner: "./video/SaitamaVsBoros.mp4",
        question: "Qual a classificação do Saitama na Associação de Heróis? (Segunda Temporada)",
        alter: ["A-39", "A-10", "B-7", "B-1"],
        correct: 2,
        points: 10,
        done: false,
    },
    {
        banner: "./video/ShingekinoKyojin.mp4",
        question: "Quanto tempo de vida tem um portador de Titan?",
        alter: ["12 anos", "13 anos", "14 anos", "15 anos", ],
        correct: 1,
        points: 10,
        done: false,
    },
    {
        banner: "./video/DemonSlayer.mp4",
        question: "Qual a cor da espada do Tangiro?",
        alter: ["Azul", "Vermelho", "Cinza", "Preto"],
        correct: 3,
        points: 10,
        done: false
    }
];

//Removendo as opções marcadas nas perguntas seguintes
const deselectAnswers = () => {  
    answerElements.forEach((answer) => (answer.checked = false));  
};

// Função das perguntas atribuindo os videos e os botões
function questionsFunction(n){
    video.setAttribute("src", cards[n].banner);
    video.classList.add("video");
    video.style.width = "100%";
    video.style.height = "40rem";

    buttonAnswer.classList.add("btn-answer");
    buttonAnswer.innerHTML = "Responder";
    buttonAnswer.setAttribute("onclick", `answerQuestion(${n})`);

    content.appendChild(video);
    content.appendChild(buttonAnswer);

    questions.innerText = cards[n].question;
    label0.innerText = cards[n].alter[0];
    label1.innerText = cards[n].alter[1];
    label2.innerText = cards[n].alter[2];
    label3.innerText = cards[n].alter[3];

    modal.style.display = "block";
    deselectAnswers();
}

// Função de fechar o Modal
function closeModal(){
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Verficiando se a resposta marcada esta correta
function answerQuestion(n){
    if(cards[n].done === false){
        if(input0.checked){
            currentScore = input0.value == cards[n].correct ? currentScore + 10 : currentScore + 0;
        }
        else if(input1.checked){
            currentScore = input1.value == cards[n].correct ? currentScore + 10 : currentScore + 0;
        }
        else if(input2.checked){
            currentScore = input2.value == cards[n].correct ? currentScore + 10 : currentScore + 0;
        }
        else if(input3.checked){
            currentScore = input3.value == cards[n].correct ? currentScore + 10 : currentScore + 0;
        }
        cards[n].done = true;
    }
    else{
        alert(`Hey ${playerName}, você já respondeu essa pergunta 👌.`);
    }

    closeModal()
}

// Salvando a pontuação no localStorage
function saveScore(){
    alert(`Parabéns ${playerName}, sua pontuação foi de ${currentScore}.`);

    let raking = {
        userName: playerName,
        record: currentScore
    }

    if(dataSaved == null){
        newRecord.push(raking);
        localStorage.setItem("record", JSON.stringify(newRecord));
    }

    else{
        newRecord = JSON.parse(dataSaved);
        newRecord.push(raking);

        localStorage.setItem("record", JSON.stringify(newRecord));
    }

    dataSaved = localStorage.getItem("record");
    loadRecord();
}

// Carregando os recordes anteriores
function loadRecord(){
    if(dataSaved != undefined || dataSaved != null){
        newRecord = JSON.parse(dataSaved);

        for(let i = 0; i <= newRecord.length; i++){
            if(newRecord[i].record >= 90){
                users[0].textContent = newRecord[i].userName
                point[0].textContent = newRecord[i].record
            }

            else if(newRecord[i].record <= 80 && newRecord[i].record >= 60){
                users[1].textContent = newRecord[i].userName
                point[1].textContent = newRecord[i].record
            }

            else{
                users[2].textContent = newRecord[i].userName
                point[2].textContent = newRecord[i].record
            }
        }
    }
}

