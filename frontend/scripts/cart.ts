import { Cart } from '../../backend/classes/cart.ts';
import { Product } from '../../backend/classes/product.ts';

const localhostUrl = "http://localhost:8000/";

export async function loadCart() {
    let cart: [Product, number][] = await getCart();

    let table = document.getElementById("cart-table");
    cart.forEach(cartItem => {
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
      
        tdProductTitle.setAttribute("scope", "row")
        img.className = "cart-img";
        img.src = "../assets/" + product.imageName;
        tdProductTitle.textContent = product.productName;
        amountElement.innerText = amount;
        tdPrice.textContent = product.specialOffer;
        addAmountBtn.innerText = "+";
        addAmountBtn.className = "btn btn-outline-dark btn-sm amount-btn";
        addAmountBtn.onclick = async () => {
            await fetch(localhostUrl + `cart/addAmount/${product.id}`, {
                method: 'POST',
            });
            window.location.reload();
          };
        removeAmountBtn.innerText = "-";
        removeAmountBtn.className = "btn btn-outline-dark btn-sm amount-btn";
        removeAmountBtn.onclick = async () => { 
            await fetch(localhostUrl + `cart/removeAmount/${product.id}`, {
                method: 'POST',
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

export async function addToCart() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    await fetch(localhostUrl + `cart/addAmount/${productId}`, {
        method: 'POST'
    });
} 

async function getCart() {
    let response = await fetch(localhostUrl + 'cart', {
        method: 'GET',
    });
    return await response.json();
}