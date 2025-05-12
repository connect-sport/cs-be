const gateway = require("./gateway/src/app");
const PORT = process.env.PORT || 3000;

gateway.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
