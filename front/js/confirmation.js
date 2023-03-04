function commandNumber(){
    let getOrderId = new URL(location.href).searchParams.get("orderId");
    let numbConfirm = document.getElementById("orderId");
    numbConfirm.setAttribute("value", getOrderId);
    numbConfirm.textContent = getOrderId;
}
commandNumber();
