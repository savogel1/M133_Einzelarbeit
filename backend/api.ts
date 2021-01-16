import { Router } from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Product } from "./classes/product.ts";
import { Cart } from "./classes/cart.ts";


const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

const products: Product[] = JSON.parse(await Deno.readTextFile("./backend/classes/products.json"));

let router = new Router();

router.get('/overview', async (ctx) => {    
    ctx.response.body = products;
    ctx.response.status = 200;
});

router.get(`/product/:id`, async (ctx) => {
    ctx.response.body = getProduct(ctx.params.id!);
    ctx.response.status = 200;
});

router.post(`/cart/addAmount/:id`, async (ctx) => {    
    let cart = await getCart(ctx);
    let product = getProduct(ctx.params.id!);

    const amount = cart.get(product.id);
    if (amount == undefined) {
        cart.set(product.id, 1);
    } else {
        cart.set(product.id, amount + 1);
    }

    await ctx.state.session.set("cart", cart);
    ctx.response.status = 200;
});

router.post(`/cart/removeAmount/:id`, async (ctx) => {    
    let cart = await getCart(ctx);
    let product = getProduct(ctx.params.id!);

    const amount = cart.get(product.id);
    if (amount == undefined) {
        let cart = new Map<string, number>();
        await ctx.state.session.set("cart", {cart});
    } else if (amount <= 1) {
        cart.delete(product.id);
    } else {
        cart.set(product.id, amount - 1);
    }
    
    await ctx.state.session.set("cart", cart);
    ctx.response.status = 200;
});

router.post(`/cart/checkout`, async (ctx) => {
    if (!ctx.request.hasBody) {
        ctx.response.body = JSON.stringify("Bitte Benutzerdaten eingeben!");
        return;
    }

    const userData = await ctx.request.body();
    const user: { prename: string, lastname: string, email: string } = JSON.parse(await userData.value);

    let message = validate(user);
    
    if (message == "") { 
        let cart = await ctx.state.session.get("cart");
        cart = new Map<string, number>();
        await ctx.state.session.set("cart", cart);
    }

    ctx.response.body = JSON.stringify(message);
    ctx.response.status = 200;
});

router.get(`/cart/total`, async (ctx) => {
    const cart = await getCart(ctx);
    var totalPrice = 0;

    cart.forEach((amount: number, id: string) => {
        let product = getProduct(id);
        totalPrice += product.specialOffer * amount;
    });

    ctx.response.body = Math.round(totalPrice * 100) / 100;
    ctx.response.status = 200;
});

router.get(`/cart`, async (ctx) => {
    const cart = await getCart(ctx);
    let newCart: [Product, number][] = [];

    cart.forEach((amount: number, id: string) => {
        newCart.push([getProduct(id), amount]);
    });

    ctx.response.body = newCart;
    ctx.response.status = 200;
});

async function getCart(ctx: any): Promise<Map<string, number>> {
    if (await ctx.state.session.get("cart") == undefined) {
        let cart = new Map<string, number>();
        await ctx.state.session.set("cart", cart);
    }
    return await ctx.state.session.get("cart");
}

function getProduct(id: any) {
    return products.find((product) => product.id == id)!;
}

function validate(user: {prename: string, lastname: string, email: string}) {
    if (user.prename == undefined || user.prename.trim().length == 0) {
        return "Bitte Vornamen eingeben!";
    }

    if (user.lastname == undefined || user.lastname.trim().length == 0) {
        return "Bitte Nachnamen eingeben!";
    }

    if (user.email == undefined || user.email.trim().length == 0) {
        return "Bitte E-Mail eingeben!";
    }
    return "";
}

export const api = router.routes();