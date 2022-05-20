const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];

const PECAS = [
	[Z, "white"],
	[S, "#f8f8ff"],
	[T, "#808080"],
	[O, "#A9A9A9"],
	[L, "#C0C0C0"],
	[I, "#D3D3D3"],
	[J, "#DCDCDC"]
];


const LINHA = 20;
const COLUNA = 10;
const TAMANHO = 30;
const VAGO = "black"; //cor do tabuleiro

var claranja = 0 //contadores das peças para a estatística
var croxa = 0
var cvermelha = 0;
var camarela = 0;
var cciano = 0
var cverde = 0;
var cazul = 0;

var nivel = 1 //iniciando no nivel 1
var nivellinha = 0;
var peca;
var tabuleiro = [];

var inicioDescida;
var fimDeJogo = false;

var tela = document.getElementById("tela");
var c = tela.getContext("2d");
var pontuacao = document.getElementById("pontos");
var niveltetris = document.getElementById("nivel");
var linhasremovidas = document.getElementById("linhas");

var musicadefundo = document.getElementById("musicadefundo");
var tocarPausar = document.getElementById("tocarPausar");
var pecasUsadas = document.getElementById("pecasUsadas");


var pecaproxStyle = document.getElementById("pecaprox");
var pecaprox2Style = document.getElementById("pecaprox2");
var pecaprox3Style = document.getElementById("pecaprox3");


var peca;
var peçaS = '<img src="imagens/tetra-s.png">'; //imagens dos proximos tetraminos
var peçai = '<img src="imagens/tetra-i.png">';
var peçaJ = '<img src="imagens/tetra-J.png">';
var peçaO = '<img src="imagens/tetra-O.png">';
var peçaT = '<img src="imagens/tetra-t.png">';
var peçaZ = '<img src="imagens/tetra-z.png">';
var peçaL = '<img src="imagens/tetris-L.png">';

var pecaprox;
var pecaprox2;
var pecaprox3;
var cPeca = 0;
var proximasPecas = [3];

var contadorMusica = 0;
var ponto = 0

pontuacao.innerHTML = ponto
niveltetris.innerHTML = nivel;

onkeydown = controlarPeca;

iniciarTabuleiro();

desenharTabuleiro();

gerarPeca();

inicioDescida = Date.now();

descerPeca();


// Sub-rotinas (funções)

function iniciarTabuleiro() {
	for (var i = 0; i < LINHA; i++) {
		tabuleiro[i] = [];

		for (var j = 0; j < COLUNA; j++) {
			tabuleiro[i][j] = VAGO;
		}
	}
}

function desenharTabuleiro() {
	for (var i = 0; i < LINHA; i++) {
		for (var j = 0; j < COLUNA; j++) {
			desenharQuadrado(j, i, tabuleiro[i][j]);
		}
	}
}

function desenharQuadrado(x, y, cor) {
	c.fillStyle = cor;
	c.fillRect(x * TAMANHO, y * TAMANHO, TAMANHO, TAMANHO);

	c.strokeStyle = "#1C1C1C"; //cor das linhas no tabuleiro
	c.strokeRect(x * TAMANHO, y * TAMANHO, TAMANHO, TAMANHO);
}

function gerarPeca() {

	if (cPeca == 0) {
		var r = Math.floor(Math.random() * PECAS.length);

		peca = {
			tetramino: PECAS[r][0],
			cor: PECAS[r][1],
			tetraminoN: 0,
			tetraminoAtivo: [[]],
			x: 3,
			y: -2
		};
		peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
		proximasPecas[0] = Math.floor(Math.random() * PECAS.length);
		proximasPecas[1] = Math.floor(Math.random() * PECAS.length);
		proximasPecas[2] = Math.floor(Math.random() * PECAS.length);
		cPeca = 1;
	}
	else {
		peca = {
			tetramino: PECAS[proximasPecas[0]][0],
			cor: PECAS[proximasPecas[0]][1],
			tetraminoN: 0,
			tetraminoAtivo: [[]],
			x: 3,
			y: -2
		};
		peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
		proximasPecas[0] = proximasPecas[1];
		proximasPecas[1] = proximasPecas[2];
		proximasPecas[2] = Math.floor(Math.random() * PECAS.length);
	}

	//verificação para as próximas peças e contador para a estatística
	if (proximasPecas[0] == 0) {
		pecaprox = peçaZ
		croxa++
	}
	else if (proximasPecas[0] == 1) {
		pecaprox = peçaS;
		claranja++
	}
	else if (proximasPecas[0] == 2) {
		pecaprox = peçaT;
		cvermelha++
	}
	else if (proximasPecas[0] == 3) {
		pecaprox = peçaO;
		camarela++
	}
	else if (proximasPecas[0] == 4) {
		pecaprox = peçaL;
		cverde++
	}
	else if (proximasPecas[0] == 5) {
		pecaprox = peçai;
		cciano++
	}
	else if (proximasPecas[0] == 6) {
		pecaprox = peçaJ;
		cazul++
	}

	if (proximasPecas[1] == 0) {
		pecaprox2 = peçaZ;
	}
	else if (proximasPecas[1] == 1) {
		pecaprox2 = peçaS;
	}
	else if (proximasPecas[1] == 2) {
		pecaprox2 = peçaT;
	}
	else if (proximasPecas[1] == 3) {
		pecaprox2 = peçaO;
	}
	else if (proximasPecas[1] == 4) {
		pecaprox2 = peçaL;
	}
	else if (proximasPecas[1] == 5) {
		pecaprox2 = peçai;
	}
	else if (proximasPecas[1] == 6) {
		pecaprox2 = peçaJ;
	}


	if (proximasPecas[2] == 0) {
		pecaprox3 = peçaZ;
	}
	else if (proximasPecas[2] == 1) {
		pecaprox3 = peçaS;
	}
	else if (proximasPecas[2] == 2) {
		pecaprox3 = peçaT;
	}
	else if (proximasPecas[2] == 3) {
		pecaprox3 = peçaO;
	}
	else if (proximasPecas[2] == 4) {
		pecaprox3 = peçaL;
	}
	else if (proximasPecas[2] == 5) {
		pecaprox3 = peçai;
	}
	else if (proximasPecas[2] == 6) {
		pecaprox3 = peçaJ;
	}
	pecaproxStyle.innerHTML = pecaprox;
	pecaprox2Style.innerHTML = pecaprox2;
	pecaprox3Style.innerHTML = pecaprox3;
}

var velpeca = 650; // 1 segundo de velocidade no nivel 1
var clinhasremov = 0; //contador de linhas removidas
linhasremovidas.innerHTML = clinhasremov;

function descerPeca() {
	var agora = Date.now();
	var delta = agora - inicioDescida;
	if (clinhasremov > 9) { // verifica se 10 linhas foram removidas
		clinhasremov = 0;
		linhasremovidas.innerHTML = clinhasremov;
		nivel++; //sobe o nivel
		niveltetris.innerHTML = nivel;
		velpeca -= 100; //aumenta a velocidade
		subirNivel.play();
	}
	if (delta > velpeca) {
		moverAbaixo();
		inicioDescida = Date.now();
	}

	if (!fimDeJogo) {
		requestAnimationFrame(descerPeca);
	}
}

function moverAbaixo() {
	if (!colisao(0, 1, peca.tetraminoAtivo)) {
		apagarPeca();
		peca.y++;
		desenharPeca();
	} else {
		travarPeca();
		gerarPeca();
	}

}

function quedaForte() { 
	for (i = 0; i < 19; i++) {
		if (!colisao(0, 1, peca.tetraminoAtivo)) {
			apagarPeca();
			peca.y++;
			desenharPeca();
			ponto += 2 //2 pontos a cada quadrado descido
		}
	}
	queda.play()
}

function moverDireita() {
	if (!colisao(1, 0, peca.tetraminoAtivo)) {
		apagarPeca();
		peca.x++;
		desenharPeca();
	}
}

function moverEsquerda() {
	if (!colisao(-1, 0, peca.tetraminoAtivo)) {
		apagarPeca();
		peca.x--;
		desenharPeca();
	}
}

function colisao(x, y, p) {
	for (var i = 0; i < p.length; i++) {
		for (var j = 0; j < p.length; j++) {
			if (!p[i][j]) {
				continue;
			}

			var novoX = peca.x + j + x;
			var novoY = peca.y + i + y;

			if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
				return true;
			}

			if (novoY < 0) {
				continue;
			}

			if (tabuleiro[novoY][novoX] != VAGO) {
				return true;
			}
		}
	}

	return false;
}

function apagarPeca() {
	preencherPeca(VAGO);
}

function desenharPeca() {
	preencherPeca(peca.cor);
}

function preencherPeca(cor) {
	for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
		for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
			if (peca.tetraminoAtivo[i][j]) {
				desenharQuadrado(peca.x + j, peca.y + i, cor);
			}
		}
	}
}

var cjogadores = 0; // contador de jogadores
var vjogadores = [5] //vetor de jogadores
var pjogador; // pontos do jogador
var njogador; // nome do jogador 
var aux; // auxiliar para fazer a ordenação do vetor de registro
var cpontosextra = 0; //contador para adicionar pontos extras
function travarPeca() {
	for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
		for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
			if (!peca.tetraminoAtivo[i][j]) {
				continue;
			}

			if (peca.y + i < 0) {
				fimDeJogo = true;
				break;
			}
			if (fimDeJogo == true) {
				//Fim de Jogo
				fim.play()
				alert("Game Over"); 
				alert("Pontos: " + ponto);
				location.reload() //recarregar página
				break;
			}

			tabuleiro[peca.y + i][peca.x + j] = peca.cor;
		}
		encaixe.play();
	}
	for (var i = 0; i < LINHA; i++) {
		var linhaCheia = true;

		for (var j = 0; j < COLUNA; j++) {
			linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
		}

		if (linhaCheia) {
			for (var y = i; y > 1; y--) {
				for (var j = 0; j < COLUNA; j++) {
					tabuleiro[y][j] = tabuleiro[y - 1][j];
				}
			}
			for (var j = 0; j < COLUNA; j++) {
				tabuleiro[0][j] = VAGO;
			}
			cpontosextra++
			clinhasremov++;
			linhasremovidas.innerHTML = clinhasremov;
			removerLinha.play();
		}

	}
	//Verificação para adicionar pontos extras quando 2 ou mais linhas são removidas
	if (cpontosextra == 1) {
		ponto += 100 * nivel;
		pontuacao.innerHTML = ponto;
		cpontosextra = 0;
	} else if (cpontosextra == 2) {
		ponto += 300 * nivel;
		pontuacao.innerHTML = ponto;
		cpontosextra = 0;
	} else if (cpontosextra == 3) {
		ponto += 500 * nivel;
		pontuacao.innerHTML = ponto;
		cpontosextra = 0;
	} else if (cpontosextra == 4) {
		ponto += 800 * nivel;
		pontuacao.innerHTML = ponto;
		cpontosextra = 0;
	}

	desenharTabuleiro();
}

function rodarPeca() {
	var proximoPadrao = peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
	var recuo = 0;

	if (colisao(0, 0, proximoPadrao)) {
		if (peca.x > COLUNA / 2) {
			recuo = -1;
		} else {
			recuo = 1;
		}
	}

	if (!colisao(recuo, 0, proximoPadrao)) {
		apagarPeca();
		peca.x += recuo;
		peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
		peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
		desenharPeca();
	}
}

//Sons
var lado = new Audio('Sons/lado.wav');
lado.addEventListener('canplaythrough', function () {
	lado.play();
});
var descer = new Audio('Sons/descer.wav');
descer.addEventListener('canplaythrough', function () {
	descer.play();
});
var girar = new Audio('Sons/girar.wav');
girar.addEventListener('canplaythrough', function () {
	girar.play();
});
var encaixe = new Audio('Sons/encaixe.wav');
encaixe.addEventListener('canplaythrough', function () {
	encaixe.play();
});
var removerLinha = new Audio('Sons/removerLinha.wav');
removerLinha.addEventListener('canplaythrough', function () {
	removerLinha.play();
});
var queda = new Audio('Sons/queda.wav');
queda.addEventListener('canplaythrough', function () {
	queda.play();
});
var subirNivel = new Audio('Sons/subirNivel.wav');
subirNivel.addEventListener('canplaythrough', function () {
	subirNivel.play();
});
var fim = new Audio('Sons/fim.wav');
fimdejogo.addEventListener('canplaythrough', function () {
	fim.play();
});

//Teclas
function controlarPeca(evento) {
	var tecla = evento.keyCode;

	if (tecla == 37) {
		moverEsquerda();
		lado.play();
		inicioDescida = Date.now();
	} else if (tecla == 38) {
		rodarPeca();
		girar.play();
		inicioDescida = Date.now();
	} else if (tecla == 39) {
		moverDireita();
		lado.play();
		inicioDescida = Date.now();
	} else if (tecla == 40) {
		moverAbaixo()
		moverAbaixo();
		descer.play();
		ponto += 1;
		pontuacao.innerHTML = ponto;
	}
	else if (tecla == 90) { // Tecla Z para girar para esquerda
		for (i = 0; i < 3; i++) { //gira a peça 3 vezes para direita 
			rodarPeca();
			inicioDescida = Date.now();
		}
		girar.play();
	}
	else if (tecla == 32) { // Espaço para queda forte
		quedaForte()
		ponto += 2;
		pontuacao.innerHTML = ponto;
	}
}

function tocarPause() {
	if (contadorMusica == 0) {
		contadorMusica = 1;
		musicadefundo.play();
	} else {
		contadorMusica = 0;
		musicadefundo.pause();
	}

}
