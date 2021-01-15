import { Product } from "../../backend/classes/product.ts";

const localhostUrl = "http:/localhost:8000/";

export async function loadProducts() {
    let products: Product[] = await getProducts();

    products.forEach(product => {
        let overview = document.getElementById("shop-overview");
        let link = document.createElement("a");
        let productDiv = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("h5");
        let del = document.createElement("del");
        let price = document.createElement("p");
        let specialOffer = document.createElement("p");
    
        link.href = `./pages/product-detail.html?productId=${product.id}`;
        link.setAttribute("style", "color: black; text-decoration: none;");
        productDiv.className = "card";
        img.className = "product-img";
        img.src = "./assets/" + product.imageName;
        title.innerText = product.productName;
        price.innerText = product.normalPrice;
        specialOffer.innerText = product.specialOffer;
    
        link.appendChild(productDiv);
        productDiv.appendChild(title);
        productDiv.appendChild(img);
        del.appendChild(price);
        productDiv.appendChild(del);
        productDiv.appendChild(specialOffer);
        overview.appendChild(link);
    });
}

async function getProducts() {
    let response = await fetch('overview', {
        method: 'GET',
    });
    return await response.json();
}