import express from "express";
import {
  addJob,
  updateJob,
  fetchJobById,
  fetchAllJobs,
 // deleteJob
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/add", addJob);

router.post("/update", updateJob);

router.post("/get_by_id", fetchJobById);

router.post("/get_all", fetchAllJobs);

//router.post("/delete", deleteJob);

export default router;