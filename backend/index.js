import express from "express";
import cors from "cors";
import compression from "compression";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(compression());
app.use(express.json());

const CACHE_TTL = 5 * 60 * 1000;
const UPSTREAM_TIMEOUT_MS = 5000;
const UPSTREAM_RETRIES = 2;

const restaurantCache = new Map();
const menuCache = new Map();

const getCache = (cache, key) => {
  const cached = cache.get(key);

  if (!cached) return null;

  if (Date.now() > cached.expiresAt) {
    cache.delete(key);
    return null;
  }

  return cached.data;
};

const setCache = (cache, key, data) => {
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL,
  });
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchJSON = async (url, headers = {}, attempt = 1) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      if (response.status >= 500 && attempt <= UPSTREAM_RETRIES) {
        await sleep(300 * attempt);
        return fetchJSON(url, headers, attempt + 1);
      }
      const message = `Request failed (${response.status}) ${text.slice(0, 200)}`;
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    if (
      attempt <= UPSTREAM_RETRIES &&
      (error.name === "AbortError" || error.message?.includes("fetch"))
    ) {
      await sleep(300 * attempt);
      return fetchJSON(url, headers, attempt + 1);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

app.get("/api/restaurants", async (req, res) => {
  const lat = req.query.lat || "12.9628669";
  const lng = req.query.lng || "77.57750899999999";

  const key = `${lat}:${lng}`;

  const cached = getCache(restaurantCache, key);

  if (cached) {
    return res.json(cached);
  }

  try {
    const url =
      `https://www.swiggy.com/dapi/restaurants/list/v5` +
      `?lat=${lat}` +
      `&lng=${lng}` +
      `&is-seo-homepage-enabled=true` +
      `&page_type=DESKTOP_WEB_LISTING`;

    const data = await fetchJSON(url, {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
    });

    setCache(restaurantCache, key, data);

    res.json(data);
  } catch (err) {
    console.error("Restaurant fetch failed:", err.message);

    res.status(500).json({
      error: "Unable to fetch restaurants",
    });
  }
});

app.get("/api/menu", async (req, res) => {
  const { resId } = req.query;

  if (!resId) {
    return res.status(400).json({
      error: "Restaurant id is required",
    });
  }

  const cached = getCache(menuCache, resId);

  if (cached) {
    return res.json(cached);
  }

  try {
    const url =
      `https://www.swiggy.com/dapi/menu/pl` +
      `?page-type=REGULAR_MENU` +
      `&complete-menu=true` +
      `&lat=12.9716` +
      `&lng=77.5946` +
      `&restaurantId=${resId}`;

    const data = await fetchJSON(url, {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
    });

    if (!data?.data) {
      throw new Error("Invalid menu response");
    }

    setCache(menuCache, resId, data);

    return res.json(data);
  } catch (err) {
    console.warn("Live menu unavailable:", err.message);

    try {
      const mockPath = path.join(__dirname, "MockData", "mockData.json");

      const file = await fs.readFile(mockPath, "utf-8");

      return res.json(JSON.parse(file));
    } catch {
      return res.status(500).json({
        error: "Unable to fetch menu",
      });
    }
  }
});

app.get("/", (_, res) => {
  res.send("Swiggy Backend API is running successfully.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
