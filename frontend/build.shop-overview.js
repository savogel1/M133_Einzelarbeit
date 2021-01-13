async function getProducts() {
    let response = await fetch('http://localhost:8000/overview', {
        method: 'GET'
    });
    return await response.json();
}
async function loadProducts() {
    let products = await getProducts();
    products.forEach((product)=>{
        let overview = document.getElementById("shop-overview");
        let link = document.createElement("a");
        let productDiv = document.createElement("div");
        let title = document.createElement("p");
        let price = document.createElement("p");
        link.href = `./product-detail.html?productId=${product.id}`;
        title.innerText = product.name;
        price.innerText = product.price + ".-";
        link.className = "product-div";
        link.appendChild(productDiv);
        productDiv.appendChild(title);
        productDiv.appendChild(price);
        overview.appendChild(link);
    });
}
loadProducts();
