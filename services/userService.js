import {supabase, supabase_admin} from "../config/supabaseClient.js";


export const signupUserService = async (userData) => {
  const email = userData.email;
  const password = userData.password;
  const { data, error } = await supabase.auth.signUp({ email: email, password: password });
  if (error) throw new Error(error.message);
  userData.id = data.user.id;
  Reflect.deleteProperty(userData, 'password');
  const addUserData = createUser(userData);
  return addUserData;
}; 

export const loginUserService = async (userData) => {
  const email = userData.email;
  const password = userData.password;
  const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password });
  if (error) throw new Error(error.message);
  const session =  data.session;
  Reflect.deleteProperty(session, 'user');
  return session;
}; 

export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from("user")
    .insert([userData]);
  if (error) throw new Error(error.message);
  return data;
};

export const addUserService = async (userData) => {
  const email = userData.email;
  console.log(email);
  var { data, error } = await supabase.from("user").select().eq("email", email).single();
  if (data) throw new Error("Email already exist");
  var { data, error } = await supabase_admin.auth.admin.inviteUserByEmail(email);
  console.log(error);
  if (error) throw new Error(error.message);
  userData.id = data.user.id;
  const addUserData = createUser(userData);
  return true;
};

export const isEmailExist = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("Email", email);
  if (error) throw new Error(error.message);
  if (data) return true
  return false;
};

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return data;
};
// const getAuthByToken = async (token) => {
//   const { data, error } = await supabase.auth.getUser(token);
//   console.log(data);
//   if (error) throw new Error(error.message);
//   console.log(data);
//   return data;
// }
export const getUserByToken = async (token) => {
  //const user = getAuthByToken (token)
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  const id =user.id;
  console.log(user);
  const { data, error } = await supabase
    .from("user")
    .select("name, email, contact_no, manager_id, organization_id, role, is_org_edit_allowed")
    .eq("id", id)
    .single();
  console.log(data);
  if (error) throw new Error(error.message);
  return data;
};

export const resetPasswordService = async (userData) => {
  const email = userData.email;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://example.com/update-password',
  })
  console.log(data);
  if (error) throw new Error(error.message);
  return data;
};


export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("user")
    .select("name, email, contact_no, manager_id, organization_id, role, is_org_edit_allowed")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
};

export const updateUser = async (updates, token) => {
  console.log("Update user");
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  const id =user.id;
  const { data, error } = await supabase
    .from("user")
    .update(updates)
    .eq("id", id)
    .select("name, email, contact_no, manager_id, organization_id, role, is_org_edit_allowed")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteUser = async (token) => {
  const { data: { user } } = await supabase.auth.getUser(token);
  if (user == null || user == undefined) throw new Error("User not found");
  const id =user.id;
  var error  = await supabase
    .from("user")
    .delete()
    .eq("id", id);

  var { data, error } = await supabase.auth.admin.deleteUser(id);
  console.log(error);
  if (error) throw new Error(error.message);

  return { success: true, message: "User deleted successfully" };
};

export const searchUsers = async (query) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) throw new Error(error.message);
  return data;
};

export const signup = async (userData) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};