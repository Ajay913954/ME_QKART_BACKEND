process.env.NODE_ENV = "test";

process.env.MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/qkart";

process.env.JWT_SECRET =
  process.env.JWT_SECRET || "test-secret";

