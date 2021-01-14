const localhostUrl = "http://localhost:8000/";
export async function checkoutPurchase() {
    await fetch(localhostUrl + `cart/removeAll`, {
        method: 'POST'
    });
}
document.getElementById("checkout-form").addEventListener("submit", checkoutPurchase);
