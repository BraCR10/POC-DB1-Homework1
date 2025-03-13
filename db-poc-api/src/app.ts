import express, { Request, Response } from "express";
import { initConnection } from "./config/db.config";
import Router from "./routes";
const app = express();

app.use(express.json());
app.use("/api", Router);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initConnection();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error details: ", error);
    process.exit(1);
  }
};

startServer();
