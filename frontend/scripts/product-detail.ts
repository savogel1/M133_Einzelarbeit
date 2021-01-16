import { Product } from "../../backend/classes/product.ts";
import { addToCart } from "./cart.ts";

const localhostUrl = "http://localhost:8000/";

export async function loadProductDetail() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    let response = await fetch(localhostUrl + `product/${productId}`, {
        mode: `no-cors`
    });
    let product: Product = await response.json();

    document.getElementById("product-detail-img").src = `../assets/${product.imageName}`;
    document.getElementById("product-title").innerText = product.productName;
    document.getElementById("product-price").innerText = "Das Produkt kostet: " + product.specialOffer + " CHF";
    document.getElementById("btn-add-to-cart").addEventListener('click', addToCart);
}

