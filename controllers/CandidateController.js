import { 
  addCandidateService
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
