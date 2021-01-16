const localhostUrl = "http://localhost:8000/";
async function getCart() {
    let response = await fetch(localhostUrl + 'cart', {
        method: 'GET'
    });
    return await response.json();
}
async function updateCart() {
    let response = await fetch(localhostUrl + 'cart/total', {
        method: 'GET'
    });
    document.getElementById("total").innerHTML = await response.json();
}
const localhostUrl1 = "http://localhost:8000/";
export async function checkoutPurchase(event) {
    event.preventDefault();
    let prename = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let user = {
        prename,
        lastname,
        email
    };
    let response = await fetch(localhostUrl1 + `cart/checkout`, {
        method: 'POST',
        body: JSON.stringify(user)
    });
    await updateCart();
    let message = await response.json();
    if (message != "") {
        alert(message);
    } else {
        alert("Einkauf wurde erfolgreich abgeschlossen!");
        window.location.href = "http://localhost:8000/";
    }
}
document.getElementById("checkout-form").addEventListener("submit", checkoutPurchase);
