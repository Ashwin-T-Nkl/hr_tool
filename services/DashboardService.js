import {supabase} from "../config/supabaseClient.js";


//  Total Candidates Submitted

export const getTotalApplicationsCountService = async () => {
  const { count, error } = await supabase
    .from("job_application")
    .select("id", { count: "exact", head: true });// `head: true` prevents returning duplicate row data.

  if (error) throw new Error(error.message);
  return count;
};

//  Candidates Shortlistested

export const getTotalSelectedCandidatesCountService = async () => {
    const { count, error } = await supabase
    .from("job_application")
    .select("id", { count: "exact", head: true, status: true}); // `head: true` prevents returning duplicate row data , 'status : true it will give the shortlisted candidates in the total candidates'

  if (error) throw new Error(error.message);
  return count;
};

//  Candidates Declined

export const getTotalDeclinedCandidatesCountService = async () => {
    const { count, error } = await supabase
    .from("job_application")
    .select("id", { count: "exact", head: true, status: false}); // `head: true` prevents returning duplicate row data , 'status : false it will give the declined candidates in the total candidates'

  if (error) throw new Error(error.message);
  return count;
};


//  Interview Scheduled 

export const getInterviewScheduledCandidatesCountService = async () => {
  const { count, error } = await supabase
    .from("job_application")
    .select("id", { count: "exact", head: true })
    .eq("status", "interview_scheduled"); // Filter only interview scheduled candidates

  if (error) throw new Error(error.message);
  return count;
};

//  Interview Completed 

export const getInterviewCompletedCandidatesCountService = async () => {
  const { count, error } = await supabase
    .from("job_application")
    .select("id", { count: "exact", head: true })
    .eq("status", "interview_completed"); // Filter for completed interviews

  if (error) throw new Error(error.message);
  return count;
};




