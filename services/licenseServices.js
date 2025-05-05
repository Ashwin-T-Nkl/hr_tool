import { supabase } from "../config/supabaseClient.js";


export const addLicenseService = async (licenseData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  const userId = user.id;
  var { data, error } = await supabase
    .from("app_admins")
    .select()
    .eq("id", userId)
    .single();
  console.log(data);
  if (data == null) throw new Error("Invalid user");

  var { data, error } = await supabase
    .from("plan")
    .insert([licenseData])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const getAllLicensesService = async () => {
  // const { data: { user } } = await supabase.auth.getUser(token);
  // if (user == null || user == undefined){
  //   return null;
  // }
  var { data, error } = await supabase
    .from("plan")
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const fetchLicenseByidService = async (licenseData, token) => {

  var { data, error } = await supabase
    .from("license")
    .select()
    .eq("id", licenseData.id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};


export const updateLicenseService = async (licenseData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("Invalid user");
  const userId = user.id;
  var { data, error } = await supabase
  .from("app_admins")
  .select()
  .eq("id", userId)
  .single();
console.log(data);
if (data == null) throw new Error("Invalid user");
  var licenseId = licenseData.id;
  Reflect.deleteProperty(licenseData, 'id');
  console.log(licenseData);
  var { data, error } = await supabase
    .from("plan")
    .update(licenseData)
    .eq("id", licenseId)
    console.log(error);
  return data;
}; 
