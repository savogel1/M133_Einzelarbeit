import { updateCart } from "./cart.ts";

const localhostUrl = "http://localhost:8000/";

document.getElementById("checkout-form").addEventListener("submit", checkoutPurchase);

export async function checkoutPurchase(event: any) { 
    event.preventDefault();

    let prename = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let user = {prename, lastname, email};

    let response = await fetch(localhostUrl + `cart/checkout`, {
        method: 'POST',
        body: JSON.stringify(user)
    });
    await updateCart();

    let message = await response.json();
    if (message != "") {
        alert(message);
    } else {
        alert("Einkauf wurde erfolgreich abgeschlossen!");
        window.location.href = "http://localhost:8000/index.html";
    }
}