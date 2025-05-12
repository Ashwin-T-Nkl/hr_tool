import express from "express";
import {
  addCandidate,
  fetchCandidateByid,
  fetchCandidateByEmail,
  updateCandidate,
  deleteCandidate
} from "../controllers/CandidateController.js";

const router = express.Router();

router.post("/add", addCandidate);
router.post("/fetch_byID", fetchCandidateByid);
router.post("/fetch_byEmail", fetchCandidateByEmail);
router.post("/update", updateCandidate);
router.post("/delete", deleteCandidate);
export default router;



