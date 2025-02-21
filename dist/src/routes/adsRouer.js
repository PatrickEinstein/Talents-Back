import express from "express";
import { AdsController } from "../controller/adsController.js";
import TokenVerification from "../middlewares/TokenVerification.js";
const adsRouter = express.Router();
const controller = new AdsController();
/**
 * @openapi
 * /api/ads/create-ad:
 *   post:
 *     summary: Create a new advertisement
 *     tags:
 *       - Ads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *               jobDescription:
 *                 type: string
 *               by:
 *                 type: string
 *               workmode:
 *                 type: string
 *                 enum: [Remote, On-site, Hybrid]
 *               remuneration:
 *                 type: string
 *                 enum: [Commission, Hourly, Fixed]
 *               image:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               eligibility:
 *                 type: string
 *             required:
 *               - jobTitle
 *               - jobDescription
 *               - by
 *               - workmode
 *               - remuneration
 *               - image
 *               - date
 *               - eligibility
 *     responses:
 *       201:
 *         description: Advertisement created successfully
 *       400:
 *         description: Bad request
 */
adsRouter.post("/api/ads/create-ad", TokenVerification, controller.createAd);
/**
 * @openapi
 * '/api/ads/all':
 *  get:
 *     tags:
 *     - Ads
 *     summary: Get the all available ads
 *     responses:
 *      200:
 *        description: ads fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      format: uuid
 *                    email:
 *                      type: string
 *                    user_type:
 *                      type: string
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 */
adsRouter.get("/api/ads/all", TokenVerification, controller.getAllAvailableAds);
/**
 * @openapi
 * '/api/ads/user':
 *  get:
 *     tags:
 *     - Ads
 *     summary: Get the current authorized user ads
 *     responses:
 *      200:
 *        description: ads fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      format: uuid
 *                    email:
 *                      type: string
 *                    user_type:
 *                      type: string
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 */
adsRouter.get("/api/ads/user", TokenVerification, controller.getAdByUserId);
/**
 * @openapi
 * '/api/ads/{id}':
 *  get:
 *     tags:
 *     - Ads
 *     summary: Get an ad by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The identifier of the ad
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Ad found successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                data:
 *                  type: object
 *      404:
 *        description: Ad not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 */
adsRouter.get("/api/ads/:id", TokenVerification, controller.getAdById);
/**
 * @openapi
 * '/api/ads/{id}':
 *  delete:
 *     tags:
 *     - Ads
 *     summary: Delete an ad by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The identifier of the ad
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Ad deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *      404:
 *        description: Ad not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 */
adsRouter.delete("/api/ads/:id", TokenVerification, controller.deleteAds);
export default adsRouter;
