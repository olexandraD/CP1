const goods = [];

async function populate() {
    const requestURL = "https://api.jsonbin.io/v3/b/673c73c1acd3cb34a8ab125f"; 
    const request = new Request(requestURL);

    try {
        const response = await fetch(request);
        if (response.ok) {
            const data = await response.json();
            createGoodsArray(data.record); 
            showHeader(); 
            showGoods(); 
        } else {
            alert("Помилка завантаження даних!");
        }
    } catch (error) {
        console.error("Помилка:", error);
    }
}

function createGoodsArray(goodsData) {
    goodsData.forEach(item => {
        const product = new Good(item.name, item.type); 
        goods.push(product);
    });
}

class Good {
    constructor(name, type) {
        this.name = name; 
        this.type = type; 
    }
}

function showHeader() {
    const header = document.querySelector("header");
    const myH1 = document.createElement("h1");
    myH1.innerText = "Список товарів за категоріями";
    header.appendChild(myH1);
}

function showGoods() {
    const main = document.querySelector("article");

    const divProducts = document.createElement("div");
    const divIndustrial = document.createElement("div");
    const divClothing = document.createElement("div");

    const myH2Products = document.createElement("h2");
    const myH2Industrial = document.createElement("h2");
    const myH2Clothing = document.createElement("h2");

    myH2Products.textContent = "Продукти";
    myH2Industrial.textContent = "Промислові товари";
    myH2Clothing.textContent = "Одяг";

    const myListProducts = document.createElement("ul");
    const myListIndustrial = document.createElement("ul");
    const myListClothing = document.createElement("ul");

    goods.forEach(product => {
        const listItem = document.createElement("li");
        listItem.textContent = product.name;

        if (product.type === "продукти") {
            myListProducts.appendChild(listItem);
        } else if (product.type === "промислові") {
            myListIndustrial.appendChild(listItem);
        } else if (product.type === "одяг") {
            myListClothing.appendChild(listItem);
        }
    });

    divProducts.appendChild(myH2Products);
    divProducts.appendChild(myListProducts);

    divIndustrial.appendChild(myH2Industrial);
    divIndustrial.appendChild(myListIndustrial);

    divClothing.appendChild(myH2Clothing);
    divClothing.appendChild(myListClothing);

    main.appendChild(divProducts);
    main.appendChild(divIndustrial);
    main.appendChild(divClothing);
}

populate();
