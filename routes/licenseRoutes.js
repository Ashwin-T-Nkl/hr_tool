import express from "express";
import {
  addLicense,
  fetchLicenseByid,
  updateLicense,
  getAllLicenses
} from "../controllers/licenseController.js";

const router = express.Router();

router.post("/add", addLicense);

router.post("/get", fetchLicenseByid);

router.post("/get_all", getAllLicenses);

router.post("/update", updateLicense);

export default router;