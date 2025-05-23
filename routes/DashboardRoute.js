import express from "express";
import {
  getTotalApplicationsCountService,
  getTotalSelectedCandidatesCountService ,
  getTotalDeclinedCandidatesCountService,
//   updateCandidate,
//   deleteCandidate
} from "../controllers/DashboardController.js";

const router = express.Router();

router.post("/fetch_by_TotalApplication", getTotalApplicationsCountService);
router.post("/fetch_by_TotalSelectedCandidates", getTotalSelectedCandidatesCountService);
router.post("/fetch_by_TotalDeclinedCandidates", getTotalDeclinedCandidatesCountService);
// router.post("/update", updateCandidate);
// router.post("/delete", deleteCandidate);
export default router;