import { 
  addLicenseService,
  fetchLicenseByidService,
  updateLicenseService,
  getAllLicensesService
} from "../services/licenseServices.js";

export const addLicense = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1){
      res.status(400).json({ error:"Please provide valid authendication data"});
    }
    const license_data = req.body;
    const newLicense = await addLicenseService(license_data, access_token);
    if (newLicense == null){
      res.status(400).json({ error:"Error occured while add new License"});
    }else{
      res.status(201).json(newLicense);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const fetchLicenseByid = async (req, res) => {
  try {
     const license = await fetchLicenseByidService(license_data);
    if (newVend == null){
      res.status(400).json({ error:"Please provide valid input"});
    }else{
      res.status(201).json(license);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getAllLicenses = async (req, res) => {
  try {
     const license = await getAllLicensesService();
    if (newVend == null){
      res.status(400).json({ error:"Please provide valid input"});
    }else{
      res.status(201).json(license);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


export const updateLicense = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1){
      res.status(400).json({ error:"Please provide valid authendication data"});
    }
    const license_data = req.body;
    const newVend = await updateLicenseService(license_data, access_token);
    if (newVend == null){
      res.status(400).json({ error:"Please provide valid input"});
    }else{
      res.status(200).json(newVend);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};