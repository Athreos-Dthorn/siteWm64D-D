const telaInicial = document.getElementById("telaInicial");
const simboloEntrada = document.getElementById("simboloEntrada");
const musica = document.getElementById("musica");
musica.volume = 0.4;

const botaoMusica = document.getElementById("botaoMusica");
const iconeMusica = document.getElementById("iconeMusica");

function atualizarBotaoMusica() {
    const ligada = !musica.paused && !musica.muted;

    iconeMusica.src = ligada
        ? "img/musica-ligada.png"
        : "img/musica-bloqueada.png";

    iconeMusica.alt = ligada
        ? "Música ligada"
        : "Música bloqueada";

    botaoMusica.setAttribute("aria-label",
        ligada ? "Desligar música" : "Ligar música");

    botaoMusica.setAttribute("aria-pressed", ligada ? "false" : "true");
}

botaoMusica.addEventListener("click", function () {
    if (musica.paused || musica.muted) {
        musica.muted = false;
        musica.play().then(function () {
            atualizarBotaoMusica();
        }).catch(function (erro) {
            console.log("Não foi possível iniciar a música:", erro);
        });
    } else {
        musica.pause();
        atualizarBotaoMusica();
    }
});

musica.addEventListener("play", atualizarBotaoMusica);
musica.addEventListener("pause", atualizarBotaoMusica);
musica.addEventListener("volumechange", atualizarBotaoMusica);

atualizarBotaoMusica();
const conteudo = document.getElementById("conteudo");
const checkbox = document.getElementById("consentimento");
const botao = document.getElementById("botaoProsseguir");
const questionario1 = document.getElementById("questionario1");
const questionario2 = document.getElementById("questionario02");
const botaoQuestionario1 = document.getElementById("botaoQuestionario1");
const botaoQuestionario2 = document.getElementById("botaoQuestionario2");
const questionario3 = document.getElementById("questionario03");
const botaoQuestionario3 = document.getElementById("botaoQuestionario3")
const botaoSim = document.getElementById("botaoSim");
const botaoNao = document.getElementById("botaoNao");
const botaoFinal = document.getElementById("botaoFinal");
const mensagemInicio = document.getElementById("mensagemInicio");
const avisoFas = document.getElementById("avisoFas");
const simboloTopo = document.querySelector(".simbolo-topo");
const tituloQuestionario = document.querySelector(".titulo-questionario");
const nomeCompleto = document.getElementById("nomeCompleto");
const idade = document.getElementById("idade");
const experiencias = document.querySelectorAll('input[name="experiencia"]');
const tempoDeJogo = document.querySelectorAll('input[name="tempoDeJogo"]');
const instagram = document.getElementById("instagram");
const campanhaTeste = document.querySelectorAll('input[name="campanhaTeste"]');
const respostas = {
    nome: "",
    idade: "",
    experiencia: "",
    tempoDeJogo: "",
    gatilhos: "",
    instagram: "",
    campanhaTeste: "D&D"
};
/* =========================================
   PARTÍCULAS / BRASAS DA TELA INICIAL
========================================= */

const canvasParticulas = document.getElementById("particulas");
const contextoParticulas = canvasParticulas ? canvasParticulas.getContext("2d") : null;

if (canvasParticulas && contextoParticulas) {
    const particulas = [];
    let larguraTela = 0;
    let alturaTela = 0;
    let animacaoParticulas;

    function ajustarCanvasParticulas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        larguraTela = window.innerWidth;
        alturaTela = window.innerHeight;

        canvasParticulas.width = Math.floor(larguraTela * dpr);
        canvasParticulas.height = Math.floor(alturaTela * dpr);
        canvasParticulas.style.width = `${larguraTela}px`;
        canvasParticulas.style.height = `${alturaTela}px`;
        contextoParticulas.setTransform(dpr, 0, 0, dpr, 0, 0);

        const quantidade = Math.max(28, Math.min(75, Math.floor(larguraTela / 18)));
        particulas.length = 0;
        for (let i = 0; i < quantidade; i++) criarParticula(true);
    }

    function criarParticula(inicial = false) {
        particulas.push({
            x: Math.random() * larguraTela,
            y: inicial ? Math.random() * alturaTela : alturaTela + Math.random() * 30,
            tamanho: Math.random() * 1.8 + 0.5,
            velocidadeY: -(Math.random() * 0.75 + 0.25),
            velocidadeX: Math.random() * 0.55 - 0.25,
            brilho: Math.random() * 0.55 + 0.25,
            comprimento: Math.random() * 8 + 3,
            fase: Math.random() * Math.PI * 2
        });
    }

    function desenharParticulas(tempo) {
        contextoParticulas.clearRect(0, 0, larguraTela, alturaTela);

        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];

            p.x += p.velocidadeX + Math.sin(tempo * 0.0007 + p.fase) * 0.12;
            p.y += p.velocidadeY;

            const pulso = 0.65 + Math.sin(tempo * 0.003 + p.fase) * 0.35;
            const opacidade = p.brilho * pulso;

            contextoParticulas.beginPath();
            contextoParticulas.moveTo(p.x, p.y);
            contextoParticulas.lineTo(
                p.x - p.velocidadeX * p.comprimento,
                p.y - p.velocidadeY * p.comprimento
            );
            contextoParticulas.lineWidth = p.tamanho;
            contextoParticulas.strokeStyle = `rgba(235, 72, 12, ${opacidade})`;
            contextoParticulas.shadowBlur = p.tamanho > 1.5 ? 7 : 3;
            contextoParticulas.shadowColor = "rgba(255, 55, 0, 0.35)";
            contextoParticulas.stroke();

            if (p.y < -30 || p.x < -40 || p.x > larguraTela + 40) {
                particulas.splice(i, 1);
                criarParticula();
            }
        }

        contextoParticulas.shadowBlur = 0;
        animacaoParticulas = requestAnimationFrame(desenharParticulas);
    }

    window.addEventListener("resize", ajustarCanvasParticulas);
    ajustarCanvasParticulas();
    animacaoParticulas = requestAnimationFrame(desenharParticulas);

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            cancelAnimationFrame(animacaoParticulas);
        } else {
            animacaoParticulas = requestAnimationFrame(desenharParticulas);
        }
    });
}

/* =========================================
   ENTRADA NO SITE
========================================= */

simboloEntrada.addEventListener("click", function () {

    musica.currentTime = 14.5;
    // Inicia a música
    musica.play().then(function () {
        atualizarBotaoMusica();
    }).catch(function (erro) {
        console.log("Não foi possível iniciar a música:", erro);
    });

    // Começa a animação do símbolo
    simboloEntrada.classList.add("reduzindo");

    // Depois inicia o desaparecimento da tela inicial
    setTimeout(function () {

        telaInicial.classList.add("saindo");

        conteudo.classList.add("visivel");

    }, 500);

});


/* =========================================
   CONSENTIMENTO
========================================= */

checkbox.addEventListener("change", function () {

    if (checkbox.checked) {

        botao.disabled = false;

    } else {

        botao.disabled = true;

    }

});


/* =========================================
   BOTÃO PROSSEGUIR
========================================= */
function enviarRespostas() {
    const dados = new URLSearchParams();

    dados.append("entry.480619261", respostas.nome);
    dados.append("entry.1735860670", respostas.idade);
    dados.append("entry.1454512378", respostas.experiencia);
    dados.append("entry.1753739061", respostas.tempoDeJogo);
    dados.append("entry.1129876452", respostas.instagram);
    dados.append("entry.571834739", respostas.campanhaTeste);

    fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLScqW-ffoz08GE7blS-W3AETn1h-1EHpAXRw9OEMQm_soX7n7w/formResponse",
        {
            method: "POST",
            mode: "no-cors",
            body: dados
        }
    );
}

botao.addEventListener("click", function () {
    if (!checkbox.checked) {
        return;
    }

    const termo = document.querySelector(".termo");
    const introducao = document.querySelector(".introducao");
    const questionario = document.getElementById("questionario1");

    // Faz o termo e a introdução desaparecer
    introducao.classList.add("saindo");
    termo.classList.add("saindo");

    // Espera a animação terminar antes de mostrar o questionário
    setTimeout(function () {
        introducao.style.display = "none";
        termo.style.display = "none";
        tituloQuestionario.classList.add("visivel");
        questionario.classList.add("visivel");
    }, 600);
});

botaoQuestionario1.addEventListener("click", function () {
    if (nomeCompleto.value.trim() === "") {
        alert("Por favor, informe seu nome completo.");
        return;
    }

    if (idade.value.trim() === "") {
        alert("Por favor, informe sua idade.");
        return;
    }

    let experienciaSelecionada = false;

    experiencias.forEach(function (opcao) {
        if (opcao.checked) {
            experienciaSelecionada = true;
        }
    });

    if (!experienciaSelecionada) {
        alert("Selecione seu nível de experiência.");
        return;
    }
    respostas.nome = nomeCompleto.value;
    respostas.idade = idade.value;

    experiencias.forEach(function (opcao) {
        if (opcao.checked) {
            respostas.experiencia = opcao.value;
        }
    });
    questionario1.classList.remove("visivel");

    setTimeout(function () {
        questionario1.style.display = "none";
        questionario2.style.display = "block";
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });

        setTimeout(function () {
            questionario2.classList.add("visivel");
        }, 50);

    }, 600);
});

botaoQuestionario2.addEventListener("click", function () {
    let tempoSelecionado = false;
    if (instagram.value.trim() === "") {
        alert("Informe seu Instagram.");
        return;
    }
    tempoDeJogo.forEach(function (opcao) {
        if (opcao.checked) {
            tempoSelecionado = true;
        }
    });
    if (!tempoSelecionado) {
        alert("Informe se você poderá participar durante todo o evento.");
        return;
    }
    tempoDeJogo.forEach(function (opcao) {
    if (opcao.checked) {
        respostas.tempoDeJogo = opcao.value;
    }
    });
    respostas.instagram = instagram.value;
    questionario2.classList.remove("visivel");
    enviarRespostas();
    setTimeout(function () {
        questionario2.style.display = "none";
        tituloQuestionario.classList.remove("visivel");
        simboloTopo.style.display = "none";
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
        setTimeout(function () {
            mensagemInicio.classList.add("visivel");
        }, 50);
        setTimeout(function () {
        mensagemInicio.classList.add("saindo");

        setTimeout(function () {
            mensagemInicio.style.display = "none";
            avisoFas.classList.add("visivel");
        }, 1000);

    }, 4000);
    }, 600);
});
