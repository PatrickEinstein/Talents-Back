import { AdsService } from "../service/adService.js";
export class AdsController {
    service = new AdsService();
    createAd = async (req, res) => {
        try {
            // console.log(`createAdsUser`, req.user.id )
            const userId = req.user?.id;
            const load = req.body;
            console.log(`Ads Load`, load);
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const newAd = await this.service.createAds(userId, load);
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
}
