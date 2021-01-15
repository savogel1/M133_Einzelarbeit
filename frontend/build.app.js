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
    await fetch(localhostUrl1 + `cart/addAmount/${productId}`, {
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
const loadProducts1 = loadProducts2;
export { loadProducts1 as loadProducts };
async function loadProductDetail2() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    let response = await fetch(localhostUrl + `product/${productId}`, {
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
    let cart = await getCart();
    let table = document.getElementById("cart-table");
    cart.forEach((cartItem)=>{
        let product = cartItem[0];
        let amount = cartItem[1];
        let tr = document.createElement("tr");
        let tdProductImg = document.createElement("td");
        let tdProductTitle = document.createElement("th");
        let tdAmount = document.createElement("td");
        let tdPrice = document.createElement("td");
        let img = document.createElement("img");
        let amountElement = document.createElement("p");
        let addAmountBtn = document.createElement("button");
        let removeAmountBtn = document.createElement("button");
        tdProductTitle.setAttribute("scope", "row");
        img.className = "cart-img";
        img.src = "../assets/" + product.imageName;
        tdProductTitle.textContent = product.productName;
        amountElement.innerText = amount;
        tdPrice.textContent = product.specialOffer;
        addAmountBtn.innerText = "+";
        addAmountBtn.className = "btn btn-outline-dark btn-sm amount-btn";
        addAmountBtn.onclick = async ()=>{
            await fetch(localhostUrl1 + `cart/addAmount/${product.id}`, {
                method: 'POST'
            });
            window.location.reload();
        };
        removeAmountBtn.innerText = "-";
        removeAmountBtn.className = "btn btn-outline-dark btn-sm amount-btn";
        removeAmountBtn.onclick = async ()=>{
            await fetch(localhostUrl1 + `cart/removeAmount/${product.id}`, {
                method: 'POST'
            });
            window.location.reload();
        };
        tdProductImg.appendChild(img);
        tdAmount.appendChild(removeAmountBtn);
        tdAmount.appendChild(amountElement);
        tdAmount.appendChild(addAmountBtn);
        tr.appendChild(tdProductImg);
        tr.appendChild(tdProductTitle);
        tr.appendChild(tdAmount);
        tr.appendChild(tdPrice);
        table.appendChild(tr);
    });
}
const loadCart1 = loadCart2;
export { loadCart1 as loadCart };
