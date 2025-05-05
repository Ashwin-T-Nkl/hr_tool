import { supabase } from "../config/supabaseClient.js";

export const getAllJobsSearchServcice = async (jobSearchData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  jobSearchData.creator_id = user.id;
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, vendor_id, role")
    .eq("id", user.id)
    .single();
  if (data.organization_id == null ) {
    throw new Error("User cannot Search jobs");
  }
  var { data, error } = await supabase
    .from("organization_license")
    .select()
    .eq("organization_id", jobSearchData.organization_id)
    .single();
  if (data == null ) {
      throw new Error("Organization does not valid license");
    }
    
  if (error) throw new Error("Invalid Organization");;
  if (data.organization_id != jobSearchData.organization_id) throw new Error("Invalid Organization");
  var { data, error } = await supabase
    .from("job_post")
    .select()
    .eq("organization_id", jobSearchData.organization_id)
  if (error) throw new Error(error.message);
  return data;
};

export const getJobSearchByIdService = async (jobSearchData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, vendor_id, role")
    .eq("id", user.id)
    .single();
  if (data.organization_id == null ) {
    throw new Error("User cannot Search jobs");
  }
  var { data, error } = await supabase
    .from("organization_license")
    .select()
    .eq("organization_id", jobSearchData.organization_id)
    .single();
  if (data == null ) {
      throw new Error("Organization does not valid license");
    }
    
  if (error) throw new Error("Invalid Organization");;
  if (data.organization_id != jobSearchData.organization_id) throw new Error("Invalid Organization");
  var { data, error } = await supabase
    .from("job_post")
    .select()
    .eq("id", jobData.id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};
