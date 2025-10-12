const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

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
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

app.get("/api/menu", async (req, res) => {
  const { resId } = req.query;

  if (!resId) {
    return res
      .status(400)
      .json({ error: "Missing required query parameter: resId" });
  }

  const menuURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}`;

  try {
    const response = await fetch(menuURL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "Failed to fetch menu from Swiggy",
        status: response.status,
        details: text,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Swiggy Backend API is running!");
});

app.listen(PORT, () => {
  console.log(` Backend server is running at http://localhost:${PORT}`);
});
