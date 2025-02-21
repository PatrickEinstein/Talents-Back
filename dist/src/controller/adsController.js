import { AdsService } from "../service/adService.js";
export class AdsController {
    service = new AdsService();
    createAd = async (req, res) => {
        try {
            const userId = req.user?.id;
            const load = req.body;
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
    getAdByUserId = async (req, res) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const newAd = await this.service.getAdByUserId(userId);
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
    getAdById = async (req, res) => {
        try {
            const { adsId } = req.params;
            const newAd = await this.service.getAdById(adsId);
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
    getAllAvailableAds = async (req, res) => {
        try {
            const newAd = await this.service.getAllAvailableAds();
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
    deleteAds = async (req, res) => {
        try {
            const { adsId } = req.params;
            const newAd = await this.service.deleteAds(adsId);
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
    updateAds = async (req, res) => {
        try {
            const load = req.body;
            const newAd = await this.service.updateAds(load);
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
    applyToAds = async (req, res) => {
        try {
            const userId = req.user?.id;
            const load = req.body;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const newAd = await this.service.applyToAds(load);
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
}
