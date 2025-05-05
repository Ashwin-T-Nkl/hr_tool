import express from "express";
import {
  addOrganization,
  fetchOrganizationByid,
  updateOrganization,
  addSocialMedia,
  getSocialMedia,
  deleteSocialMedia,
  addOrgLicense,
  getOrgLicense
} from "../controllers/organizationController.js";

const router = express.Router();

router.post("/add", addOrganization);

router.post("/get_by_id", fetchOrganizationByid);

router.post("/update", updateOrganization);

router.post("/add_social_media", addSocialMedia);

router.post("/get_social_media", getSocialMedia);

router.post("/delete_social_media", deleteSocialMedia);

router.post("/subscribe", addOrgLicense);

router.post("/get_license", getOrgLicense);


export default router;