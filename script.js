//variaveis de tela inicial
const inputDecisao = document.getElementById("inputDecisao");
const listaDecisoes = document.getElementById("listaDecisoes");

//funcao principal
function decidido(){

    //cria um card de prós e contras
    const texto = inputDecisao.value;
    const cardMain = document.createElement("div")
    const cardPros = document.createElement("div");
    const cardCons = document.createElement("div");
    const titulo = document.createElement("h2");
    const listas = document.createElement("div");
    titulo.textContent = texto;
    cardMain.classList.add("cardMain");

    //variaveis da interface de prós
    const pros = document.createElement("h3");
    const listaPros = document.createElement("ul");
    const inputPros = document.createElement("input");
    const botaoPros = document.createElement("button");
    
    //funcionalidade da interface de prós
    listaPros.classList.add("listaPros")
    pros.textContent = "Prós";
    inputPros.type = "text";
    botaoPros.textContent = "+ Pró";
    botaoPros.addEventListener("click", () =>{
        const texto = inputPros.value.trim();
        if (texto === "") return;
        const item = document.createElement("li");
        item.textContent = texto;
        listaPros.appendChild(item);
        inputPros.value = "";
    });

    //variáveis da interface de contras
    const cons = document.createElement("h3");
    const listaCons = document.createElement("ul");
    const inputCons = document.createElement("input");
    const botaoCons = document.createElement("button");
    

    //funcionalidade da interface de contras
    listaCons.classList.add("listaCons")
    cons.textContent = "Contras";
    inputCons.type = "text";
    botaoCons.textContent = "+ Contra";
    botaoCons.addEventListener("click", () =>{
        const texto = inputCons.value.trim();
        if (texto === "") return;
        const item = document.createElement("li");
        item.textContent = texto;
        listaCons.appendChild(item);
        inputCons.value = "";
    });

    //insere elementos no DOM e limpa input inicial
    cardPros.append(pros, inputPros, botaoPros, listaPros);
    cardCons.append(cons, inputCons, botaoCons, listaCons);
    cardMain.append(cardPros, cardCons);
    listaDecisoes.append(titulo, cardMain);

    inputDecisao.value = "";
}

