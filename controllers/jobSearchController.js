import {
  getAllJobsSearchServcice,
  getJobSearchByIdService,
} from "../services/jobSearchServices.js";

export const fetchAllJobsSearch = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const jobSearchData = req.body;
    const newOrg = await getAllJobsSearchServcice(jobSearchData, access_token);
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

export const fetchJobSearchById = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const jobSearchData = req.body;
    const newOrg = await getJobSearchByIdService(jobSearchData, access_token);
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

