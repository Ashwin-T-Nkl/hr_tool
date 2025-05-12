import { 
  addCandidateService,
  fetchCandidateByidService,
  fetchCandidateByEmailService,
  updateCandidateService,
  deleteCandidateService,
} from "../services/CandidateService.js";

export const addCandidate = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await addCandidateService(userData);
    res.status(201).json({success:"New User sign up completed"});
  } catch (error) {
    console.log(error);
    if (error.message.toLowerCase().includes("duplicate key")){
      res.status(400).json({error: "User already registered"});
    }
    res.status(400).json({ error: error.message });
  }
};

export const fetchCandidateByid = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authentication data" });
    }
    const userData = req.body;
    const newUser = await fetchCandidateByidService(userData, access_token);
    if (newUser == null) {
      res.status(400).json({ error: "Please provide valid input" });
    } else {
      res.status(200).json(newUser);
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const fetchCandidateByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await fetchCandidateByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authentication data" });
    }
    const userData = req.body;
    const newUser = await updateCandidateService(userData, access_token);
    if (newUser == null) {
      res.status(400).json({ error: "Please provide valid input" });
    } else {
      res.status(200).json(newUser);
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authentication data" });
    }
    const userData = req.body;
    const newUser = await deleteCandidateService(userData, access_token);
    res.status(200).json({ success: "Candidate details deleted successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
