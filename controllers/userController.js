import {
  signupUserService,
  loginUserService,
  addUserService,
  getUserByToken,
  resetPasswordService,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  searchUsers
} from "../services/userService.js";

export const signupUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await signupUserService(userData);
    res.status(201).json({ success: "New User sign up completed" });
  } catch (error) {
    console.log(error);
    if (error.message.toLowerCase().includes("duplicate key")) {
      res.status(400).json({ error: "User already registered" });
    }
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await loginUserService(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid user data" });
    }
    const userData = req.body;
    console.log(userData);
    if(userData.manager_id == null) res.status(400).json({ error: "Manager details are mandatory" });
    if(userData.organization_id == null) res.status(400).json({ error: "Organization details are mandatory" });
    const newUser = await addUserService(userData);
    res.status(201).json({ success: "Invite sent to New User" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserByToken = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid user data" });
    }
    const user = await getUserByToken(access_token);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await resetPasswordService(userData);
    res.status(200).json({ success: "Email sent to user to reset password" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const update_user = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data"});
    }
    const updates = req.body;
    console.log(updates.email);
    if (updates.email != null || updates.email != undefined) {
      return res.status(404).json({ error: "Cannot update email id" });
    }
    const updatedUser = await updateUser(updates, access_token);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUserByToken = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json("Please provide valid authendication data");
    }
    const user = await deleteUser(access_token);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------
export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await updateUser(id, updates);
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const users = await searchUsers(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};