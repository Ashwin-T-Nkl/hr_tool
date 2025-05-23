import express from "express";
import {
  getTotalApplicationsCountService,
  getTotalSelectedCandidatesCountService ,
  getTotalDeclinedCandidatesCountService,
  getInterviewScheduledCandidatesCountService,
  getInterviewCompletedCandidatesCountService
} from "../controllers/DashboardController.js";

const router = express.Router();

router.post("/fetch_by_TotalApplication", getTotalApplicationsCountService);
router.post("/fetch_by_TotalSelectedCandidates", getTotalSelectedCandidatesCountService);
router.post("/fetch_by_TotalDeclinedCandidates", getTotalDeclinedCandidatesCountService);
router.post("/fetch_by_InterviewScheduledCandidates", getInterviewScheduledCandidatesCountService);
router.post("/fetch_by_InterviewCompleted", getInterviewCompletedCandidatesCountService);

export default router;