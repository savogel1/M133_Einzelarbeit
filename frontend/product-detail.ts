loadProductDetail();

export async function loadProductDetail() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    let response = await fetch(`http://localhost:8000/product-detail/${productId}`, {
        mode: `no-cors`
    });
    let product = await response.json();

    document.getElementById("product-detail-img").src = `./assets/${product.imgUrl}`;
    document.getElementById("product-title").innerText = product.name;
    document.getElementById("product-price").innerText = product.price;
}