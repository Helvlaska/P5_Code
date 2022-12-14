let urlId = new URL(location.href).searchParams.get("id");
let url = `http://localhost:3000/api/products`;
let productImg = document.getElementsByClassName("item__img");

function getId(url) {
    //fetch = récupérer infos de l'(url)
    fetch(url)
    //pour etre sur qu'on a récupéré les infos
    .then(function(response){
        if (response.ok) {
            return response.json();
        } 
    })
    //utiliser les infos 
    .then(function(value) {
        for(let arrayApi of value) { 
            //si items._id(de l'array de l'api est strictement = à l'urlId (urlsearchparams))
            if (arrayApi._id == urlId) {
                //alors
                //création de l'élement "img", avec sa source et son attribut, filliation
                let itemsImg = document.createElement("img");
                itemsImg.setAttribute("src", `${arrayApi.imageUrl}`);
                itemsImg.setAttribute("alt", `${arrayApi.altTxt}`);
                productImg[0].appendChild(itemsImg);
                //création d'un texte pour l'id "title"
                let productTitle = document.getElementById("title");
                productTitle.textContent = `${arrayApi.name}`; 
                //création d'un texte pour l'id "price"
                let productPrice = document.getElementById("price");
                productPrice.textContent = `${arrayApi.price}`;
                //création d'un texte pour l'id "description"
                let productTxt = document.getElementById("description");
                productTxt.textContent = `${arrayApi.description}`;
                //constante qui récupère les couleurs de l'api en fonction de l'id de la page
                const nameOfColors = arrayApi.colors;
                //boucle pour générer le tableau du choix de couleurs 
                for (let valueColors of nameOfColors) {
                    //création d'un élément <option> pour chaque valeur de couleur, filliation
                    let productColors = document.getElementById("colors");
                    let itemsColors = document.createElement("option");
                    itemsColors.setAttribute("value", valueColors);
                    itemsColors.textContent = valueColors;
                    productColors.appendChild(itemsColors);
                }
            }
        }
    })
    //en cas si l'appel marche pas 
    .catch(function(error) {
        console.log(error);
    });

}
getId(url)

let ecouteBouton = document.getElementById("addToCart");
class product {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}

function addPanier(){
    let chooseQuantity = document.getElementById("quantity").value;
    let chooseColor = document.getElementById("colors").value;
    
    let newproduct = new product(urlId, chooseQuantity, chooseColor);
    let productInPanier = JSON.parse(localStorage.getItem("panier"));
    
    if(productInPanier){
            
        productInPanier.push(newproduct)
        localStorage.setItem("panier", JSON.stringify(productInPanier))
    }
    else {
        productInPanier = []
        productInPanier.push(newproduct)
        localStorage.setItem("panier", JSON.stringify(productInPanier))
    }
}
ecouteBouton.addEventListener('click', addPanier);



