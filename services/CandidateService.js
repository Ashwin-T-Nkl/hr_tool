import {supabase} from "../config/supabaseClient.js";


export const addCandidateService = async (userData) => {
  const { data, error } = await supabase
    .from("candidate")
    .insert([userData]);
  if (error) throw new Error(error.message);
  return data;
};


// 🔄 Update Candidate by ID
export const updateCandidateService = async (id, updateData) => {
  const { data, error } = await supabase
    .from("candidate")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};


//  Get Candidate by ID
export const getCandidateByIdService = async (id) => {
  const { data, error } = await supabase
    .from("candidate")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

//Get Candidate by E Mail

export const getCandidateByEmail = async (email) => {
  const { data, error } = await supabase
    .from("candidate")
    .select("*")
    .eq("email", email)
    .single();

    if (error) throw new Error(error.message);
  return data;
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


