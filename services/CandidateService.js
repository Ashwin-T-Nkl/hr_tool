import {supabase} from "../config/supabaseClient.js";


export const addCandidateService = async (userData) => {
  const { data, error } = await supabase
    .from("candidate")
    .insert([userData]);
  if (error) throw new Error(error.message);
  return data;
};

