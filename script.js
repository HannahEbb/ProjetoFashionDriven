

let clientName = prompt("Qual o seu nome?");
let selectedModel;
let selectedCollar;
let selectedFabric;
let lastOrders;


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
    let referenceImage = document.querySelector("input").value;

    if (selectedModel !== undefined && selectedCollar !== undefined && selectedFabric !== undefined && referenceImage !== "") {
    button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

function confirmOrder () {
    const button = document.querySelector(".confirm");

    if (button.classList.contains("active")) {
        postOrder(); 
    } else {
        return;
    }
}


function postOrder () {
    let referenceImage = document.querySelector("input").value;
    let modelSelected = document.querySelector(".model.selected").id;
    let neckSelected = document.querySelector(".collar.selected").id;
    let materialSelected = document.querySelector(".fabric.selected").id;


    const newOrder = {
        model: modelSelected,
        neck: neckSelected,
        material: materialSelected,
        owner: clientName,
        image: referenceImage,
        author: clientName
        };

    const requisition = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', newOrder);
    requisition.then(newOrderSent);
    requisition.catch(problemAlert);
}


function newOrderSent () {
    alert("Encomenda confirmada," + clientName + "!");
    getOrders();
}


function problemAlert () {
    alert("Ops, não conseguimos processar sua encomenda");
}


function getOrders () {
   const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
   promise.then(displayOrders);
}

function displayOrders (response) {
    lastOrders = response.data;

    let list = document.querySelector(".list");
    list.innerHTML = "";

    for(i = 0; i < lastOrders.length ; i++) {
        let shirtID = lastOrders[i].id;
        let referenceImage = lastOrders[i].image;
        let referenceName = lastOrders[i].owner;
        list.innerHTML += `
        <div class="previous" id="${shirtID}" onclick="purchaseShirt(this)">
        <div><img src="${referenceImage}"></div>
        <div><h4><strong>Criador: </strong>${referenceName}</h4></div>
        </div>
        
        `
    }

}



function purchaseShirt(element) {
    console.log(element.id);
    let shirtID = parseInt(element.id);
    let modelSelected;
    let collarSelected;
    let fabricSelected;

    for(i = 0; i < lastOrders.length; i++) {
        if(lastOrders[i].id === shirtID) {
            modelSelected = lastOrders[i].model;
            collarSelected = lastOrders[i].neck;
            fabricSelected = lastOrders[i].material;
            confirm("Deseja mesmo prosseguir para a compra deste modelo, " + clientName + "? " + "Modelo: " + modelSelected + "; Gola: " + collarSelected + "; Tecido: " + fabricSelected);            

    }
}

}

