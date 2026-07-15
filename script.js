//variaveis de tela inicial
const inputDecisao = document.getElementById("inputDecisao");
const listaDecisoes = document.getElementById("listaDecisoes");

const salvo = localStorage.getItem("decisoes");
let arrayDecisoes = [];

if (salvo) {
  arrayDecisoes = JSON.parse(salvo);
}

function salvar() {
  localStorage.setItem("decisoes", JSON.stringify(arrayDecisoes));
}

//funcao principal
function decidido() {
  //cria um card de prós e contras
  const texto = inputDecisao.value;
  const cardMain = document.createElement("div");
  const cardPros = document.createElement("div");
  const cardCons = document.createElement("div");
  const titulo = document.createElement("h2");
  const listas = document.createElement("div");
  titulo.textContent = texto;
  cardMain.classList.add("cardMain");

  //adiciona a decisão ao array de decisões
  const indiceDecisao = arrayDecisoes.length;
  arrayDecisoes.push({
    titulo: texto,
    pros: [],
    cons: [],
  });

  //variaveis da interface de prós
  const pros = document.createElement("h3");
  const listaPros = document.createElement("ul");
  const inputPros = document.createElement("input");
  const botaoPros = document.createElement("button");

  //funcionalidade da interface de prós
  listaPros.classList.add("listaPros");
  pros.textContent = "Prós";
  inputPros.type = "text";
  botaoPros.textContent = "+ Pró";
  botaoPros.addEventListener("click", () => {
    const texto = inputPros.value.trim();
    if (texto === "") return;
    arrayDecisoes[indiceDecisao].pros.push(texto);
    inputPros.value = "";
    addPro();
    salvar();
    console.log(arrayDecisoes);
  });

  //função para adicionar prós à lista
  function addPro() {
    listaPros.innerHTML = "";
    arrayDecisoes[indiceDecisao].pros.forEach((pro, indexPro) => {
      const item = document.createElement("li");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      item.textContent = pro;
      item.appendChild(deleteButton);
      listaPros.appendChild(item);
      deleteButton.addEventListener("click", () => {
        listaPros.removeChild(item);
        arrayDecisoes[indiceDecisao].pros.splice(indexPro, 1);
        salvar();
        console.log(arrayDecisoes);
      });
    });
  }

  //variáveis da interface de contras
  const cons = document.createElement("h3");
  const listaCons = document.createElement("ul");
  const inputCons = document.createElement("input");
  const botaoCons = document.createElement("button");

  //funcionalidade da interface de contras
  listaCons.classList.add("listaCons");
  cons.textContent = "Contras";
  inputCons.type = "text";
  botaoCons.textContent = "+ Contra";
  botaoCons.addEventListener("click", () => {
    const texto = inputCons.value.trim();
    if (texto === "") return;
    arrayDecisoes[indiceDecisao].cons.push(texto);
    inputCons.value = "";
    addCon();
    salvar();
    console.log(arrayDecisoes);
  });

  //função para adicionar contras à lista
  function addCon() {
    listaCons.innerHTML = "";
    arrayDecisoes[indiceDecisao].cons.forEach((con, indexCons) => {
      const item = document.createElement("li");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      item.textContent = con;
      item.appendChild(deleteButton);
      listaCons.appendChild(item);
      deleteButton.addEventListener("click", () => {
        listaCons.removeChild(item);
        arrayDecisoes[indiceDecisao].cons.splice(indexCons, 1);
        salvar();
        console.log(arrayDecisoes);
      });
    });
  }

  //insere elementos no DOM e limpa input inicial
  cardPros.append(pros, inputPros, botaoPros, listaPros);
  cardCons.append(cons, inputCons, botaoCons, listaCons);
  cardMain.append(cardPros, cardCons);
  listaDecisoes.append(titulo, cardMain);

  inputDecisao.value = "";
  salvar();
}
