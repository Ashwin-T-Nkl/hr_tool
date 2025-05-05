import { supabase } from "../config/supabaseClient.js";


export const addJobService = async (jobData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  console.log(user);
  jobData.creator_id = user.id;
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, vendor_id, role")
    .eq("id", user.id)
    .single();
    console.log(data);
  if (data.organization_id == null ) {
    throw new Error("User cannot create new job");
  }
  var { data, error } = await supabase
    .from("organization_license")
    .select()
    .eq("organization_id", jobData.organization_id)
    .single();
  if (data == null ) {
      throw new Error("User cannot create new job");
    }
    var org_license_id = data.id;
    var job_post_count = data.job_post_usage_count;
    console.log(jobData);
    var { data, error } = await supabase
    .from("job_post")
    .insert([jobData])
    .select()
    .single();
    console.log(error);
  if (error) throw new Error(error.message);
  return data;
};

export const getAllJobsServcice = async (jobData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  jobData.creator_id = user.id;
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, vendor_id, role")
    .eq("id", user.id)
    .single();
  if (data.organization_id == null ) {
    throw new Error("User cannot view jobs");
  }
  var { data, error } = await supabase
    .from("organization_license")
    .select()
    .eq("organization_id", jobData.organization_id)
    .single();
  if (data == null ) {
      throw new Error("Organization does not valid license");
    }
    
  if (error) throw new Error("Invalid Organization");;
  if (data.organization_id != jobData.organization_id) throw new Error("Invalid Organization");
  var { data, error } = await supabase
    .from("job_post")
    .select()
    .eq("organization_id", jobData.organization_id)
  if (error) throw new Error(error.message);
  return data;
};

export const getJobByIdService = async (jobData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, vendor_id, role")
    .eq("id", user.id)
    .single();
  if (data.organization_id == null ) {
    throw new Error("User cannot view jobs");
  }
  var { data, error } = await supabase
    .from("organization_license")
    .select()
    .eq("organization_id", jobData.organization_id)
    .single();
  if (data == null ) {
      throw new Error("Organization does not valid license");
    }
    
  if (error) throw new Error("Invalid Organization");;
  if (data.organization_id != jobData.organization_id) throw new Error("Invalid Organization");
  var { data, error } = await supabase
    .from("job_post")
    .select()
    .eq("id", jobData.id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateJobService = async (jobData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, vendor_id, role")
    .eq("id", user.id)
    .single();
  if (data.organization_id == null ) {
    throw new Error("User cannot update jobs");
  }
  var { data, error } = await supabase
    .from("organization_license")
    .select()
    .eq("organization_id", jobData.organization_id)
    .single();
  if (data == null ) {
      throw new Error("Organization does not valid license");
    }
    
  if (error) throw new Error("Invalid Organization");;
  if (data.organization_id != jobData.organization_id) throw new Error("Invalid Organization");
  const job_id = jobData.id;
  Reflect.deleteProperty(jobData, 'id');
  Reflect.deleteProperty(jobData, 'organization_id');
  var { data, error } = await supabase
    .from("job_post")
    .update(jobData)
    .eq("id", job_id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};
