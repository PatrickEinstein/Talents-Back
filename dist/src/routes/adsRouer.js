import express from 'express';
import { AdsController } from '../controller/adsController.js';
import TokenVerification from '../middlewares/TokenVerification.js';
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
export default adsRouter;
