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
    console.log(amount)
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

router.post(`/cart/removeAll`, async (ctx) => {
    let cart = new Map<string, number>();
    await ctx.state.session.set("cart", {cart});
    
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

export const api = router.routes();