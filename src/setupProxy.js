const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://76aa-83-24-150-181.ngrok-free.app",
      changeOrigin: true,
    }),
  );
};
