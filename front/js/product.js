//Adresse url de l'api
const url = `http://localhost:3000/api/products`;
//Variable pour récupérer l'id du produit séléctionné
var urlId = new URL(location.href).searchParams.get("id");

function getId(url) {
    //fetch = récupérer infos de l'(url)
    fetch(url)
    //pour etre sur qu'on a récupéré les infos
    .then(function(response){
        if (response.ok) {
            return response.json();
        } 
    })
    // traitement des donées récupérées 
    .then(function(value) {
        //Variable pour pointer sur l'élément html qui recevra le contenu descriptif du canapé
        let productImg = document.getElementsByClassName("item__img");
        //Création d'une boucle qui va parcourir l'api
        for(let arrayApi of value) { 
            //si items._id(de l'array de l'api est strictement = à l'urlId (urlsearchparams))
            if (arrayApi._id == urlId) {
                //alors
                //Variable pour créer un nouvel élément html <img>
                let itemsImg = document.createElement("img");
                //Attribution d'une src et sa valeur à <img>
                itemsImg.setAttribute("src", `${arrayApi.imageUrl}`);
                //Attribution d'un alt et sa valeur à <img>
                itemsImg.setAttribute("alt", `${arrayApi.altTxt}`);
                //Filliation à productImg : itemsImg devient enfant de productImg
                productImg[0].appendChild(itemsImg);
                //Variable pour pointer sur l'élément html avec l'id "title"
                let productTitle = document.getElementById("title");
                //Attribution d'un contenu de type texte dans l'élément html
                productTitle.textContent = `${arrayApi.name}`; 
                //Variable pour pointer sur l'élément html avec l'id "price"
                let productPrice = document.getElementById("price");
                //Attribution d'un contenu de type texte dans l'élément html
                productPrice.textContent = `${arrayApi.price}`;
                //Variable pour pointer sur l'élément html avec l'id "description"
                let productTxt = document.getElementById("description");
                //Attribution d'un contenu de type texte dans l'élément html
                productTxt.textContent = `${arrayApi.description}`;
                //constante qui récupère les couleurs de l'api en fonction de l'id de la page
                const nameOfColors = arrayApi.colors;
                //boucle pour générer le tableau du choix de couleurs 
                for (let valueColors of nameOfColors) {
                    //Variable pour pointer sur l'élément html avec l'id "colors"
                    let productColors = document.getElementById("colors");
                    //Variable pour créer un nouvel élément html <option>
                    let itemsColors = document.createElement("option");
                    //Attribution d'une value et sa valeur à <option>
                    itemsColors.setAttribute("value", valueColors);
                    //Attribution d'un contenu de type texte dans l'élément html
                    itemsColors.textContent = valueColors;
                    //Filliation à productColors : itemsColors devient enfant de productColors
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


//variable de récupération de l'élément sur lequel on va appliquer une écoute d'évenement
var ecouteBouton = document.getElementById("addToCart");
//Variable de récupération des données du localStorage
var productInPanier = JSON.parse(localStorage.getItem("panier"));
//création d'un modèle d'objet pour enregistrer toutes les valeurs dans un seul item
class product {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}
//fonction pour ajouter un nouvel obj au localStorage sans multiplier les obj avec le même id et la même couleur
function addPanier(){
    //variables pour récuperer la couleur choisie
    let chooseColor = document.querySelector("#colors").value;
    //variables pour récuperer la quantité choisie
    let chooseQuantity = document.querySelector("#quantity").value;
    //modifier les données string en number (parsInt(x,10), 10 pour une valeur en décimale)
    let quantityChooseQuantity = parseInt(chooseQuantity,10);
    //variable de création de l'objet avec les valeurs récupérées
    let newProduct = new product(urlId, quantityChooseQuantity, chooseColor);
    //si il y a des produits dans le localStorage...
    if (productInPanier){
        // initialiser la recherche de l'objet qui a le même id et la même couleur que le produit qui veut être rajouté
        let findArticle = productInPanier.find((element) => element.id === urlId && element.color === chooseColor);
        // si produit trouvé avec id et couleur pareil...
        if (findArticle) {
            //modifier les données string en number (parsInt(x,10), 10 pour une valeur en décimale)
            let quantityFindArticle = parseInt(findArticle.quantity,10);
            // variable de récupération de quantité dans le localStorage + nouvelle valeur à ajouter
            let newQuantity = quantityFindArticle + quantityChooseQuantity;
            findArticle.quantity = newQuantity
            // envoie de la nouvelle quantité en version json 
            localStorage.setItem("panier", JSON.stringify(productInPanier));
        }
        // ...sinon ajout du produit au tableau
        else {
            productInPanier.push(newProduct);
            localStorage.setItem("panier", JSON.stringify(productInPanier));
        }         
    }
    //... si localStorage vide
    else{ 
        //créer un nouvel array
        productInPanier = [];
        //envoyer l'objet dans le localStorage
        productInPanier.push(newProduct);
        //Mémoriser dans le localStorage
        localStorage.setItem("panier", JSON.stringify(productInPanier));
    }
}
ecouteBouton.addEventListener('click', addPanier);