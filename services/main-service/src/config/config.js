const NODE_ENV = process.env.NODE_ENV || "development";
const HOST = NODE_ENV === "development" ? "http://localhost" : process.env.HOST;
const HOST_PORT = NODE_ENV === "development" ? "3000" : process.env.HOST_PORT;
const PORT = NODE_ENV === "development" ? "5004" : process.env.PORT;
const MONGO_URI =
  NODE_ENV === "development"
    ? "mongodb://localhost:27017/connect-sport"
    : process.env.MONGO_URI;

module.exports = {
  HOST,
  HOST_PORT,
  PORT,
  MONGO_URI,
  NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
};
