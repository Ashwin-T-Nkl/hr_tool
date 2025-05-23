import { 
    getTotalApplicationsCountService,
  getTotalSelectedCandidatesCountService ,
  getTotalDeclinedCandidatesCountService,
  getInterviewScheduledCandidatesCountService ,
  getInterviewCompletedCandidatesCountService
} from "../services/DashboardService.js";


export const getTotalApplicationsCountService = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authentication data" });
    }
    const userData = req.body;
    const newUser = await getTotalApplicationsCountService(userData, access_token);
    // if (newUser == null) {
    //   res.status(400).json({ error: "Please provide valid input" });  // if the screen needs the error message need to be displayed please enable the commented code .
    // } else {
    //   res.status(200).json(newUser);
    // }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getTotalSelectedCandidatesCountService = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (!access_token || access_token.length < 1) {
      return res.status(400).json({ error: "Please provide valid authentication data" });
    }

    const { count, error } = await supabase
      .from("job_application")
      .select("*", { count: "exact", head: true })
      .eq("status", "declined"); // Filter for declined candidates

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ declinedCandidatesCount: count });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const getTotalDeclinedCandidatesCountService = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authentication data" });
    }
    const userData = req.body;
    const newUser = await getTotalApplicationsCountService(userData, access_token);
    // if (newUser == null) {
    //   res.status(400).json({ error: "Please provide valid input" });  // if the screen needs the error message need to be displayed please enable the commented code .
    // } else {
    //   res.status(200).json(newUser);
    // }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const  getInterviewScheduledCandidatesCountService= async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (!access_token || access_token.length < 1) {
      return res.status(400).json({ error: "Please provide valid authentication data" });
    }

    const { count, error } = await supabase
      .from("job_application")
      .select("*", { count: "exact", head: true })
      .eq("status", "interview_selected"); // Filter for interview-selected candidates

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ interviewSelectedCandidatesCount: count });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const getInterviewCompletedCandidatesCountService = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (!access_token || access_token.length < 1) {
      return res.status(400).json({ error: "Please provide valid authentication data" });
    }

    const { count, error } = await supabase
      .from("job_application")
      .select("*", { count: "exact", head: true })
      .eq("status", "interview_completed"); // ✅ Changed this line

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ interviewCompletedCandidatesCount: count });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


