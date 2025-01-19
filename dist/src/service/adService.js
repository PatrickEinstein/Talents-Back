import AppDataSource from "../data-source";
import { MerchantAd } from "../entity/Ads";
import { ServiceResponse } from "../entity/serviceResponse";
export class AdsService {
    constructor() { }
    async createAds(load) {
        const response = new ServiceResponse();
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const createdAds = await adsRepo.save(load);
            response.data = createdAds;
            response.message = "Ad created successfully";
            response.status = 200;
        }
        catch (e) {
            response.message = e.message;
            response.status = 500;
        }
        return response;
    }
    async deleteAds(id) {
        const response = new ServiceResponse();
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const deletedAds = await adsRepo.delete({ id: id });
            response.data = deletedAds;
            response.message = "Ad deleted successfully";
            response.status = 200;
        }
        catch (e) {
            response.message = e.message;
            response.status = 500;
        }
        return response;
    }
    async updateAds(load) {
        const response = new ServiceResponse();
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const foundAds = await adsRepo.findOne({
                where: { id: load.id },
            });
            if (!foundAds) {
                response.data = null;
                response.status = 404;
                response.message = "No Ads found";
                return response;
            }
            Object.keys(load).forEach((key) => {
                const typedKey = key;
                if (typedKey !== "id" &&
                    load[typedKey] !== undefined &&
                    load[typedKey] !== null &&
                    load[typedKey] !== "") {
                    foundAds[typedKey] = load[typedKey];
                }
            });
            await adsRepo.save(foundAds);
            response.data = foundAds;
            response.message = "Ad updated successfully";
            response.status = 200;
        }
        catch (e) {
            response.data = null;
            response.message = e.message;
            response.status = 500;
        }
        return response;
    }
    async getAdById(id) {
        const response = new ServiceResponse();
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const gottenAdd = adsRepo.findOne({
                where: { id: id },
            });
            response.data = gottenAdd;
            response.message = "Ad created successfully";
            response.status = 200;
        }
        catch (e) {
            response.message = e.message;
            response.status = 500;
        }
        return response;
    }
    async getAdByUserId(id) {
        const response = new ServiceResponse();
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const gottenAdd = adsRepo.findOne({
                where: { id: id },
            });
            response.data = gottenAdd;
            response.message = "Ad created successfully";
            response.status = 200;
        }
        catch (e) {
            response.message = e.message;
            response.status = 500;
        }
        return response;
    }
    async getAds(load) {
        const response = new ServiceResponse();
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const createdAds = await adsRepo.save(load);
            response.data = createdAds;
            response.message = "Ad created successfully";
            response.status = 200;
        }
        catch (e) {
            response.message = e.message;
            response.status = 500;
        }
        return response;
    }
}
