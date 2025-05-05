import { supabase } from "../config/supabaseClient.js";


export const addOrganizationService = async (orgData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  orgData.creator_id = user.id;
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, vendor_id, role")
    .eq("id", user.id)
    .single();
  if (data.organization_id != null || data.vendor_id != null) {
    throw new Error("User cannot register organization");
  }
  if (data.role.toLowerCase() != "admin") {
    throw new Error("User not allowed to register organization");
  }
  var { data, error } = await supabase
    .from("organization")
    .insert([orgData])
    .select("id,name,description,website,street_name,created_at,updated_at,company_size,industry,creator_id,contact_name,contact_no,email_id,timezone,domain_url,house_no,postal_code,city,country,gst_no,logo_url,color_code,status,sub_domain_url")
    .single();
  var org = data;
  if (error) throw new Error(error.message);
  console.log(data.id);
  var { data, error } = await supabase
    .from("user")
    .update({ "organization_id": data.id })
    .eq("id", user.id);
  if (error) throw new Error(error.message);
  return org;
};

export const fetchOrganizationByidService = async (orgData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) {
    console.log(user);
    return null;
  }
  const id = user.id;
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role, is_org_edit_allowed")
    .eq("id", id)
    .single();
  console.log(error);
  if (error) return null;
  if (data.organization_id != orgData.id) return null;
  var { data, error } = await supabase
    .from("organization")
    .select("id,name,description,website,street_name,created_at,updated_at,company_size,industry,creator_id,contact_name,contact_no,email_id,timezone,domain_url,house_no,postal_code,city,country,gst_no,logo_url,color_code,status,sub_domain_url")
    .eq("id", orgData.id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateOrganizationService = async (orgData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) {
    return null;
  }
  console.log(user);
  console.log(token);
  const id = user.id;
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role, is_org_edit_allowed")
    .eq("id", id)
    .single();
  console.log(data);
  if (error) return null;
  if (data.organization_id != orgData.id) return null;
  if (data.is_org_edit_allowed == false) return null;
  const org_id = orgData.id;
  Reflect.deleteProperty(orgData, 'id');
  console.log(orgData);
  var { data, error } = await supabase
    .from("organization")
    .update(orgData)
    .eq("id", org_id)
    .select("id,name,description,website,street_name,created_at,updated_at,company_size,industry,creator_id,contact_name,contact_no,email_id,timezone,domain_url,house_no,postal_code,city,country,gst_no,logo_url,color_code,status,sub_domain_url")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const addSocialMediaService = async (orgData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();
  if (data.organization_id == null) {
    throw new Error("User should create organization to add social media profile");
  }
  if (data.role.toLowerCase() != "admin") {
    throw new Error("Only Admins are allowed to add social media profile");
  }
  if (data.organization_id != orgData.organization_id) {
    throw new Error("User cannot add social media profile");
  }

  var { data, error } = await supabase
    .from("organization_social_profile")
    .insert([orgData])
    .select("name,url")
  if (error) throw new Error(error.message);
  return data;
};

export const getAllSocialMediaService = async (orgData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();
    console.log(orgData);
    console.log(data);
  if (error) throw new Error("Invalid user");;
  if (data.organization_id != orgData.organization_id) throw new Error("Error occured while fetch Organization Social media");;
  var { data, error } = await supabase
    .from("organization_social_profile")
    .select("id, name,url")
    .eq("organization_id", orgData.organization_id)
  if (error) throw new Error(error.message);
  return data;
};

export const deleteSocialMediaService = async (orgData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();
  if (data.organization_id == null) {
    throw new Error("User cannot delete social media profile");
  }
  if (data.role.toLowerCase() != "admin") {
    throw new Error("User cannot delete social media profile");
  }
  console.log(data);
  var user_org_id = data.organization_id;
  var { data, error } = await supabase
  .from("organization_social_profile")
  .select("organization_id")
  .eq('id', orgData.id)
  .single()
  if (error) throw new Error(error.message);
  var social_org_id = data.organization_id;
  if (social_org_id != user_org_id) {
    throw new Error("User cannot delete social media profile");
  }
  var { data, error } = await supabase
    .from("organization_social_profile")
    .delete()
    .eq('id', orgData.id)
  if (error) throw new Error(error.message);
  return data;
};


export const addOrgLicenseService = async (orgLicenseData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();
    console.log(data);
  if (data.organization_id == null) {
    throw new Error("Invalid organization");
  }
  if (data.organization_id != orgLicenseData.organization_id) {
    throw new Error("Invalid Input");
  }
  
  var { data, error } = await supabase
    .from("plan")
    .select()
    .eq("id", orgLicenseData.plan_id)
    .single();
    console.log(data);
    if(data == null){
      throw new Error("Invalid Plan");
    }
    orgLicenseData.purchase_by = user.id;
    console.log(orgLicenseData);
    var { data, error } = await supabase
    .from("organization_subscription")
    .insert([orgLicenseData])
    .select()
    .single();
    console.log(data);
    if (error) throw new Error(error.message);
   return data;

};

export const getOrgLicenseService = async (orgLicenseData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();
    console.log(data);
  if (data.organization_id != null || data.vendor_id != null) {
    throw new Error("Invalid organization");
  }
  var { data, error } = await supabase
    .from("organization")
    .select("id,")
    .eq("id", orgLicenseData.organization_id)
    .single();
    if(data == null) throw new Error("Invalid organization");
    var { data, error } = await supabase
    .from("organization_license")
    .select()
    .eq("organization_id", orgLicenseData.organization_id)
    .single();
    console.log(data);
    if (error) throw new Error(error.message);
   return data;

};