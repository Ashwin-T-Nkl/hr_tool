import express from "express";
import {
  addVendor,
  fetchVendorByid,
  updateVendor,
  searchVendor
} from "../controllers/vendorController.js";

const router = express.Router();

router.post("/add", addVendor);

router.post("/get_by_id", fetchVendorByid);

router.post("/update", updateVendor);

router.post("/search", searchVendor);

export default router;