const panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);
const card = document.getElementById("cart__items");
const url = `http://localhost:3000/api/products`;

function getPanier(url){
    fetch(url)
        .then(function(response){
            if (response.ok) {
                return response.json();
            }  
        })
        .then(function(value) {
            
            for(let items of value) {
                let i = 0;  
                if (panier[i].id == items._id) {
                    
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

                    /*let ecouteBouton = document.querySelector("cart__item__content__settings__delete" p);
                    if {
                        itemsDelete.addEventListener('click', addPanier);
                    }*/
                }
                else {
                    console.log("ça marche pas");
                }
                
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

getPanier(url)