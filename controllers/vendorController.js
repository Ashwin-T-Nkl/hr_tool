import { 
  addVendorService,
  fetchVendorByidService,
  updateVendorService,
  searchVendorService
} from "../services/vendorServices.js";

export const addVendor = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1){
      res.status(400).json({ error:"Please provide valid authendication data"});
    }
    const vendor_data = req.body;
    const newVend = await addVendorService(vendor_data, access_token);
      res.status(201).json({ success: "New Vendor created successfully" });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const fetchVendorByid = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1){
      res.status(400).json({ error:"Please provide valid authentication data"});
    }
    const vendData = req.body;
    const newVend = await fetchVendorByidService(vendData, access_token);
    if (newVend == null){
      res.status(400).json({ error:"Please provide valid input"});
    }else{
      res.status(201).json(newVend);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


export const updateVendor = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1){
      res.status(400).json({ error:"Please provide valid authendication data"});
    }
    const vendData = req.body;
    const newVend = await updateVendorService(vendData, access_token);
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

export const searchVendor = async (req, res) => {
  try {
    const access_token = req.headers.access_token;
    if (access_token == null || access_token.length < 1){
      res.status(400).json({ error:"Please provide valid authendication data"});
    }
    const vendData = req.body;
    const vend = await searchVendorService(vendData, access_token);
      res.status(200).json(vend);
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};