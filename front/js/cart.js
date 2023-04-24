//constante pour récupérer les items du localStorage
const panier = JSON.parse(localStorage.getItem("panier"));
// url de l'API
const url = `http://localhost:3000/api/products`;
//Variable pour le prix/quantité total
var calculPrice = 0;
var priceTotal = 0;
var quantityTotal = 0;
var quantityValue = 0;

// création d'une fonction pour récupérer et afficher les items du panier(localStorage)
function getPanier(panier){
    //boucle qui va parcourir le localStorage, s'arrête à la fin de la liste
    for(let i=0; i<panier.length; i++){
        //Appel de l'API pour récupérer les valeurs de l'API
        function checkApi(url){
            fetch(url)
            //verifier si l'api répond à l'appel
            .then(function(response){
                if (response.ok) {
                    return response.json();
                } 
            })
            //si l'appel de l'api est ok alors ...
            .then (function(value){
                //Pointeur pour création de carte produit pour x1 item
                let card = document.getElementById("cart__items");
                //Boucle qui va récupérer les valeurs de l'API...
                for(items of value){
                    //...si l'id de l'item du localStorage est le même que l'id de l'API alors ...
                    if(panier[i].id === items._id){
                        // ...création des cartes produit du panier

                        //création d'un élément html <article>
                        let itemsArticle = document.createElement("article");
                        //ajout d'une class à l'élément html précédement créé
                        itemsArticle.classList.add("cart__item");
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsArticle.setAttribute("data-id", `${panier[i].id}`);
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsArticle.setAttribute("data-color", `${panier[i].color}`);
                        //filliation à l'élément parent : "itemsArticle" devient enfant de "card"
                        card.appendChild(itemsArticle);

                        //création d'un élément html <div>
                        let itemsBlocImg = document.createElement("div");
                        //ajout d'une class à l'élément html précédement créé
                        itemsBlocImg.classList.add("cart__item__img");
                        //filliation à l'élément parent : "itemsBlocImg" devient enfant de "itemsArticle"
                        itemsArticle.appendChild(itemsBlocImg);

                        //création d'un élément html <img>
                        let itemsImg = document.createElement("img");
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsImg.setAttribute("src", `${items.imageUrl}`);
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsImg.setAttribute("alt", `${items.altTxt}`);
                        //filliation à l'élément parent : "itemsImg" devient enfant de "itemsBlocImg"
                        itemsBlocImg.appendChild(itemsImg);
                        
                        //création d'un élément html <div>
                        let itemsBlocContent = document.createElement("div");
                        //ajout d'une class à l'élément html précédement créé
                        itemsBlocContent.classList.add("cart__item__content");
                        //filliation à l'élément parent : "itemsBlocContent" devient enfant de "itemsArticle"
                        itemsArticle.appendChild(itemsBlocContent);
                        
                        //création d'un élément html <div>
                        let itemsBlocDescription = document.createElement("div");
                        //ajout d'une class à l'élément html précédement créé
                        itemsBlocDescription.classList.add("cart__item__content__description");
                        //filliation à l'élément parent : "itemsBlocDescription" devient enfant de "itemsBlocContent"
                        itemsBlocContent.appendChild(itemsBlocDescription);
                        
                        //création d'un élément html <h2>
                        let itemsTitle = document.createElement("h2");
                        //ajout d'une class à l'élément html précédement créé
                        itemsTitle.classList.add("productName");
                        //Attribution d'un contenu de type texte dans l'élément html
                        itemsTitle.textContent = `${items.name}`;
                        //filliation à l'élément parent : "itemsTitle" devient enfant de "itemsBlocDescription"
                        itemsBlocDescription.appendChild(itemsTitle);

                        //création d'un élément html <p>
                        let itemsColor = document.createElement("p");
                        //Attribution d'un contenu de type texte dans l'élément html
                        itemsColor.textContent = `${panier[i].color}`;
                        //filliation à l'élément parent : "itemsColor" devient enfant de "itemsBlocDescription"
                        itemsBlocDescription.appendChild(itemsColor);
                        
                        //création d'un élément html <p>
                        let itemsPrice = document.createElement("p");
                        //calcul pour multiplier la quantité par le prix de l'item
                        calculPrice = parseInt(`${items.price}`) * parseInt(`${panier[i].quantity}`);
                        //Attribution d'un contenu de type texte dans l'élément html
                        itemsPrice.textContent = calculPrice;
                        //filliation à l'élément parent : "itemsPrice" devient enfant de "itemsBlocDescription"
                        itemsBlocDescription.appendChild(itemsPrice);
                        
                        //création d'un élément html <div>
                        let itemsBlocParam = document.createElement("div");
                        //ajout d'une class à l'élément html précédement créé
                        itemsBlocParam.classList.add("cart__item__content__settings");
                        //filliation à l'élément parent : "itemsBlocParam" devient enfant de "itemsBlocContent"
                        itemsBlocContent.appendChild(itemsBlocParam);
                        
                        //création d'un élément html <div>
                        let itemsParamQte = document.createElement("div");
                        //ajout d'une class à l'élément html précédement créé
                        itemsParamQte.classList.add("cart__item__content__settings__quantity");
                        //filliation à l'élément parent : "itemsParamQte" devient enfant de "itemsBlocParam"
                        itemsBlocParam.appendChild(itemsParamQte);
                        
                        //création d'un élément html <p>
                        let itemsQuantity = document.createElement("p");
                        //Attribution d'un contenu de type texte dans l'élément html
                        itemsQuantity.textContent = "Qté : ";
                        //filliation à l'élément parent : "itemsQuantity" devient enfant de "itemsParamQte"
                        itemsParamQte.appendChild(itemsQuantity);
                        
                        //création d'un élément html <input>
                        let itemsInput = document.createElement("input");
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsInput.setAttribute("type", "number");
                        //ajout d'une class à l'élément html précédement créé
                        itemsInput.classList.add("itemQuantity");
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsInput.setAttribute("name", "itemQuantity");
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsInput.setAttribute("min", "1");
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsInput.setAttribute("max", "100");
                        //changer le type de valeur de string à number
                        quantityValue = parseInt(`${panier[i].quantity}`);
                        //Ajout d'un attribut et sa valeur à l'élément précédement créé
                        itemsInput.setAttribute("value", quantityValue);
                        //filliation à l'élément parent : "itemsInput" devient enfant de "itemsParamQte"
                        itemsParamQte.appendChild(itemsInput);
                        
                        //création d'un élément html <div>
                        let itemsParamDelete = document.createElement("div");
                        //ajout d'une class à l'élément html précédement créé
                        itemsParamDelete.classList.add("cart__item__content__settings__delete");
                        //filliation à l'élément parent : "itemsParamDelete" devient enfant de "itemsBlocParam"
                        itemsBlocParam.appendChild(itemsParamDelete);
                        
                        //création d'un élément html <p>
                        let itemsDelete = document.createElement("p");
                        //ajout d'une class à l'élément html précédement créé
                        itemsDelete.classList.add("deleteItem");
                        //Attribution d'un contenu de type texte dans l'élément html
                        itemsDelete.textContent = "Supprimer";
                        //filliation à l'élément parent : "itemsDelete" devient enfant de "itemsParamDelete"
                        itemsParamDelete.appendChild(itemsDelete);

                        //fonction de calcul du total de produits et de prix du panier 
                        function getTotal() {
                            // la quantité totale (quantityTotal) est égale à la sommes des valeurs de quantité/items(quantityValue)
                            quantityTotal += quantityValue;
                            //pointeur sur l'élément HTML avec pour id="totalQuantity"
                            let totalItems = document.getElementById("totalQuantity");
                            //attribuer à l'élément la valeur de quantityTotal
                            totalItems.textContent = `${quantityTotal}`;
                            // le prix total (priceTotal) est égale à la sommes des valeurs de prix/items(calculPrice)
                            priceTotal += calculPrice;
                            //pointeur sur l'élément HTML avec pour id="totalPrice"
                            let totalPrice = document.getElementById("totalPrice");
                            //attribuer à l'élément la valeur de priceTotal
                            totalPrice.textContent = `${priceTotal}`;
                        }  
                        getTotal(panier);

                        //fonction pour modifier la quantité des produits dans le panier 
                        function changeQuantity(){
                            //variable pour pointer tout les input de changement de quantité du panier
                            let quantityButton = document.querySelectorAll('.itemQuantity');
                            //boucle pour parcourir les input de quantité
                            for(let button of Array.from(quantityButton)){
                                //Application d'une ecoute au changement de valeur des input de quantité
                                button.addEventListener("change", evt =>{
                                    //variable pour regrouper les informations des articles produits dans le panier
                                    let getArticle = evt.target.closest(".cart__item");
                                    //variable de récupération de l'id du produit
                                    let kanapId = getArticle.getAttribute('data-id');
                                    //variable de récupération de la couleur du produit
                                    let kanapColor = getArticle.getAttribute('data-color');
                                    //variable de récupération de la nouvelle valeur de quantité + (string -> number)
                                    let kanapQuantity = parseInt(evt.target.value ,10);
                                    //récupération des infos du localStorage
                                    let productInPanier = JSON.parse(localStorage.getItem("panier"));
                                    //constente pour rechercher les produits avec le même id et même couleur dans le localStorage
                                    const searchQuantityChange = productInPanier.find(element => element.id == kanapId && element.color == kanapColor);
                                    //modifier la quantité de l'objet dans le localStorage qui correspond à la recherche precedente
                                    searchQuantityChange.quantity = kanapQuantity;
                                    //envoie du nouvel objet dans le localStorage pour remplacer l'ancien
                                    localStorage.setItem("panier", JSON.stringify(productInPanier));
                                    //rafraichissement de la page pour que le prix et la quantité total se mette à jour
                                    window.location.href = "cart.html";
                                })  
                            }
                        }
                        changeQuantity();
                 
                        //Fonction pour supprimer article du panier et du localStorage
                        function deleteItem() {
                            //Variable pour pointer tout les boutons "supprimer"
                            let deleteButton = document.querySelectorAll('.deleteItem');
                            //Boucle pour parcourir les boutons "supprimer"
                            for (let button of  Array.from(deleteButton)){
                                //Application d'une écoute sur les boutons "supprimer" au click
                                button.addEventListener("click", evt =>{
                                //variable pour pointer le contenu de l'article pointer par l'évènement
                                    let getArticle = evt.target.closest(".cart__item");
                                    //variable pour récupérer l'id du produit
                                    let kanapId = getArticle.getAttribute('data-id');
                                    //variable pour récupérer la couleur du produit
                                    let kanapColor = getArticle.getAttribute('data-color');
                                    //variable pour récupérer le panier du localStorage
                                    let productInPanier = JSON.parse(localStorage.getItem("panier"));
                                    //constente pour rechercher le produit avec le même id et même couleur dans le localStorage
                                    const searchDeleteItem = productInPanier.find(element => element.id == kanapId && element.color == kanapColor);
                                    //dans le panier du localStorage filtrer les produits qui ne correspondent pas à la recherche precedente afin de les concerver dans le localStorage
                                    productInPanier = productInPanier.filter(item => item != searchDeleteItem);
                                    //Envoyer dans le localStorage le nouveau panier
                                    localStorage.setItem("panier", JSON.stringify(productInPanier));
                                    //rafraichir la page panier
                                    window.location.href = "cart.html";
                                })
                            }
                        } 
                        deleteItem();
                    }
                }   
            })
            //si l'appel a l'api est nok alors envoyer un message d'erreur en console
            .catch(function(error) {
                console.log(error);
            });
        }
        checkApi(url);
    }
}
getPanier(panier);

//Fonction de validation de formulaire 
function checkForm(){
    //variable pour pointer le formulaire
    let form = document.querySelector('.cart__order__form');
    //ajout d'un attribut action au formulaire, quand il sera validé et envoyé il renverra vers la page confirmation.html
    form.setAttribute("action", "confirmation.html");
    //ecouter la modification du champ "prenom"
    form.firstName.addEventListener('change', function(){
        validPrenom(this) //this = élément qui est en train d'être écouté 
    })
    //création d'une regexp de validation de prenom 
    const validPrenom = function(inputPrenom){
        //variable qui va créer le nouveau motif de regex : les majuscules, minuscules, avec ou sans accents sont acceptés, les prenoms composés aussi 
        let prenomRegExp = new RegExp ('^[A-ZÇÉÈÊËÀÂÎÏÔÙÛa-zçéèêëàâîïôùû\'\ \-]{2,100}$','g');
        //variable pour pointer le message d'erreur
        let firstNameError = document.getElementById("firstNameErrorMsg");
        //si la regexp = true alors ...
        if(prenomRegExp.test(inputPrenom.value)){
            //message d'erreur est vide
            firstNameError.textContent = "";
            return true;
        }
        //sinon ...
        else{
            //le message d'erreur apparait 
            firstNameError.textContent = "Prénom non valide !";
            return false;
        }
    };
    //ecouter la modification du champ de nom
    form.lastName.addEventListener('change', function(){
        validNom(this) //this = élément qui est en train d'être écouté 
    })
    //création d'une regexp de validation de nom 
    const validNom = function(inputNom){
        //variable qui va créer le nouveau motif de regex : les majuscules, minuscules, avec ou sans accents sont acceptés, les noms composés aussi 
        let nomRegExp = new RegExp ('^[A-ZÇÉÈÊËÀÂÎÏÔÙÛa-zçéèêëàâîïôùû\'\ \-]{2,100}$','g');
        //variable pour pointer le message d'erreur
        let NameError = document.getElementById("lastNameErrorMsg");
        //si la regexp = true alors ...
        if(nomRegExp.test(inputNom.value)){
            //message d'erreur est vide
            NameError.textContent = "";
            return true;
        }
        //sinon ...
        else{
            //le message d'erreur apparait 
            NameError.textContent = "Nom non valide !";
            return false;
        }
    };
    //ecouter la modification du champ de nom
    form.address.addEventListener('change', function(){
        validAdress(this) //this = élément qui est en train d'être écouté 
    })
    //création d'une regexp de validation d'adresse 
    const validAdress = function(inputAdress){
        //variable qui va créer le nouveau motif de regex : numéro + lettre 
        let adressRegExp = new RegExp ('^[1-9A-ZÇÉÈÊËÀÂÎÏÔÙÛa-zçéèêëàâîïôùû\,\'\ \-]{2,100}$','g');
        //variable pour pointer le message d'erreur
        let addressError = document.getElementById("addressErrorMsg");
        //si la regexp = true alors ...
        if(adressRegExp.test(inputAdress.value)){
            //message d'erreur est vide
            addressError.textContent = "";
            return true;
        }
        //sinon ...
        else{
            //le message d'erreur apparait
            addressError.textContent = "Adresse non valide !";
            return false;
        }
    };
    //ecouter la modification du champ de nom
    form.city.addEventListener('change', function(){
        validCity(this) //this = élément qui est en train d'être écouté 
    })
    //création d'une regexp de validation ville 
    const validCity = function(inputCity){
        //variable qui va créer le nouveau motif de regex accents + caractères spéciaux
        let cityRegExp = new RegExp ('^[A-ZÇÉÈÊËÀÂÎÏÔÙÛa-zçéèêëàâîïôùû\'\ \-]{2,100}$','g');
        //variable pour pointer le message d'erreur
        let cityError = document.getElementById("cityErrorMsg");
        //si la regexp = true alors ...
        if(cityRegExp.test(inputCity.value)){
            //message d'erreur est vide
            cityError.textContent = "";
            return true;
        }
        //sinon ...
        else{
            //le message d'erreur apparait
            cityError.textContent = "Ville non valide !";
            return false;
        }
    };
    //ecouter la modification du champ de nom
    form.email.addEventListener('change', function(){
        validEmail(this) //this = élément qui est en train d'être écouté 
    })
    //création d'une regexp de validation ville 
    const validEmail = function(inputEmail){
        //variable qui va créer le nouveau motif de regex d'email
        let emailRegExp = new RegExp ('^[A-ZÇÉÈÊËÀÂÎÏÔÙÛa-zçéèêëàâîïôùû1-9\.\_\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$','g');
        //variable pour pointer le message d'erreur
        let emailError = document.getElementById("emailErrorMsg");
        //si la regexp = true alors ...
        if(emailRegExp.test(inputEmail.value)){
            //message d'erreur est vide
            emailError.textContent = "";
            return true;
        }
        //sinon ...
        else{
            //le message d'erreur apparait
            emailError.textContent = "email non valide !";
            return false;
        }
    }
    //écoute de l'envoie du formulaire
    form.addEventListener('submit', function(evt){
        //si les différents champs du formulaire sont valides alors ...
        if(validPrenom(form.firstName) && validNom(form.lastName) && validAdress(form.address) && validCity(form.city) && validEmail(form.email)){
            //création d'un objet contact avec les valeurs du formulaire
            let contact = {
                firstName : form.firstName.value,
                lastName : form.lastName.value,
                address : form.address.value,
                city : form.city.value,
                email : form.email.value
            }
            //Ajout du tableau récapitulatif de commande
            let products = [];
            //si il y a des produits dans le localStorage alors...
            if (localStorage.getItem("panier")){
                //récupérer le localStorage
                let command = JSON.parse(localStorage.getItem("panier"));
                //boucle pour parcourir le localStorage et récupérer dans un array les id des produits du panier
                for(let product of command){
                    products.push(product.id)
                }
            }
            //envoie des données vers le server via la method POST de fetch et récupération de la réponse avec le numéro de commande
            fetch("http://localhost:3000/api/products/order", {
                method : 'POST',
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({contact, products})
            })
            .then(function(response){
                if (response.ok) {
                    const apiValue = response.json();
                    console.log(apiValue)
                    return apiValue;
                } 
            })
            .then (function(apiValue){
                //renvoi vers la page de confirmation avec l'ID de commande
			    window.location.href = `confirmation.html?orderId=${apiValue.orderId}`;
                //supprimer localStorage quand commande passée
                localStorage.removeItem('panier');
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        //sinon ... rien ne se passe, suppression auto de l'envoie de formulaire
        else {
            evt.preventDefault();
        }
    })
    
}
checkForm();

