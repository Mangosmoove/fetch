import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = 8000;
const API_BASE_URL = "https://frontend-take-home-service.fetch.com";
const allowedOrigins = process.env.NODE_ENV === 'production' ? [process.env.PROD_LINK] : [process.env.DEV_LINK];
console.log(allowedOrigins);
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
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

        const cookies = response.headers["set-cookie"];
        if (cookies) {
            res.setHeader("set-cookie", cookies);
        }

        res.json(response.data);
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({error: "Login failed"});
    }
});

app.post("/api/auth/logout", async (req, res) => {
    try {
        // const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     withCredentials: true,
        // });
        //
        // const cookies = response.headers["set-cookie"];
        // if (cookies) {
        //     res.setHeader("set-cookie", cookies);
        // }

        res.cookie('cookie', '', {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
        });

        res.json({status: 200, message: "Logout successful"});
    } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({error: "Logout failed"});
    }
});

app.get("/api/dogs/breeds", async (req, res) => {
    try {
        if (!req.headers.cookie) {
            return res.status(401).json({error: "Unauthorized: No cookie found"});
        }
        let {breeds} = req.query;

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
            .json({error: "Failed to fetch data"});
    }
});

app.get("/api/dogs/search", async (req, res) => {
    try {
        if (!req.headers.cookie) {
            return res.status(401).json({error: "Unauthorized: No cookie found"});
        }
        let {breeds, zipCodes, ageMin, ageMax, size, from, sort} = req.query;
        const params = new URLSearchParams();

        if (breeds) {
            if (typeof (breeds) === "string") {
                breeds = [breeds]
            }
            breeds.forEach((breed) => {
                params.append("breeds", breed);
            });
        }
        if (zipCodes) {
            if (typeof (zipCodes) === "string") {
                zipCodes = [zipCodes]
            }
            zipCodes.forEach((zipCode) => params.append("zipCodes", zipCode));
        }
        if (ageMin !== undefined) {
            params.append("ageMin", ageMin);
        }
        if (ageMax !== undefined) {
            params.append("ageMax", ageMax);
        }
        if (size !== undefined) {
            params.append("size", size.toString());
        }
        if (from) {
            params.append("from", from);
        }
        if (sort) {
            params.append("sort", sort);
        }

        const response = await axios.get(
            `${API_BASE_URL}/dogs/search?${params.toString()}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: req.headers.cookie,
                },
                withCredentials: true,
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(
            "Error in /api/dogs/search:",
            error.response?.data || error.message
        );
        res
            .status(error.response?.status || 500)
            .json({error: "Failed to fetch data"});
    }
});

app.post("/api/dogs/", async (req, res) => {
    try {
        if (!req.headers.cookie) {
            return res.status(401).json({error: "Unauthorized: No cookie found"});
        }

        // const ids = req.body;
        const ids = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({error: "Invalid request body, expected an array of dog IDs"});
        }

        const response = await axios.post(`${API_BASE_URL}/dogs`, ids, {
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.cookie,
            },
            withCredentials: true,
        });

        res.json(response.data);

    } catch (error) {
        console.error(
            "Error in /api/dogs/:",
            error.response?.data || error.message
        );
        res
            .status(error.response?.status || 500)
            .json({error: "Failed to fetch data"});
    }
})

app.post("/api/dogs/match", async (req, res) => {
    try {
        if (!req.headers.cookie) {
            return res.status(401).json({error: "Unauthorized: No cookie found"});
        }
        const ids = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({error: "Invalid request body, expected an array of dog IDs"});
        }

        const response = await axios.post(`${API_BASE_URL}/dogs/match`, ids, {
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.cookie,
            },
            withCredentials: true,
        });

        res.json(response.data);

    } catch (error) {
        console.error(
            "Error in /api/dogs/match:",
            error.response?.data || error.message
        );
        res
            .status(error.response?.status || 500)
            .json({error: "Failed to fetch data"});
    }
})


app.listen(PORT, () => {
        console.log(`Allowed origins: ${allowedOrigins}`);
        console.log(`Listening on port ${PORT}`);
    }
);
