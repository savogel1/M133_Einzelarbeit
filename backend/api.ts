import { Router } from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { productsArray } from "./classes/productArray.ts";

const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

let router = new Router();
const products = productsArray;

router.get('/overview', async (ctx) => {    
    ctx.response.body = JSON.stringify(products);
    ctx.response.status = 200;
});

router.get(`/product-detail/:id`, async (ctx) => {
    ctx.response.body = getProduct(ctx.params.id!);
    ctx.response.status = 200;
});

function getProduct(id: any) {
    return products.find((product) => product.id == id)!;
}

export const api = router.routes();