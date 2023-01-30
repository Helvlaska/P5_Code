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

//variable de récupération de l'élément sur lequel on va appliquer une écoute d'évenement
let ecouteBouton = document.getElementById("addToCart");
//création d'un modèle d'objet pour enregistrer toutes les valeurs dans un seul item
class product {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}
//récupération des données du localStorage
let productInPanier = JSON.parse(localStorage.getItem("panier"));
//fonction pour ajouter un nouvel obj au localStorage sans multiplier les obj avec le même id et la même couleur
function addPanier(){
    //variables pour récuperer la couleur et la quantité choisie
    let chooseColor = document.querySelector("#colors").value;
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