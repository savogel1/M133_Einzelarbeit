
const localhostUrl = "http://localhost:8000/";

export async function loadCart() {
    const cart = await getCart();

    let productsInCart = document.getElementById("cart-list");
    
    cart.products.forEach(product => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = product.productName;
        productsInCart.appendChild(li);
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