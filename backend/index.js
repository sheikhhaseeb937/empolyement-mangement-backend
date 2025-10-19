import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongDB from "./src/config/db.js";
import Authrouter from "./src/routes/auth.routes.js";





const app = express();
    dotenv.config();

app.use(cors());

app.use(express.json());


mongDB();  

app.use("/api", Authrouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;