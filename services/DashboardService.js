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


// Delete Candidate by ID
export const deleteCandidateService = async (id) => {
  const { data, error } = await supabase
    .from("candidate")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};


