import express from "express";
import {
  addCandidate,
 // updateCandidate
} from "../controllers/CandidateController.js";

const router = express.Router();

router.post("/add", addCandidate);

//router.post("/update", updateCandidate);
export default router;