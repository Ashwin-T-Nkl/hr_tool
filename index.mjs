import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
//import { swaggerUi, specs } from "./config/swagger.js";
import serverless from 'serverless-http';
import vendorRoutes from "./routes/vendorRoutes.js";
import licenseRoutes from "./routes/licenseRoutes.js";
import orgLicenseRoutes from "./routes/orgLicenseRoutes.js";
import CandidateRoutes from "./routes/CandidateRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import jobSearchRoutes from "./routes/jobSearchRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger documentation route
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/users", userRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/plan", licenseRoutes);
app.use("/api/vendor", orgLicenseRoutes);
app.use("/api/candidate", CandidateRoutes);
app.use("/api/org_license", CandidateRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/jobSearch", jobSearchRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export const handler = serverless(app);
