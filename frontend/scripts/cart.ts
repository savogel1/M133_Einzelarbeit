
const localhostUrl = "http://localhost:8000/";

export async function loadCart() {
    const cart = await getCart();

    let productsInCart = document.getElementById("cart-list");
    
    cart.products.forEach(product => {
        let link = document.createElement("a");
        let img = document.createElement("img");
        let title = document.createElement("h5");
        let amount = document.createElement("p");        
        let price = document.createElement("p");


        link.href = `./product-detail.html?productId=${product.id}`;        
        link.setAttribute("style", "color: black; text-decoration: none;");
        link.className = "d-flex w-100 justify-content-between cart-item";
        img.className = "cart-img";
        img.src = "../assets/" + product.imageName;
        title.innerText = product.productName;
        amount.innerText = "1";
        price.innerText = `Pro Stk: ${product.normalPrice} CHF`;
    
        link.appendChild(img);
        link.appendChild(title)
        link.appendChild(amount);
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