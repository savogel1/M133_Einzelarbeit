import { Router } from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { products } from "./classes/products.ts";

const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

let router = new Router();
const productList = products;

router.get('/overview', async (ctx) => {    
    ctx.response.body = JSON.stringify(productList);
    ctx.response.status = 200;
});

router.get(`/product-detail/:id`, async (ctx) => {
    ctx.response.body = getProduct(ctx.params.id!);
    ctx.response.status = 200;
});

function getProduct(id: any) {
    return productList.find((product) => product.id == id)!;
}

export const api = router.routes();