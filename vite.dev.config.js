import { defineConfig } from "vite";

function reloadOnSiteChange() {
  return {
    name: "explore-w-reload",

    configureServer(server) {
      let timer = null;

      const watched = [
        "/react-dist/",
        "/css/",
        "/javascript/",
        "/html/",
      ];

      const maybeReload = (file) => {
        const path = file.replace(/\\/g, "/");

        if (!watched.some((folder) => path.includes(folder))) {
          return;
        }

        clearTimeout(timer);

        timer = setTimeout(() => {
          server.ws.send({ type: "full-reload" });
        }, 150);
      };

      server.watcher.on("change", maybeReload);
      server.watcher.on("add", maybeReload);
    },
  };
}

export default defineConfig({
  plugins: [
    reloadOnSiteChange(),

    {
      name: "explore-w-home-redirect",

      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/" || req.url?.startsWith("/?")) {
            res.statusCode = 302;
            res.setHeader("Location", "/html/index.html");
            res.end();
            return;
          }

          next();
        });
      },
    },
  ],

  optimizeDeps: {
    entries: [],
  },

  server: {
    port: 5173,
    open: "/html/index.html",
  },

  appType: "mpa",
});