const localhostUrl = "http://localhost:8000/";

document.getElementById("checkout-form").addEventListener("submit", checkoutPurchase);

export async function checkoutPurchase() {
    await fetch(localhostUrl + `cart/removeAll`, {
        method: 'POST'
    });
}