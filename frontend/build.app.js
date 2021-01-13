async function getProducts() {
    let response = await fetch('http://localhost:8000/overview', {
        method: 'GET'
    });
    return await response.json();
}
async function loadProductDetail2() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    let response = await fetch(`http://localhost:8000/product-detail/${productId}`, {
        mode: `no-cors`
    });
    let product = await response.json();
    document.getElementById("product-detail-img").src = `../assets/${product.imgUrl}`;
    document.getElementById("product-title").innerText = product.name;
    document.getElementById("product-price").innerText = product.price;
}
const loadProductDetail1 = loadProductDetail2;
export { loadProductDetail1 as loadProductDetail };
async function loadProducts2() {
    let products = await getProducts();
    products.forEach((product)=>{
        let overview = document.getElementById("shop-overview");
        let link = document.createElement("a");
        let productDiv = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("h5");
        let price = document.createElement("p");
        img.src = "./assets/" + product.imgUrl;
        img.className = "product-img";
        title.innerText = product.name;
        price.innerText = product.price + ".-";
        productDiv.className = "card";
        link.href = `./pages/product-detail.html?productId=${product.id}`;
        link.setAttribute("style", "color: black; text-decoration: none;");
        link.appendChild(productDiv);
        productDiv.appendChild(title);
        productDiv.appendChild(img);
        productDiv.appendChild(price);
        overview.appendChild(link);
    });
}
const loadProducts1 = loadProducts2;
export { loadProducts1 as loadProducts };
