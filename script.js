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

function renderizarTela() {
  listaDecisoes.innerHTML = "";
  arrayDecisoes.forEach((decisao, indiceDecisao) => {
    //variáveis da interface de decisão
    const cardMain = document.createElement("div");
    const cardPros = document.createElement("div");
    const cardCons = document.createElement("div");
    const titulo = document.createElement("h2");
    const listas = document.createElement("div");

    //variaveis da interface de prós
    const pros = document.createElement("h3");
    const listaPros = document.createElement("ul");
    const inputPros = document.createElement("input");
    const botaoPros = document.createElement("button");

    //variáveis da interface de contras
    const cons = document.createElement("h3");
    const listaCons = document.createElement("ul");
    const inputCons = document.createElement("input");
    const botaoCons = document.createElement("button");

    //funcionalidade da interface de prós
    listaPros.classList.add("listaPros");
    pros.textContent = "Prós";
    inputPros.type = "text";
    botaoPros.textContent = "+ Pró";
    botaoPros.addEventListener("click", () => {
      const texto = inputPros.value.trim();
      addPro(indiceDecisao, texto);
    });

    //funcionalidade da interface de contras
    listaCons.classList.add("listaCons");
    cons.textContent = "Contras";
    inputCons.type = "text";
    botaoCons.textContent = "+ Contra";
    botaoCons.addEventListener("click", () => {
      const texto = inputCons.value.trim();
      addCon(indiceDecisao, texto);
    });

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

    titulo.textContent = decisao.titulo;
    cardMain.classList.add("cardMain");

    //insere elementos no DOM
    cardPros.append(pros, inputPros, botaoPros, listaPros);
    cardCons.append(cons, inputCons, botaoCons, listaCons);
    cardMain.append(cardPros, cardCons);
    listaDecisoes.append(titulo, cardMain);
  });
}

//função para adicionar prós à lista
function addPro(indexDecisao, texto) {
  if (texto === "") {
    alert("Digite um pró válido!");
    return;
  }
  arrayDecisoes[indexDecisao].pros.push(texto);
  salvar();
  renderizarTela();
}

//função para adicionar contras à lista
function addCon(indexDecisao, texto) {
  if (texto === "") return;
  
  arrayDecisoes[indexDecisao].cons.push(texto);
  salvar();
  renderizarTela();
}

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

//funcao que cria uma decisao
function criarDecisao() {
  const texto = inputDecisao.value.trim();
  if (texto === "") return;

  arrayDecisoes.push({
    titulo: texto,
    pros: [],
    cons: [],
  });

  salvar();
  renderizarTela();
  inputDecisao.value = "";
}
