import {
  addOrganizationService,
  fetchOrganizationByidService,
  updateOrganizationService,
  addSocialMediaService,
  getAllSocialMediaService,
  deleteSocialMediaService,
  addOrgLicenseService,
  getOrgLicenseService
} from "../services/organizationServices.js";

export const addOrganization = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const orgData = req.body;
    const newOrg = await addOrganizationService(orgData, access_token);
    if (newOrg == null) {
      res.status(400).json({ error: "Error occured while add new Organization" });
    } else {
      res.status(201).json({ success: "Organization added successfully" });
    }

  } catch (error) {
    console.log(error);
    if (error.message.toLowerCase().includes("duplicate key")) {
      res.status(400).json({ error: "Organization name already registered" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const fetchOrganizationByid = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const orgData = req.body;
    const newOrg = await fetchOrganizationByidService(orgData, access_token);
    if (newOrg == null) {
      res.status(400).json({ error: "Please provide valid input" });
    } else {
      res.status(200).json(newOrg);
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const updateOrganization = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const orgData = req.body;
    const newOrg = await updateOrganizationService(orgData, access_token);
    if (newOrg == null) {
      res.status(400).json({ error: "Please provide valid input" });
    } else {
      res.status(200).json(newOrg);
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


export const addSocialMedia = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const orgData = req.body;
    if (orgData.organization_id == null) {
      res.status(400).json({ error: "Organization deatils required" });
    }
    const newOrg = await addSocialMediaService(orgData, access_token);
    res.status(201).json({ success: "Organization Social media details added successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSocialMedia = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const orgData = req.body;
    if (orgData.organization_id == null) {
      res.status(400).json({ error: "Organization deatils required" });
    }
    const newOrg = await getAllSocialMediaService(orgData, access_token);
    res.status(200).json(newOrg);

  } catch (error) {
    console.log(error);
    if (error.message.toLowerCase().includes("duplicate key")) {
      res.status(400).json({ error: "Organization name already registered" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteSocialMedia = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const orgData = req.body;
    const newOrg = await deleteSocialMediaService(orgData, access_token);
    res.status(200).json({ success: "Organization Social media details deleted successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addOrgLicense = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const orgData = req.body;
    const newOrg = await addOrgLicenseService(orgData, access_token);
    res.status(201).json({ success: "Plan subscription completed" });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

export const getOrgLicense = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1) {
      res.status(400).json({ error: "Please provide valid authendication data" });
    }
    const orgData = req.body;
    const orgLicense = await getOrgLicenseService(orgData, access_token);
    res.status(200).json(orgLicense);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

