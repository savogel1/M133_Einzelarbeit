async function getProducts() {
    let response = await fetch('overview', {
        method: 'GET'
    });
    return await response.json();
}
const localhostUrl = "http://localhost:8000/";
const localhostUrl1 = "http://localhost:8000/";
async function addToCart() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    await fetch(localhostUrl1 + `addToCart/${productId}`, {
        method: 'POST'
    });
}
async function getCart() {
    let response = await fetch(localhostUrl1 + 'cart', {
        method: 'GET'
    });
    return await response.json();
}
async function loadProducts2() {
    let products = await getProducts();
    products.forEach((product)=>{
        let overview = document.getElementById("shop-overview");
        let link = document.createElement("a");
        let productDiv = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("h5");
        let price = document.createElement("p");
        link.href = `./pages/product-detail.html?productId=${product.id}`;
        link.setAttribute("style", "color: black; text-decoration: none;");
        productDiv.className = "card";
        img.className = "product-img";
        img.src = "./assets/" + product.imageName;
        title.innerText = product.productName;
        price.innerText = product.normalPrice;
        link.appendChild(productDiv);
        productDiv.appendChild(title);
        productDiv.appendChild(img);
        productDiv.appendChild(price);
        overview.appendChild(link);
    });
}
const loadProducts1 = loadProducts2;
export { loadProducts1 as loadProducts };
async function loadProductDetail2() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    let response = await fetch(localhostUrl + `product-detail/${productId}`, {
        mode: `no-cors`
    });
    let product = await response.json();
    document.getElementById("product-detail-img").src = `../assets/${product.imageName}`;
    document.getElementById("product-title").innerText = product.productName;
    document.getElementById("product-price").innerText = "Das Produkt kostet: " + product.normalPrice + " CHF";
    document.getElementById("btn-add-to-cart").addEventListener('click', addToCart);
}
const loadProductDetail1 = loadProductDetail2;
export { loadProductDetail1 as loadProductDetail };
async function loadCart2() {
    const cart = await getCart();
    let productsInCart = document.getElementById("cart-list");
    cart.products.forEach((product)=>{
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
        link.appendChild(title);
        link.appendChild(amount);
        link.appendChild(price);
        productsInCart.appendChild(link);
    });
}
const loadCart1 = loadCart2;
export { loadCart1 as loadCart };
