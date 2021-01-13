export async function loadProducts() {
    let products = await getProducts();

    products.forEach(product => {
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

async function getProducts() {
    let response = await fetch('http://localhost:8000/overview', {
        method: 'GET',
    });
    return await response.json();
}