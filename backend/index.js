import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.get("/api/restaurants", async (req, res) => {
  const lat = req.query.lat || "12.9628669";
  const lng = req.query.lng || "77.57750899999999";

  const swiggyURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  try {
    const response = await fetch(swiggyURL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "Failed to fetch Swiggy data",
        status: response.status,
        details: text,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

app.get("/api/menu", async (req, res) => {
  const { resId} = req.query;

  try {
    if (resId) {
      try {
        const liveUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9716&lng=77.5946&restaurantId=${resId}`;
        const response = await fetch(liveUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            Accept: "application/json,text/html,*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            Referer: `https://www.swiggy.com/restaurants/`,
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        });

        const text = await response.text();

        if (!text.trim()) {
          console.warn(`Empty response for ${resId}`);
          throw new Error("Empty response");
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.warn(` Not JSON response for ${resId}`);
          throw new Error("Invalid JSON");
        }

        if (data?.data) return res.json(data);
        else throw new Error("No valid data property");
      } catch (err) {
        console.error("Swiggy live fetch failed:", err.message);
      }
    }

    const defaultMockPath = path.resolve(__dirname, `./MockData/mockData.json`);
    if (fs.existsSync(defaultMockPath)) {
      const mockData = JSON.parse(fs.readFileSync(defaultMockPath, "utf-8"));
      return res.json(mockData);
    }

    res.status(404).json({ error: "No menu data found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Swiggy Backend API is running");
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
