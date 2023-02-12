//constante pour récupérer les items du localStorage
const panier = JSON.parse(localStorage.getItem("panier"));
// url de l'API
const url = `http://localhost:3000/api/products`;
//Pointeur pour création de carte produit pour 1 item
const card = document.getElementById("cart__items");
//Variable pour le prix/quantité total
let calculPrice = 0;
let priceTotal = 0;
let quantityTotal = 0;
let quantityValue = 0;
let itemId = 0;
let itemColor = 0;
// création d'une fonction pour récupérer et afficher les items du panier(localStorage)
function getPanier(panier){
    //boucle qui va parcourir le localStorage, s'arrête à la fin de la liste
    for(let i=0; i<panier.length; i++){
        //Appelle de l'API pour récupérer les valeurs de l'API
        function checkApi(url){
            fetch(url)
            .then(function(response){
                if (response.ok) {
                    return response.json();
                } 
            })
            .then (function(value){
                //Boucle qui va récupérer les valeurs de l'API...
                for(items of value){
                    //...si l'id de l'item du localStorage est le même que l'id de l'API alors ...
                    if(panier[i].id === items._id){
                        // ...création des cartes produit du panier
                        let itemsArticle = document.createElement("article");
                        itemsArticle.classList.add("cart__item");
                        itemsArticle.setAttribute("data-id", `${panier[i].id}`);
                        itemsArticle.setAttribute("data-color", `${panier[i].color}`);
                        card.appendChild(itemsArticle);
        
                        let itemsBlocImg = document.createElement("div");
                        itemsBlocImg.classList.add("cart__item__img");
                        itemsArticle.appendChild(itemsBlocImg);
        
                        let itemsImg = document.createElement("img");
                        itemsImg.setAttribute("src", `${items.imageUrl}`);
                        itemsImg.setAttribute("alt", `${items.altTxt}`);
                        itemsBlocImg.appendChild(itemsImg);
        
                        let itemsBlocContent = document.createElement("div");
                        itemsBlocContent.classList.add("cart__item__content");
                        itemsArticle.appendChild(itemsBlocContent);
        
                        let itemsBlocDescription = document.createElement("div");
                        itemsBlocDescription.classList.add("cart__item__content__description");
                        itemsBlocContent.appendChild(itemsBlocDescription);
        
                        let itemsTitle = document.createElement("h2");
                        itemsTitle.classList.add("productName");
                        itemsTitle.textContent = `${items.name}`;
                        itemsBlocDescription.appendChild(itemsTitle);
        
                        let itemsColor = document.createElement("p");
                        itemsColor.textContent = `${panier[i].color}`;
                        itemsBlocDescription.appendChild(itemsColor);
        
                        let itemsPrice = document.createElement("p");
                        //calcul pour multiplier la quantité par le prix de l'item
                        calculPrice = parseInt(`${items.price}`) * parseInt(`${panier[i].quantity}`);
                        itemsPrice.textContent = calculPrice;
                        itemsBlocDescription.appendChild(itemsPrice);
        
                        let itemsBlocParam = document.createElement("div");
                        itemsBlocParam.classList.add("cart__item__content__settings");
                        itemsBlocContent.appendChild(itemsBlocParam);
        
                        let itemsParamQte = document.createElement("div");
                        itemsParamQte.classList.add("cart__item__content__settings__quantity");
                        itemsBlocParam.appendChild(itemsParamQte);
        
                        let itemsQuantity = document.createElement("p");
                        itemsQuantity.textContent = "Qté : ";
                        itemsParamQte.appendChild(itemsQuantity);
        
                        let itemsInput = document.createElement("input");
                        itemsInput.setAttribute("type", "number");
                        itemsInput.classList.add("itemQuantity");
                        itemsInput.setAttribute("name", "itemQuantity");
                        itemsInput.setAttribute("min", "1");
                        itemsInput.setAttribute("max", "100");
                        quantityValue = parseInt(`${panier[i].quantity}`);
                        itemsInput.setAttribute("value", quantityValue);
                        itemsParamQte.appendChild(itemsInput);
        
                        let itemsParamDelete = document.createElement("div");
                        itemsParamDelete.classList.add("cart__item__content__settings__delete");
                        itemsBlocParam.appendChild(itemsParamDelete);
        
                        let itemsDelete = document.createElement("p");
                        itemsDelete.classList.add("deleteItem");
                        itemsDelete.textContent = "Supprimer";
                        itemsParamDelete.appendChild(itemsDelete);
                    }
                }   
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
                    let quantityButton = document.querySelectorAll('.itemQuantity');
                    for(let button of Array.from(quantityButton)){
                        button.addEventListener("change", evt =>{
                            console.log("quantité modifiée !");
                            let getArticle = evt.target.closest(".cart__item");
                            let kanapId = getArticle.getAttribute('data-id');
                            let kanapColor = getArticle.getAttribute('data-color');
                            let quantityItem = evt.target.closest(".itemQuantity");
                            let kanapQuantity = quantityItem.getAttribute('value');
                            console.log(kanapQuantity);
                            let productInPanier = JSON.parse(localStorage.getItem("panier"));
                            const searchQuantityChange = productInPanier.find(element => element.id == kanapId && element.color == kanapColor);
                            searchQuantityChange.quantity = kanapQuantity;
                            localStorage.setItem("panier", JSON.stringify(productInPanier));
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
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        checkApi(url);
    }
}
getPanier(panier);