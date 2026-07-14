import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js"

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }),
);
app.use(cookieParser())

app.use(express.json())

app.use("/api/registerCustomer", registerCustomerRoutes)
app.use("/api/registerAdmin", registerAdminRoutes)

export default app;