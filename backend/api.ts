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

router.get(`/product-detail/:id`, async (ctx) => {
    ctx.response.body = getProduct(ctx.params.id!);
    ctx.response.status = 200;
});

router.post(`/addToCart/:id`, async (ctx) => {    
    const cart = await getCart(ctx);
    let product = getProduct(ctx.params.id!);
    cart.products.push(product);
    await ctx.state.session.set("cart", cart);

    ctx.response.body = cart;
    ctx.response.status = 200;
});

router.get(`/cart`, async (ctx) => {
    ctx.response.body = await getCart(ctx);
    ctx.response.status = 200;
});

async function getCart(ctx: any) {
    if (await ctx.state.session.get("cart") == undefined) {
        await ctx.state.session.set("cart", {products: []});
    }
    return await ctx.state.session.get("cart");
}

function getProduct(id: any) {
    return products.find((product) => product.id == id)!;
}

export const api = router.routes();