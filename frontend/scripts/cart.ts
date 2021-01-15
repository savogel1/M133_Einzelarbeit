import { Cart } from '../../backend/classes/cart.ts';
import { Product } from '../../backend/classes/product.ts';

const localhostUrl = "http://localhost:8000/";

export async function loadCart() {
    let cart: [Product, number][] = await getCart();

    let productsInCart = document.getElementById("cart-list");
    cart.forEach(cartItem => {
        let product = cartItem[0];
        let amount = cartItem[1];

        let link = document.createElement("a");
        let img = document.createElement("img");
        let title = document.createElement("h5");
        let amountP = document.createElement("p");        
        let price = document.createElement("p");


        link.href = `./product-detail.html?productId=${product.id}`;        
        link.setAttribute("style", "color: black; text-decoration: none;");
        link.className = "d-flex w-100 justify-content-between cart-item";
        img.className = "cart-img";
        img.src = "../assets/" + product.imageName;
        title.innerText = product.productName;
        amountP.innerText = amount;
        price.innerText = `Pro Stk: ${product.normalPrice} CHF`;
    
        link.appendChild(img);
        link.appendChild(title)
        link.appendChild(amountP);
        link.appendChild(price);
        
        productsInCart.appendChild(link);
    });
}

export async function addToCart() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    await fetch(localhostUrl + `addToCart/${productId}`, {
        method: 'POST'
    });
} 

async function getCart() {
    let response = await fetch(localhostUrl + 'cart', {
        method: 'GET',
    });
    return await response.json();
}