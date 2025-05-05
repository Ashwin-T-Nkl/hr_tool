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
import jobSearch from "./routes/jobSearchRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   const chunks = [];
  
//   req.on('data', (chunk) => {
//     chunks.push(chunk);
//   });
  
//   req.on('end', () => {
//     if (chunks.length > 0) {
//       const buffer = Buffer.concat(chunks);
//       const bodyString = buffer.toString('utf8');
      
//       try {
//         req.body = JSON.parse(bodyString);
//       } catch (error) {
//         // If JSON parsing fails, store the raw string
//         req.body = {};
//         req.rawBodyString = bodyString;
//       }
//     }
//     next();
//   });
  
//   req.on('error', (err) => {
//     next(err);
//   });
// });

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});


// export const handler = serverless(app);