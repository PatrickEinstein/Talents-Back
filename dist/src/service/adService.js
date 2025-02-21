import AppDataSource from "../data-source.js";
import { AdStatus, MerchantAd } from "../entity/Ads.js";
import { ServiceResponse } from "../entity/serviceResponse.js";
import { User } from "../entity/User.js";
export class AdsService {
    constructor() { }
    createAds = async (userId, adData) => {
        const userRepository = AppDataSource.getRepository(User);
        const adRepository = AppDataSource.getRepository(MerchantAd);
        const res = new ServiceResponse();
        let error = [];
        //before anything, i want to make sure no user can have more than 8 active gigs
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.message = "User not found";
            (res.status = 400), (res.data = null);
            return res;
        }
        const usersExistingGigs = await adRepository.find({
            where: {
                by: user?.email,
            },
        });
        if (usersExistingGigs.length > 7) {
            res.message = "You have reached the maximum number Gigs you can create";
            (res.status = 400), (res.data = null);
            return res;
        }
        // I want to check if any the fields in the load is empty string
        const allaluesinLoad = Object.entries(adData); // convert each key/values in the load to array
        for (let i = 0; i < allaluesinLoad.length; i++) {
            // loop and see if any  value is empty
            if (!allaluesinLoad[i][1]) {
                error.push(`${allaluesinLoad[i][0]}`); // push the key into the error array
            }
        }
        if (error.length > 0) {
            (res.data = null),
                (res.status = 400),
                (res.message = `please provide a valid  ${error
                    .join(",")
                    .toLowerCase()}`); // join the array to string
            return res;
        }
        try {
            const newAd = adRepository.create({
                userId: user.id,
                by: user.email,
                creatorName: `${user.firstName} ${user.lastName}`,
                country: user.nationality,
                state: user.state,
                city: user.city,
                ...adData,
            });
            const createdAd = await adRepository.save(newAd);
            (res.data = null), (res.message = "Success Created Gig");
            res.status = 200;
            return res;
        }
        catch (err) {
            (res.data = null), (res.message = err.message);
            res.status = 500;
            return res;
        }
    };
    async deleteAds(id) {
        console.log(`delete ads id`, id);
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
    async updateAds(id, load) {
        const response = new ServiceResponse();
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const foundAds = await adsRepo.findOne({ where: { id } });
            console.log({ foundAds, load });
            if (!foundAds) {
                (response.data = null),
                    (response.status = 404),
                    (response.message = "No Ads found");
                return response;
            }
            // Update only non-empty fields except "id"
            Object.entries(load).forEach(([key, value]) => {
                if (key !== "id" && value) {
                    foundAds[key] = value;
                }
            });
            await adsRepo.save(foundAds);
            (response.data = foundAds),
                (response.message = "Ad updated successfully"),
                (response.status = 200);
            return response;
        }
        catch (e) {
            (response.data = null),
                (response.message = e.message),
                (response.status = 500);
            return response;
        }
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
        console.log(`user ads id`, id);
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const gottenAdd = await adsRepo.find({
                where: { userId: id },
            });
            response.data = gottenAdd;
            response.message = "Ads found successfully";
            response.status = 200;
        }
        catch (e) {
            response.message = e.message;
            response.status = 500;
        }
        return response;
    }
    async getAllAvailableAds() {
        const response = new ServiceResponse();
        try {
            const adsRepo = AppDataSource.getRepository(MerchantAd);
            const allAds = await adsRepo.find({
                where: {
                    status: AdStatus.Available,
                },
            });
            response.data = allAds;
            response.message = "Available Ads found successfully";
            response.status = 200;
        }
        catch (e) {
            response.message = e.message;
            response.status = 500;
        }
        return response;
    }
    async applyToAds(load) {
        const response = new ServiceResponse();
        try {
        }
        catch (e) { }
    }
}
