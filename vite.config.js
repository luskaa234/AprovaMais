import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import createCheckoutHandler from "./api/create-checkout.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "aprovamais-local-api",
      configureServer(server) {
        server.middlewares.use("/api/create-checkout", async (req, res) => {
          let rawBody = "";
          req.on("data", (chunk) => {
            rawBody += chunk;
          });
          req.on("end", async () => {
            try {
              req.body = rawBody ? JSON.parse(rawBody) : {};
            } catch {
              req.body = {};
            }

            const response = {
              setHeader: (name, value) => res.setHeader(name, value),
              status: (code) => {
                res.statusCode = code;
                return response;
              },
              send: (payload) => res.end(payload),
              end: () => res.end(),
            };

            try {
              await createCheckoutHandler(req, response);
            } catch (error) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: error.message || "Falha no checkout local." }));
            }
          });
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
