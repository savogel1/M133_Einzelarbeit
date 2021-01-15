import { Product } from "./product.ts";

export type Cart = {
    cartItem: [product: Product, amount: number][];
}