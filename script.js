

let clientName = prompt("Qual o seu nome?");
let selectedModel;
let selectedCollar;
let selectedFabric;

getOrders();
setInterval(enableButton, 2000);

function selectModel (item) {
    selectedModel = document.querySelector(".model.selected");

    if (selectedModel !== null) {
        selectedModel.classList.remove("selected");
    }

    item.classList.add("selected");
}


function selectCollar (item) {
    selectedCollar = document.querySelector(".collar.selected");
    
    if (selectedCollar !== null) {
        selectedCollar.classList.remove("selected");
    }
    
    item.classList.add("selected");   
}


function selectFabric (item) {
    selectedFabric = document.querySelector(".fabric.selected");
    
    if (selectedFabric !== null) {
        selectedFabric.classList.remove("selected");
    }
    
    item.classList.add("selected");
}


function enableButton () {
    const button = document.querySelector(".confirm");

    if (selectedModel !== undefined && selectedCollar !== undefined && selectedFabric !== undefined && referenceImage !== "") {
    button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

function confirmOrder () {
    const button = document.querySelector(".confirm");

    if (button.classList.contains("active")) {
        getOrders(); // seria fazer o POST da "order" selecionada em forma de objeto
    } else {
        return;
    }
}

function getOrders () {
   const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
   promise.then(displayOrders);
   promise.catch(dealWithError1); // Não foi possível carregar os últimos pedidos
}

function displayOrders (response) {
    const lastOrders = response.data;
    console.log(lastOrders); // REMOVER

    let list = document.querySelector(".list");
    list.innerHTML = "";

    for(i = 0; i < lastOrders.length ; i++) {
        let referenceImage = lastOrders[i].image;
        let referenceName = lastOrders[i].owner;
        list.innerHTML += `
        <div class="previous">
        <div><img src="${referenceImage}"></div>
        <div><h4><strong>Criador: </strong>${referenceName}</h4></div>
        </div>
        
        `
    }

    

}

//     let referenceImage = document.querySelector("input").value;
