const [diagnostics_appJs, appJs] = await Deno.bundle(
  "./frontend/app.ts",
);

await Deno.writeTextFile("./frontend/build.app.js", appJs);

const [diagnostics_checkoutJs, checkoutJs] = await Deno.bundle(
  "./frontend/scripts/checkout.ts",
);

await Deno.writeTextFile("./frontend/scripts/build.checkout.js", checkoutJs);