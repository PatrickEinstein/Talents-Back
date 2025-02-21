import { RequestHandler } from "express";
import { CustomRequest } from "../middlewares/TokenVerification.js";
import { AdsService } from "../service/adService.js";
import { ICreateAds } from "../types.js";

export class AdsController {
  service = new AdsService();
  createAd: RequestHandler = async (req: CustomRequest, res): Promise<any> => {
    try {
      const userId = req.user?.id;
      const load = req.body as ICreateAds;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const newAd = await this.service.createAds(userId, load);
      res.json(newAd);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating ad", error: error.message });
    }
  };

  getAdByUserId: RequestHandler = async (
    req: CustomRequest,
    res
  ): Promise<any> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const newAd = await this.service.getAdByUserId(userId);
      res.json(newAd);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating ad", error: error.message });
    }
  };

  getAdById: RequestHandler = async (req, res): Promise<any> => {
    try {
      const { id } = req.params;
      console.log(req.params)
      const newAd = await this.service.getAdById(id);
      res.json(newAd);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating ad", error: error.message });
    }
  };

  getAllAvailableAds: RequestHandler = async (req, res): Promise<any> => {
    try {
      const newAd = await this.service.getAllAvailableAds();
      res.json(newAd);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating ad", error: error.message });
    }
  };

  deleteAds: RequestHandler = async (req, res): Promise<any> => {
    try {
      const { id } = req.params;
      const newAd = await this.service.deleteAds(id);
      res.json(newAd);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating ad", error: error.message });
    }
  };
  updateAds: RequestHandler = async (req, res): Promise<any> => {
    try {
      const load = req.body
      const { id } = req.params;
      const newAd = await this.service.updateAds(id,load);
      res.json(newAd);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating ad", error: error.message });
    }
  };
  applyToAds: RequestHandler = async (req:CustomRequest, res): Promise<any> => {
    try {
      const userId = req.user?.id;
      const load = req.body
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const newAd = await this.service.applyToAds(load);
      res.json(newAd);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating ad", error: error.message });
    }
  };
}
