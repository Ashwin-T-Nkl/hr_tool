import express from "express";
import {
  addVendor,
  fetchVendorByid,
  updateVendor
} from "../controllers/vendorController.js";

const router = express.Router();

router.post("/add", addVendor);

router.post("/get_by_id", fetchVendorByid);

router.post("/update", updateVendor);

export default router;