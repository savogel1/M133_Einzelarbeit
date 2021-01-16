const [diagnostics_appJs, appJs] = await Deno.bundle(
  "./src/frontend/app.ts",
);

await Deno.writeTextFile("./src/frontend/build.app.js", appJs);

const [diagnostics_checkoutJs, checkoutJs] = await Deno.bundle(
  "./src/frontend/scripts/checkout.ts",
);

await Deno.writeTextFile("./src/frontend/scripts/build.checkout.js", checkoutJs);