

let clientName = prompt("Qual o seu nome?");
let selectedModel;
let selectedCollar;
let selectedFabric;


setInterval(confirmOrder, 2000);

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


function confirmOrder () {
    let referenceImage = document.querySelector("input").value;
    const button = document.querySelector(".confirm");

    if (selectedModel !== undefined && selectedCollar !== undefined && selectedFabric !== undefined && referenceImage !== "") {
    button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}