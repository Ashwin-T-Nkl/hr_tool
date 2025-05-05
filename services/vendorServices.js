import {supabase} from "../config/supabaseClient.js";


export const addVendorService = async (vendData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  vendData.creator_id = user.id;
  var { data, error } = await supabase
    .from("user")
    .select("organization_id, vendor_id, role")
    .eq("id", user.id)
    .single();
  if(data.organization_id != null || data.vendor_id != null){
    throw new Error("User cannot register the Vendor");
  }
  if(data.role.toLowerCase() != "vendor"){
    throw new Error("User not allowed to register Vendor");
  }
  var { data, error } = await supabase
    .from("vendor_details")
    .insert([vendData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  var vendor = data;
  var { data, error } = await supabase
    .from("user")
    .update({"vendor_id": data.id})
    .eq("id", user.id);
    if (error) throw new Error(error.message);
  return vendor;
}; 

export const fetchVendorByidService = async (vendData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  const id =user.id;
 var { data, error } = await supabase
    .from("user")
    .select("vendor_id, role")
    .eq("id", id)
    .single();
  if (error) return null;
  if ( data.vendor_id != vendData.id) return null;
  var { data, error } = await supabase
    .from("vendor_details")
    .select()
    .eq("id", vendData.id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}; 


export const searchVendorService = async (vendData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  const id =user.id;
 var { data, error } = await supabase
    .from("user")
    .select("id")
    .eq("id", id)
    .single();
  if (error) throw new Error("User not found");
  var { data, error } = await supabase
    .from("vendor_details")
    .select()
    .ilike('name', '%'+vendData.name+'%');
  if (error) throw new Error(error.message);
  return data;
}; 

export const updateVendorService = async (vendData, token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  console.log(user);
  console.log(token);
  const id =user.id;
 var { data, error } = await supabase
    .from("user")
    .select("vendor_id, role")
    .eq("id", id)
    .single();
  console.log(data);
  if (error) return null;
  if ( data.vendor_id != vendData.id) return null;
  const vend_id = vendData.id;
  Reflect.deleteProperty(vendData, 'id');
  console.log(vendData);
  var { data, error } = await supabase
    .from("vendor_details")
    .update(vendData)
    .eq("id", vend_id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}; 
