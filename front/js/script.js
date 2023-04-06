// Adresse url de l'API
const url = "http://localhost:3000/api/products";

// Création d'une fonction pour faire appel à l'Api
function getData(url){
    fetch(url)
    // Appel à l'api
        .then(function(response){
            //si l'appel à l'Api est ok
            if (response.ok) {
                //renvoyer les données en format Json
                let data = response.json();
                return data;
            }  
        })
        // traitement des donées récupérées
        .then(function(value) {
            // Variable pour pointer la section avec l'id "items"
            let itemsBloc = document.getElementById("items");
            // Création d'une boucle qui va parcourir l'api
            for(let items of value) {
                //création d'un bloc html via javascript
                //création d'un élément <a> (lien)
                let itemsLink = document.createElement("a");
                //création d'un attribut "href" + (valeur = page produit de l'item via son Id par la boucle)
                itemsLink.setAttribute("href", `./product.html?id=${items._id}`);
                //le lien créé devient enfant de itemsBloc
                itemsBloc.appendChild(itemsLink);
                //création d'un élément <article>
                let itemsArticle = document.createElement("article");
                //l'article crée devient enfant du lien précédement crée
                itemsLink.appendChild(itemsArticle);
                //création d'un élément <image>
                let itemsImg = document.createElement("img");
                //Attribut "src" à l'élément <image> +(valeur = variable de l'image par la boucle)
                itemsImg.setAttribute("src", `${items.imageUrl}`);
                //Attribut "alt" à l'élément <image> +(valeur = variable de déscription de l'image par la boucle)
                itemsImg.setAttribute("alt", `${items.altTxt}`);
                //l'élément image crée devient enfant de l'article précédement crée
                itemsArticle.appendChild(itemsImg);
                //création d'un élément <titre>
                let itemsTitle = document.createElement("h3");
                //Ajout d'une class à l'élément
                itemsTitle.classList.add("productName");
                //Ajout d'un contenu texte déterminé par la boucle dans l'élément titre
                itemsTitle.textContent = `${items.name}`;
                //L'élément titre devient enfant de l'élément article
                itemsArticle.appendChild(itemsTitle);
                //création d'un élément <paragraphe>
                let itemsTxt = document.createElement("p");
                //Ajout d'une class à l'élément
                itemsTxt.classList.add("productDescription");
                //Ajout d'un contenu texte déterminé par la boucle dans l'élément paragraphe (description)
                itemsTxt.textContent = `${items.description}`;
                //L'élément <p> devient enfant de l'élément article
                itemsArticle.appendChild(itemsTxt);
            }
            
        })
        //si l'appel à l'Api échoue, une erreur aparait en console
        .catch(function(error) {
            console.log(error);
        });
}
//Appel de la fonction d'Appel à l'Api et le traitement des données récupérées
getData(url)