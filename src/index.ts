import express from "express";
import characterRoutes from "./routes/characterRoutes";

const app = express();
app.use(express.json());

// Base Routes
app.use("/characters", characterRoutes);

// Server start
app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
