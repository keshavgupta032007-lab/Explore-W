import { build, createServer } from "vite";

console.log("Building React bundle (watching react/ for changes)...");
const watcher = await build({
  configFile: "vite.config.js",
  build: { watch: {} },
});

await new Promise((resolve) => {
  watcher.on("event", (event) => {
    if (event.code === "END") resolve();
    if (event.code === "ERROR") {
      console.error("React build error:", event.error?.message || event.error);
      resolve();
    }
  });
});

const server = await createServer({ configFile: "vite.dev.config.js" });
await server.listen();
server.printUrls();
console.log("Press Ctrl+C to stop.");

process.on("SIGINT", async () => {
  await watcher.close();
  await server.close();
  process.exit(0);
});
