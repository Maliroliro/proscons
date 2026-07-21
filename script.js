//variaveis de tela inicial
const inputDecisao = document.getElementById("inputDecisao");
const listaDecisoes = document.getElementById("listaDecisoes");

//bloco pra pegar do localstorage
const salvo = localStorage.getItem("decisoes");
let arrayDecisoes = [];

if (salvo) {
  arrayDecisoes = JSON.parse(salvo);
}

//salva no localstorage
function salvar() {
  localStorage.setItem("decisoes", JSON.stringify(arrayDecisoes));
}

//renderiza a tela com as decisões
function renderizarTela() {

  listaDecisoes.innerHTML = "";
  arrayDecisoes.forEach((decisao, indiceDecisao) => {

    //variáveis da interface de decisão
    const cardMain = document.createElement("div");
    const cardPros = document.createElement("div");
    const cardCons = document.createElement("div");
    const tituloDecisao = document.createElement("h2");
    const listas = document.createElement("div");

    //variaveis da interface de prós
    const tituloPros = document.createElement("h3");
    const listaPros = document.createElement("ul");
    const inputPros = document.createElement("input");
    const botaoPros = document.createElement("button");

    //variáveis da interface de contras
    const tituloCons = document.createElement("h3");
    const listaCons = document.createElement("ul");
    const inputCons = document.createElement("input");
    const botaoCons = document.createElement("button");

    //funcionalidade da interface de prós
    listaPros.classList.add("listaPros");
    tituloPros.textContent = "Prós";
    inputPros.type = "text";
    botaoPros.textContent = "+ Pró";
    botaoPros.addEventListener("click", () => {
      const textoPro = inputPros.value.trim();
      addPro(indiceDecisao, textoPro);
    });

    //funcionalidade da interface de contras
    listaCons.classList.add("listaCons");
    tituloCons.textContent = "Contras";
    inputCons.type = "text";
    botaoCons.textContent = "+ Contra";
    botaoCons.addEventListener("click", () => {
      const textoCon = inputCons.value.trim();
      addCon(indiceDecisao, textoCon);
    });

    //renderiza os prós da decisão
    decisao.pros.forEach((pro, indexPro) => {
      const item = document.createElement("li");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      item.textContent = pro;
      item.appendChild(deleteButton);
      listaPros.appendChild(item);
      deleteButton.addEventListener("click", () => {
        rmvPro(indiceDecisao, indexPro);
      });
    });

    //renderiza os contras da decisão
    decisao.cons.forEach((con, indexCons) => {
      const item = document.createElement("li");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      item.textContent = con;
      item.appendChild(deleteButton);
      listaCons.appendChild(item);
      deleteButton.addEventListener("click", () => {
        rmvCon(indiceDecisao, indexCons);
      });
    });

    //adiciona classes e conteúdo aos elementos
    tituloDecisao.textContent = decisao.titulo;
    tituloPros.classList.add("tituloPros");
    tituloCons.classList.add("tituloCons");
    cardMain.classList.add("cardMain");

    //insere elementos no DOM
    cardPros.append(tituloPros, inputPros, botaoPros, listaPros);
    cardCons.append(tituloCons, inputCons, botaoCons, listaCons);
    cardMain.append(cardPros, cardCons);
    listaDecisoes.append(tituloDecisao, cardMain);
  });
}

//funções para adicionar prós e contras na lista
function addPro(indexDecisao, textoPro) {
  if (textoPro === "") return;
  arrayDecisoes[indexDecisao].pros.push(textoPro);
  salvar();
  renderizarTela();
}

function addCon(indexDecisao, textoCon) {
  if (textoCon === "") return;
  arrayDecisoes[indexDecisao].cons.push(textoCon);
  salvar();
  renderizarTela();
}

//funções para remover prós e contras da lista
function rmvPro(indexDecisao, indexPro) {
  arrayDecisoes[indexDecisao].pros.splice(indexPro, 1);
  salvar();
  renderizarTela();
}

function rmvCon(indexDecisao, indexCon) {
  arrayDecisoes[indexDecisao].cons.splice(indexCon, 1);
  salvar();
  renderizarTela();
}

//função que cria uma decisao
function criarDecisao() {
  const textoDecisao = inputDecisao.value.trim();
  if (textoDecisao === "") return;

  arrayDecisoes.push({
    titulo: textoDecisao,
    pros: [],
    cons: [],
  });

  //salva e renderiza a tela
  salvar();
  renderizarTela();
  inputDecisao.value = "";
}
