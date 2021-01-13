const [diagnostics_appJs, appJs] = await Deno.bundle(
  "./frontend/app.ts",
);

await Deno.writeTextFile("./frontend/build.app.js", appJs);