//constante pour récupérer les items du localStorage
const panier = JSON.parse(localStorage.getItem("panier"));
// url de l'API
const url = `http://localhost:3000/api/products`;
//Pointeur pour création de carte produit pour 1 item
const card = document.getElementById("cart__items");

// création d'une fonction pour récupérer et afficher les items du panier(localStorage)
function getPanier(panier){
    //boucle qui va parcourir le localStorage, s'arrête à la fin de la liste
    for(let i=0; i<panier.length; i++){
        //fonction d'appelle de l'API pour récupérer les valeurs de l'API
        function checkApi (url){
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
                            itemsArticle.setAttribute("data-id", "{product-ID}");
                            itemsArticle.setAttribute("data-color", "{product-color}");
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
                            itemsPrice.textContent = `${items.price}` * `${panier[i].quantity}`;
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
                            itemsInput.setAttribute("value", `${panier[i].quantity}`);
                            itemsParamQte.appendChild(itemsInput);
        
                            let itemsParamDelete = document.createElement("div");
                            itemsParamDelete.classList.add("cart__item__content__settings__delete");
                            itemsBlocParam.appendChild(itemsParamDelete);
        
                            let itemsDelete = document.createElement("p");
                            itemsDelete.textContent = "Supprimer";
                            itemsParamDelete.appendChild(itemsDelete);
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        //Appel de la fonction pour chaque item du localStorage, en concordance avec leurs id
        checkApi(url);
    }
}

getPanier(panier);