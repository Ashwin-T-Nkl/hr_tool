import {supabase} from "../config/supabaseClient.js";


export const addOrgLicenseService = async (orgLicenseData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined){
    return null;
  }
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();
  if(data.organization_id == null){
    throw new Error("Please regieter the organization");
  }
  if(data.role.toLowerCase() != "admin"){
    throw new Error("Only Admins are allowed to register organization");
  }
  if(orgLicenseData.organization_id != data.organization_id){
    throw new Error("Invalid User");
  }

  var { data, error } = await supabase
    .from("license")
    .select()
    .eq("id", orgLicenseData.license_id)
    .single();
  
    if(data == null){
      throw new Error("Invalid License");
    }
    var { data, error } = await supabase
    .from("organization_license")
    .insert([orgLicenseData])
    .select()
    .single();

  return data;
}; 


export const fetchOrgLicenseByidService = async (orgLicenseData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined){
    return null;
  }
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();
  if(data.organization_id == null){
    throw new Error("Please regieter the organization");
  }
  if(data.role.toLowerCase() != "admin"){
    throw new Error("Only Admins are allowed to register organization");
  }
  var organization_id = data.organization_id;

  var { data, error } = await supabase
    .from("license")
    .select()
    .eq("id", orgLicenseData.license_id)
    .single();
  
    if(data == null){
      throw new Error("Invalid License");
    }
  var { data, error } = await supabase
    .from("organization_license")
    .select()
    .match({ "id": orgLicenseData.id, "organization_id": organization_id })
    .single();
  if (error) throw new Error(error.message);
  return data;
}; 


export const updateOrgLicenseService = async (orgLicenseData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined){
    return null;
  }
  licenseId = orgLicenseData.id;
  Reflect.deleteProperty(orgLicenseData, 'id');
  console.log(orgLicenseData);
  var { data, error } = await supabase
    .from("organization_license")
    .update(orgLicenseData)
    .eq("id", orgLicenseData.id)
  if (error) throw new Error(error.message);
  return data;
}; 
