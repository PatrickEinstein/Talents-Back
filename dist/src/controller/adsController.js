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
            const { id } = req.params;
            console.log(req.params);
            const newAd = await this.service.getAdById(id);
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
            const { id } = req.params;
            const newAd = await this.service.deleteAds(id);
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
            const { id } = req.params;
            const newAd = await this.service.updateAds(id, load);
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
            const useremail = req.user?.email;
            const { gigId } = req.params;
            if (!useremail) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const newAd = await this.service.applyToAds({
                email: useremail,
                gigId: gigId,
            });
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
    HireTalentToAds = async (req, res) => {
        try {
            const userId = req.user?.id;
            const { gigId, talentEmail } = req.body;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const newAd = await this.service.HireTalentToAds({
                email: talentEmail,
                gigId: gigId,
                userId,
            });
            res.json(newAd);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating ad", error: error.message });
        }
    };
}
