const url = "http://localhost:3000/api/products";
const itemsBloc = document.getElementById("items");

function getData(url){
    fetch(url)
        .then(function(response){
            if (response.ok) {
                let data = response.json();
                return data;
            }  
        })
        .then(function(value) {

            for(let items of value) {
                
                let itemsLink = document.createElement("a");
                itemsLink.setAttribute("href", `./product.html?id=${items._id}`);
                itemsBloc.appendChild(itemsLink);

                let itemsArticle = document.createElement("article");
                itemsLink.appendChild(itemsArticle);

                let itemsImg = document.createElement("img");
                itemsImg.setAttribute("src", `${items.imageUrl}`);
                itemsImg.setAttribute("alt", `${items.altTxt}`);
                itemsArticle.appendChild(itemsImg);

                let itemsTitle = document.createElement("h3");
                itemsTitle.classList.add("productName");
                itemsTitle.textContent = `${items.name}`;
                itemsArticle.appendChild(itemsTitle);

                let itemsTxt = document.createElement("p");
                itemsTxt.classList.add("productDescription");
                itemsTxt.textContent = `${items.description}`;
                itemsArticle.appendChild(itemsTxt);
            }
            
        })
        .catch(function(error) {
            console.log(error);
        });
}

getData(url)
