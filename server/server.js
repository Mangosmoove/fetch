import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 8000;
const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/auth/login", async (req, res) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);

    const cookies = response.headers["set-cookie"];
    if (cookies) {
      res.setHeader("set-cookie", cookies);
    }

    res.json(response.data);
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: "Login failed" });
  }
});

app.get("/api/dogs/breeds", async (req, res) => {
  try {
    console.log(req.headers);
    if (!req.headers.cookie) {
      return res.status(401).json({ error: "Unauthorized: No cookie found" });
    }

    const response = await axios.get(`${API_BASE_URL}/dogs/breeds`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.cookie, // Pass the cookies from the incoming request
      },
      withCredentials: true, // Ensure credentials (cookies) are included
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error in /api/dogs/breeds:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () =>
  console.log(`Proxy server running on http://localhost:${PORT}`)
);
