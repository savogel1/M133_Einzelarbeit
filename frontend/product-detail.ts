loadProductDetail();

export async function loadProductDetail() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    console.log(productId)
    let response = await fetch(`http://localhost:8000/product-detail/${productId}`, {
        //method: 'GET',
        mode: `no-cors`
    });
    let product = await response.json();

    document.querySelector("img").src = `./assets/${product.imgUrl}`;
    document.querySelector("h3").innerText = product.name;
    document.getElementById("label-productDescription").innerText = product.price;
    //document.getElementById("label-productPrice").innerText = product.specialOffer + " CHF" ?? product.normalPrice + " CHF";
}