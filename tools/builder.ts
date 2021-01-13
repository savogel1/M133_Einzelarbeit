const [diagnostics_overviewJS, overviewJS] = await Deno.bundle(
    "./frontend/shop-overview.ts",
);

await Deno.writeTextFile("./frontend/build.shop-overview.js", overviewJS);

const [diagnostics_productDetailJS, productDetailJS] = await Deno.bundle(
  "./frontend/product-detail.ts",
);

await Deno.writeTextFile("./frontend/build.product-detail.js", productDetailJS);