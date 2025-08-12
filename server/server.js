import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Configs/Db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();

// Connect DB  
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send("Server is running");
});

app.use('/api/user', userRouter );
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
