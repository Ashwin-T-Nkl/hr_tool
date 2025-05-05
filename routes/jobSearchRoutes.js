import express from "express";
import {
    fetchAllJobsSearch,
    fetchJobSearchById,
  
} from "../controllers/jobSearchController.js";

const router = express.Router();

router.post("/get_by_id", fetchJobSearchById);

router.post("/get_all", fetchAllJobsSearch);

export default router;