const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/chat-stomp", {
      target: process.env.REACT_APP_SERVER_URL,
      ws: true,
    })
  );
};
