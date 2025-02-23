const redis = require("redis");
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const client = redis.createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
});

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

process.on("SIGINT", async () => {
  console.log("Closing Redis connection...");
  await client.quit();
  process.exit(0);
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Connected to Redis");
  } catch (err) {
    console.error("Redis connection failed:", err);
    process.exit(1);
  }
})();

module.exports = client;
