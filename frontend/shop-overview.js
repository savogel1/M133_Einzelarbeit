import { productsArray } from "./classes/productArray.js";

const products = productsArray;

products.forEach(product => {
    let overview = document.getElementById("shop-overview");
    let productDiv = document.createElement("div");
    let title = document.createElement("p");
    let price = document.createElement("p");

    title.innerText = product.name;
    price.innerText = product.price;
    productDiv.className = "product-div";
    productDiv.setAttribute("onclick", "location.href='product-detail.html';");

    productDiv.appendChild(title);
    productDiv.appendChild(price);
    overview.appendChild(productDiv);
});