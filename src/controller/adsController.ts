import { RequestHandler } from "express";
import { CustomRequest } from "../middlewares/TokenVerification.js";
import { AdsService } from "../service/adService.js";
import { ICreateAds } from "../types.js";

export class AdsController {
  service = new AdsService();
  createAd: RequestHandler = async (req: CustomRequest, res): Promise<any> => {
    try {

      // console.log(`createAdsUser`, req.user.id )
      const userId = req.user?.id ;
      const load = req.body as ICreateAds;

      console.log(`Ads Load`, load)
      
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
}
