//Fonction pour récupérer le numéro de commande 
function commandNumber(){
    //variable pour récupérer l'orderId dans l'url
    let getOrderId = new URL(location.href).searchParams.get("orderId");
    //Variable pour pointer sur l'élément "orderId"
    let numbConfirm = document.getElementById("orderId");
    //attribuer à l'élément "orderId" la valeur récupéré dans l'url
    numbConfirm.setAttribute("value", getOrderId);
    //le contenu de l'élément "orderId" = à la valeur récupéré dans l'url
    numbConfirm.textContent = getOrderId;
}
commandNumber();
