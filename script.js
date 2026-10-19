const cartaBotao = document.getElementById("cartaBotao");

const surpresaBotao = document.getElementById("surpresaBotao");

const surpresaMensagem = document.getElementById("surpresaMensagem");

const dataInicio = document.getElementById("dataInicio");


// ABRIR A CARTA

cartaBotao.addEventListener("click", function () {
    cartaBotao.classList.toggle("aberta");

    if (cartaBotao.classList.contains("aberta")) {
        criarCoracoes(8);
    }
});


// BOTÃO DE SURPRESA

surpresaBotao.addEventListener("click", function () {
    const mensagens = [
        "Meu lugar favorito sempre vai ser ao seu lado. ♡",

        "Se eu pudesse escolher de novo, escolheria você.",

        "Você é a minha parte favorita de todos os dias.",

        "Gosto de você mais do que consigo explicar. ♡",

        "Você é o meu milagre favorito. 👻♡"
    ];

    const indice = Math.floor(Math.random() * mensagens.length);

    surpresaMensagem.textContent = mensagens[indice];

    criarCoracoes(15);
});


// CORAÇÕES FLUTUANTES

function criarCoracoes(quantidade) {
    for (let i = 0; i < quantidade; i++) {
        const coracao = document.createElement("span");

        coracao.textContent = Math.random() > 0.5 ? "♥" : "♡";

        coracao.style.position = "fixed";

        coracao.style.left = Math.random() * 100 + "vw";

        coracao.style.top = 50 + Math.random() * 40 + "vh";

        coracao.style.color = Math.random() > 0.5
            ? "#ed9ca8"
            : "#b82d42";

        coracao.style.fontSize = 15 + Math.random() * 20 + "px";

        coracao.style.pointerEvents = "none";

        coracao.style.zIndex = "999";

        coracao.style.animation = "subir 2s ease-out forwards";

        document.body.appendChild(coracao);

        setTimeout(function () {
            coracao.remove();
        }, 2000);
    }
}


// ANIMAÇÃO DOS CORAÇÕES

const estilo = document.createElement("style");

estilo.textContent = `
    @keyframes subir {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        to {
            opacity: 0;
            transform: translateY(-150px) scale(1.5);
        }
    }
`;

document.head.appendChild(estilo);


// CONTADOR DE TEMPO DE NAMORO

function atualizarContador() {
    const valor = dataInicio.value;

    if (!valor) {
        document.getElementById("dias").textContent = "0";
        document.getElementById("horas").textContent = "0";
        document.getElementById("minutos").textContent = "0";

        return;
    }

    const inicio = new Date(valor + "T00:00:00");

    const agora = new Date();

    if (isNaN(inicio.getTime()) || inicio > agora) {
        document.getElementById("dias").textContent = "—";
        document.getElementById("horas").textContent = "—";
        document.getElementById("minutos").textContent = "—";

        return;
    }

    const diferenca = agora - inicio;

    const minutosTotais = Math.floor(diferenca / 60000);

    const dias = Math.floor(minutosTotais / 1440);

    const horas = Math.floor((minutosTotais % 1440) / 60);

    const minutos = minutosTotais % 60;

    document.getElementById("dias").textContent = dias;

    document.getElementById("horas").textContent = horas;

    document.getElementById("minutos").textContent = minutos;
}


// SALVAR A DATA ESCOLHIDA

dataInicio.addEventListener("change", function () {
    localStorage.setItem("dataNamoro", dataInicio.value);

    atualizarContador();
});


// RECUPERAR A DATA SALVA

const dataSalva = localStorage.getItem("dataNamoro");

if (dataSalva) {
    dataInicio.value = dataSalva;
}

atualizarContador();

setInterval(atualizarContador, 60000);
