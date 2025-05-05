import {
  addJobService,
  getAllJobsServcice,
  getJobByIdService,
  updateJobService
} from "../services/jobServices.js";

export const addJob = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const jobData = req.body;
    const newOrg = await addJobService(jobData, access_token);
      res.status(201).json({ success: "Job Post added successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchAllJobs = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const jobData = req.body;
    const newOrg = await getAllJobsServcice(jobData, access_token);
    if (newOrg == null) {
      res.status(400).json({ error: "Please provide valid input" });
    } else {
      res.status(200).json(newOrg);
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const fetchJobById = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const jobData = req.body;
    const newOrg = await getJobByIdService(jobData, access_token);
    if (newOrg == null) {
      res.status(400).json({ error: "Please provide valid input" });
    } else {
      res.status(200).json(newOrg);
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const jobData = req.body;
    const newOrg = await updateJobService(jobData, access_token);
      res.status(200).json(newOrg);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
